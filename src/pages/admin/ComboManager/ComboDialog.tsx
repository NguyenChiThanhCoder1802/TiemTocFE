import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
  Divider,
  Autocomplete,
  Chip,
  IconButton,
  Switch,
  FormControlLabel
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'
import type { Combo } from '../../../types/Combo/Combo'
import type { Service, ServiceLite } from '../../../types/HairService/Service'
import { useComboServiceForm } from '../../../hooks/useComboServiceForm'

/* ================== PROPS ================== */
interface Props {
  open: boolean
  combo: Combo | null
  services: Service[]
  onClose: () => void
  onSubmit: (formData: FormData) => void
}

const ComboDialog = ({
  open,
  combo,
  services,
  onClose,
  onSubmit
}: Props) => {
  const isEdit = Boolean(combo)

  /* ================== FORM HOOK ================== */
  const {
    formData,
    previewImages,
    handleChange,
    handleImageChange,
    handleRemoveImage,
    setPricing,
    setServices,
    setTags,
    setActivePeriod,  
    resetForm
  } = useComboServiceForm(combo)

  /* ================== UI STATE ================== */
  const [tags, setTagsState] = useState<string[]>(combo?.tags ?? [])
  const [comboPrice, setComboPrice] = useState<number>(
    combo?.pricing.comboPrice ?? 0
  )

  const [selectedServices, setSelectedServices] = useState<
    { service: ServiceLite; quantity: number }[]
  >([])

  /* ================== INIT EDIT ================== */
  useEffect(() => {
    if (!combo) {
      setSelectedServices([])
      setTagsState([])
      setComboPrice(0)
      return
    }

    setTagsState(combo.tags ?? [])
    setComboPrice(combo.pricing.comboPrice)

    setSelectedServices(
      combo.services.map(s => ({
        service:
          typeof s.service === 'string'
            ? services.find(x => x._id === s.service)!
            : s.service,
        quantity: 1
      }))
    )
  }, [combo, services])

  /* ================== CALCULATE ================== */
  const originalPrice = useMemo(
    () =>
      selectedServices.reduce(
        (sum, s) => sum + s.service.finalPrice * s.quantity,
        0
      ),
    [selectedServices]
  )

  const duration = useMemo(
    () =>
      selectedServices.reduce(
        (sum, s) => sum + s.service.duration * s.quantity,
        0
      ),
    [selectedServices]
  )
  const [startAt, setStartAt] = useState<string>(
  combo?.activePeriod?.startAt
    ? new Date(combo.activePeriod.startAt).toISOString().slice(0, 16)
    : ''
)

const [endAt, setEndAt] = useState<string>(
  combo?.activePeriod?.endAt
    ? new Date(combo.activePeriod.endAt).toISOString().slice(0, 16)
    : ''
)
  /* ================== SYNC DERIVED DATA ================== */
  useEffect(() => {
  setPricing(originalPrice, comboPrice)
}, [originalPrice, comboPrice, setPricing])

useEffect(() => {
  setServices(selectedServices, duration)
}, [selectedServices, duration, setServices])

useEffect(() => {
  setTags(tags)
}, [tags, setTags])
 useEffect(() => {
  setActivePeriod(startAt, endAt)
}, [startAt, endAt, setActivePeriod])

  /* ================== SUBMIT ================== */
  const handleSubmit = () => {
    onSubmit(formData)
  }

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
        {isEdit ? 'Cập nhật combo' : 'Tạo combo'}
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* ================= BASIC ================= */}
        <Section title="Thông tin cơ bản">
          <TextField
            label="Tên combo"
            name="name"
            defaultValue={combo?.name ?? ''}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Mô tả"
            name="description"
            defaultValue={combo?.description ?? ''}
            onChange={handleChange}
            multiline
            minRows={3}
            fullWidth
          />

          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={tags}
            onChange={(_, v) => setTagsState(v)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
            renderInput={params => (
              <TextField {...params} label="Tags" placeholder="Nhập tag" />
            )}
          />
        </Section>

        {/* ================= IMAGES ================= */}
        <Section title="Hình ảnh combo">
          <Button variant="outlined" component="label">
            Tải ảnh
            <input
              hidden
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </Button>

          <Stack direction="row" spacing={2} flexWrap="wrap">
            {previewImages.map(img => (
              <Stack key={img} alignItems="center">
                <img
                  src={img}
                  alt="combo"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 8
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(img)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Section>

        {/* ================= SERVICES ================= */}
        <Section title="Dịch vụ">
          <Autocomplete
            options={services}
            getOptionLabel={o => o.name}
            onChange={(_, v) => {
              if (!v) return
              if (selectedServices.some(s => s.service._id === v._id)) return

              setSelectedServices(prev => [
                ...prev,
                { service: v, quantity: 1 }
              ])
            }}
            renderInput={params => (
              <TextField {...params} label="Thêm dịch vụ" />
            )}
          />

          {selectedServices.map(s => (
            <Stack
              key={s.service._id}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Chip label={s.service.name} />

              <TextField
                type="number"
                size="small"
                value={s.quantity}
                onChange={e =>
                  setSelectedServices(prev =>
                    prev.map(x =>
                      x.service._id === s.service._id
                        ? { ...x, quantity: +e.target.value }
                        : x
                    )
                  )
                }
                sx={{ width: 80 }}
                inputProps={{ min: 1 }}
              />

              <Typography>
                {(s.service.finalPrice * s.quantity).toLocaleString()}₫
              </Typography>

              <IconButton
                onClick={() =>
                  setSelectedServices(prev =>
                    prev.filter(x => x.service._id !== s.service._id)
                  )
                }
              >
                <Delete />
              </IconButton>
            </Stack>
          ))}
        </Section>

        {/* ================= PRICE ================= */}
        <Section title="Giá">
          <Typography>
            Giá gốc: <b>{originalPrice.toLocaleString()}₫</b>
          </Typography>

          <TextField
            label="Giá combo"
            type="number"
            value={comboPrice}
            onChange={e => setComboPrice(+e.target.value)}
            error={comboPrice >= originalPrice}
            helperText={
              comboPrice >= originalPrice
                ? 'Giá combo phải nhỏ hơn giá gốc'
                : ''
            }
            fullWidth
          />

          <Typography>Thời gian: {duration} phút</Typography>
        </Section>
            <Section title="Thời gian áp dụng">
  <Stack direction="row" spacing={2}>
    <TextField
      label="Ngày bắt đầu"
      type="datetime-local"
      value={startAt}
      onChange={e => setStartAt(e.target.value)}
      InputLabelProps={{ shrink: true }}
      fullWidth
    />

    <TextField
      label="Ngày kết thúc"
      type="datetime-local"
      value={endAt}
      onChange={e => setEndAt(e.target.value)}
      InputLabelProps={{ shrink: true }}
      error={Boolean(startAt && endAt && endAt <= startAt)}
      helperText={
        startAt && endAt && endAt <= startAt
          ? 'Ngày kết thúc phải sau ngày bắt đầu'
          : ''
      }
      fullWidth
    />
  </Stack>
</Section>
        {/* ================= STATUS ================= */}
        <Section title="Trạng thái">
          <FormControlLabel
            control={
              <Switch
                defaultChecked={combo?.isActive ?? true}
                onChange={e =>
                  formData.set('isActive', String(e.target.checked))
                }
              />
            }
            label="Kích hoạt combo"
          />
        </Section>

      </DialogContent>

      {/* ================= ACTION ================= */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ComboDialog

/* ================== HELPER ================== */
const Section = ({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) => (
  <Stack spacing={2}>
    <Divider />
    <Typography fontWeight={600}>{title}</Typography>
    {children}
  </Stack>
)
