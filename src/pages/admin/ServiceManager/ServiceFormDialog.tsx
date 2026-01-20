import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Stack,
  Avatar,
  IconButton,
  Box,
  Divider,
  Typography,
  Autocomplete
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import type { Service } from '../../../types/HairService/Service'
import type { Category } from '../../../types/Category/Category'
import { useServiceForm } from '../../../hooks/useServiceForm'

interface Props {
  open: boolean
  service: Service | null
  categories: Category[]
  onClose: () => void
  onSubmit: (formData: FormData) => void
}

const ServiceFormDialog = ({ open, service, categories, onClose, onSubmit }: Props) => {
  const {
    formData,
    previewImages,
    handleChange,
    handleImageChange,
    handleRemoveImage,
    resetForm
  } = useServiceForm(service)

  const isEdit = Boolean(service)

  return (
    <Dialog
      open={open}
      onClose={() => {
        resetForm()
        onClose()
      }}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      {/* ================= TITLE ================= */}
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 600 }}>
        {isEdit ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ'}
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* ================= THÔNG TIN CƠ BẢN ================= */}
        <Section title="Thông tin cơ bản">
          <TextField
            label="Tên dịch vụ"
            name="name"
            defaultValue={service?.name || ''}
            onChange={handleChange}
            required
            fullWidth
          />
            <Autocomplete
            options={categories}
            getOptionLabel={(o) => o.name}
            value={
              categories.find(c => c._id === service?.category) || null
            }
            onChange={(_, value) => {
              if (value) formData.set('category', value._id)
            }}
            renderInput={(params) => (
              <TextField {...params} label="Danh mục" required />
            )}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Giá gốc (₫)"
              name="price"
              type="number"
              defaultValue={service?.price || ''}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Thời gian (phút)"
              name="duration"
              type="number"
              defaultValue={service?.duration || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Stack>
        </Section>

        {/* ================= GIẢM GIÁ ================= */}
        <Section title="Giảm giá dịch vụ (tuỳ chọn)">
          <Typography variant="body2" color="text.secondary">
            Giảm giá này có thời hạn và <b>không áp dụng cùng voucher</b>
          </Typography>

          <TextField
            label="Phần trăm giảm giá (%)"
            type="number"
            inputProps={{ min: 0, max: 100 }}
            defaultValue={service?.serviceDiscount?.percent ?? 0}
            onChange={(e) =>
              formData.set('serviceDiscount.percent', e.target.value)
            }
            fullWidth
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Bắt đầu giảm giá"
              type="datetime-local"
              defaultValue={
                service?.serviceDiscount?.startAt
                  ? new Date(service.serviceDiscount.startAt)
                      .toISOString()
                      .slice(0, 16)
                  : ''
              }
              onChange={(e) =>
                formData.set('serviceDiscount.startAt', e.target.value)
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Kết thúc giảm giá"
              type="datetime-local"
              defaultValue={
                service?.serviceDiscount?.endAt
                  ? new Date(service.serviceDiscount.endAt)
                      .toISOString()
                      .slice(0, 16)
                  : ''
              }
              onChange={(e) =>
                formData.set('serviceDiscount.endAt', e.target.value)
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </Section>

        {/* ================= NỘI DUNG ================= */}
        <Section title="Nội dung">
          <TextField
            label="Mô tả dịch vụ"
            name="description"
            multiline
            rows={3}
            defaultValue={service?.description || ''}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Tags (cách nhau bằng dấu phẩy)"
            placeholder="Ví dụ: Hot, Trend, Uốn tóc"
            defaultValue={service?.tags?.join(', ') || ''}
            onChange={(e) => {
              const tags = e.target.value
                .split(',')
                .map(t => t.trim())
                .filter(Boolean)

              formData.set('tags', JSON.stringify(tags))
            }}
            fullWidth
          />
        </Section>

        {/* ================= HÌNH ẢNH ================= */}
        <Section title="Hình ảnh">
          <Button variant="outlined" component="label">
            Upload hình ảnh
            <input hidden multiple type="file" onChange={handleImageChange} />
          </Button>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {previewImages.map((img, index) => (
              <Box key={index} position="relative">
                <Avatar
                  src={img}
                  variant="rounded"
                  sx={{ width: 88, height: 88 }}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    bgcolor: 'white'
                  }}
                  onClick={() => handleRemoveImage(img)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Section>

        {/* ================= TRẠNG THÁI ================= */}
        <Section title="Trạng thái">
          <FormControlLabel
            control={
              <Switch
                defaultChecked={service?.isActive ?? true}
                onChange={(e) =>
                  formData.set('isActive', String(e.target.checked))
                }
              />
            }
            label="Kích hoạt dịch vụ"
          />
        </Section>
      </DialogContent>

      {/* ================= ACTION ================= */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={() => onSubmit(formData)}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ServiceFormDialog

/* ================== HELPER ================== */
const Section = ({ title, children }: any) => (
  <Stack spacing={2}>
    <Divider />
    <Typography fontWeight={600}>{title}</Typography>
    {children}
  </Stack>
)
