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
  Autocomplete,
  Chip,
} from '@mui/material'

import {
  Delete,
} from '@mui/icons-material'

import type { Service } from '../../../types/HairService/Service'
import type { Category } from '../../../types/Category/Category'

import {
  useServiceForm,
} from '../../../hooks/useServiceForm'

import {
  getCategoryId,
} from '../../../utils/CategoryHelper'

interface Props {
  open: boolean
  service: Service | null
  categories: Category[]
  onClose: () => void
  onSubmit: (formData: FormData) => void
}

const ServiceFormDialog = ({
  open,
  service,
  categories,
  onClose,
  onSubmit,
}: Props) => {
  const {
    formData,
    previewImages,
    handleChange,
    handleImageChange,
    handleRemoveImage,
    resetForm,
  } = useServiceForm(service)

  const isEdit = Boolean(service)

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      {/* ==================================================
          TITLE
      ================================================== */}

      <DialogTitle
        sx={{
          fontWeight: 700,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {isEdit
          ? 'Cập nhật dịch vụ'
          : 'Thêm dịch vụ'}
      </DialogTitle>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <DialogContent
        sx={{
          pt: 3,
        }}
      >
        <Stack spacing={4}>

          {/* ==================================================
              1. THÔNG TIN CƠ BẢN
          ================================================== */}

          <FormSection
            title="Thông tin cơ bản"
            description="Thông tin chính của dịch vụ"
          >
            <TextField
              label="Tên dịch vụ"
              name="name"
              defaultValue={
                service?.name || ''
              }
              onChange={handleChange}
              required
              fullWidth
            />

            <Autocomplete
              options={categories}
              getOptionLabel={(option) =>
                option.name
              }
              value={(() => {
                const categoryId =
                  getCategoryId(
                    service?.category
                  )

                return (
                  categories.find(
                    (category) =>
                      category._id ===
                      categoryId
                  ) || null
                )
              })()}
              onChange={(_, value) => {
                formData.set(
                  'category',
                  value?._id || ''
                )
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Danh mục"
                  required
                />
              )}
            />

            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={2}
            >
              <TextField
                label="Giá gốc"
                name="price"
                type="number"
                defaultValue={
                  service?.price ?? ''
                }
                onChange={handleChange}
                required
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      ₫
                    </Typography>
                  ),
                }}
              />

              <TextField
                label="Thời gian"
                name="duration"
                type="number"
                defaultValue={
                  service?.duration ?? ''
                }
                onChange={handleChange}
                required
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      phút
                    </Typography>
                  ),
                }}
              />
            </Stack>
          </FormSection>

          {/* ==================================================
              2. GIẢM GIÁ
          ================================================== */}

          <FormSection
            title="Giảm giá dịch vụ"
            description="Cấu hình chương trình giảm giá riêng cho dịch vụ"
          >
            <TextField
              label="Phần trăm giảm giá"
              type="number"
              inputProps={{
                min: 0,
                max: 100,
              }}
              defaultValue={
                service?.serviceDiscount
                  ?.percent ?? 0
              }
              onChange={(e) =>
                formData.set(
                  'serviceDiscount.percent',
                  e.target.value
                )
              }
              fullWidth
            />

            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={2}
            >
              <TextField
                label="Bắt đầu"
                type="datetime-local"
                defaultValue={
                  service
                    ?.serviceDiscount
                    ?.startAt
                    ? new Date(
                        service.serviceDiscount.startAt
                      )
                        .toISOString()
                        .slice(0, 16)
                    : ''
                }
                onChange={(e) =>
                  formData.set(
                    'serviceDiscount.startAt',
                    e.target.value
                  )
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="Kết thúc"
                type="datetime-local"
                defaultValue={
                  service
                    ?.serviceDiscount
                    ?.endAt
                    ? new Date(
                        service.serviceDiscount.endAt
                      )
                        .toISOString()
                        .slice(0, 16)
                    : ''
                }
                onChange={(e) =>
                  formData.set(
                    'serviceDiscount.endAt',
                    e.target.value
                  )
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Giảm giá dịch vụ không áp dụng
              đồng thời với voucher.
            </Typography>
          </FormSection>

          {/* ==================================================
              3. NỘI DUNG
          ================================================== */}

          <FormSection
            title="Nội dung"
            description="Mô tả và từ khóa giúp khách hàng hiểu dịch vụ"
          >
            <TextField
              label="Mô tả dịch vụ"
              name="description"
              multiline
              rows={4}
              defaultValue={
                service?.description || ''
              }
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Tags"
              placeholder="Ví dụ: Hot, Trend, Uốn tóc"
              defaultValue={
                service?.tags?.join(', ') || ''
              }
              onChange={(e) => {
                const tags = e.target.value
                  .split(',')
                  .map((tag) => tag.trim())
                  .filter(Boolean)

                formData.set(
                  'tags',
                  JSON.stringify(tags)
                )
              }}
              fullWidth
              helperText="Các tag cách nhau bằng dấu phẩy"
            />
          </FormSection>

          {/* ==================================================
              4. HÌNH ẢNH
          ================================================== */}

          <FormSection
            title="Hình ảnh"
            description="Hình ảnh hiển thị của dịch vụ"
          >
            <Button
              variant="outlined"
              component="label"
              sx={{
                width: 'fit-content',
              }}
            >
              Upload hình ảnh

              <input
                hidden
                multiple
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {previewImages.length > 0 && (
              <Stack
                direction="row"
                spacing={1.5}
                flexWrap="wrap"
                useFlexGap
              >
                {previewImages.map(
                  (image, index) => (
                    <Box
                      key={`${image}-${index}`}
                      position="relative"
                    >
                      <Avatar
                        src={image}
                        variant="rounded"
                        sx={{
                          width: 96,
                          height: 96,
                        }}
                      />

                      <IconButton
                        size="small"
                        onClick={() =>
                          handleRemoveImage(
                            image
                          )
                        }
                        sx={{
                          position:
                            'absolute',
                          top: -8,
                          right: -8,
                          bgcolor:
                            'background.paper',
                          border:
                            '1px solid',
                          borderColor:
                            'divider',
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  )
                )}
              </Stack>
            )}
          </FormSection>

          {/* ==================================================
              5. TRẠNG THÁI
          ================================================== */}

          <FormSection
            title="Trạng thái"
            description="Thiết lập khả năng hiển thị và sử dụng dịch vụ"
          >
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={
                    service?.isActive ??
                    true
                  }
                  onChange={(e) =>
                    formData.set(
                      'isActive',
                      String(
                        e.target.checked
                      )
                    )
                  }
                />
              }
              label="Kích hoạt dịch vụ"
            />

            {service?.isFeatured && (
              <Chip
                label="Dịch vụ nổi bật"
                color="warning"
                size="small"
                sx={{
                  width: 'fit-content',
                }}
              />
            )}
          </FormSection>

        </Stack>
      </DialogContent>

      {/* ==================================================
          ACTION
      ================================================== */}

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button onClick={handleClose}>
          Huỷ
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            onSubmit(formData)
          }
        >
          {isEdit ? 'Cập nhật' : 'Lưu dịch vụ'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ServiceFormDialog

/* ==================================================
   SECTION
================================================== */

const FormSection = ({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) => {
  return (
    <Stack spacing={2}>
      <Box>
        <Typography
          fontWeight={700}
          variant="subtitle1"
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="caption"
            color="text.secondary"
          >
            {description}
          </Typography>
        )}
      </Box>

      <Divider />

      <Stack spacing={2}>
        {children}
      </Stack>
    </Stack>
  )
}