import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  Box,
  IconButton,

} from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useRef, useState } from 'react'
import ReviewStars from './ReviewStars'
import { createReview, updateReview } from '../../../api/ReviewAPI'
import type { Review } from '../../../types/Review/Review'

interface ReviewFormDialogProps {
  open: boolean
  onClose: () => void
  serviceId: string
  onSuccess: () => void
  review?: Review
}

const ReviewFormDialog = ({
  open,
  onClose,
  serviceId,
  onSuccess,
  review,
}: ReviewFormDialogProps) => {
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState<string>('')
  const [newImages, setNewImages] = useState<File[]>([])
  const [oldImages, setOldImages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const isEdit = Boolean(review)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (review) {
      setRating(review.rating)
      setComment(review.comment || '')
      setOldImages(review.images || [])
      setNewImages([])
    } else {
      setRating(0)
      setComment('')
      setOldImages([])
      setNewImages([])
    }
  }, [review, open])

  const handleAddImages = (files: FileList | null) => {
    if (files) {
      setNewImages(prev => [...prev, ...Array.from(files)])
    }
  }

  const handleRemoveNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleRemoveOldImage = (index: number) => {
    setOldImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('service', serviceId)
    formData.append('rating', String(rating))
    formData.append('comment', comment)

    // Gửi ảnh cũ còn giữ lại
    oldImages.forEach(url => formData.append('oldImages[]', url))
    // Gửi ảnh mới
    newImages.forEach(file => formData.append('images', file))

    setLoading(true)
    try {
      if (isEdit && review) {
        await updateReview(review._id, formData)
      } else {
        await createReview(formData)
      }
      onSuccess()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEdit ? 'Chỉnh sửa đánh giá' : 'Đánh giá dịch vụ'}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <ReviewStars value={rating} onChange={setRating} />

          <TextField
            multiline
            rows={4}
            label="Nhận xét"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

          {/* Button upload ảnh */}
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload ảnh
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => handleAddImages(e.target.files)}
          />

          {/* Hiển thị ảnh cũ */}
          {oldImages.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {oldImages.map((url, idx) => (
                <Box key={idx} position="relative">
                  <img
                    src={url}
                    alt={`old-${idx}`}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveOldImage(idx)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      p: 0.5,
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          )}

          {/* Hiển thị ảnh mới */}
          {newImages.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {newImages.map((file, idx) => {
                const url = URL.createObjectURL(file)
                return (
                  <Box key={idx} position="relative">
                    <img
                      src={url}
                      alt={`new-${idx}`}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 4,
                      }}
                    />
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveNewImage(idx)}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        p: 0.5,
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )
              })}
            </Stack>
          )}

          <Button
            variant="contained"
            disabled={rating === 0 || loading}
            onClick={handleSubmit}
          >
            {isEdit ? 'Cập nhật' : 'Gửi đánh giá'}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewFormDialog
