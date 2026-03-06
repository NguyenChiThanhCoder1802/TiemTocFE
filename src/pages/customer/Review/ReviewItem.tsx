import {
  Avatar,
  Stack,
  Typography,
  IconButton,
  Box,
  ImageList,
  ImageListItem,Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  DialogContent
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ReviewStars from './ReviewStars'
import type { Review } from '../../../types/Review/Review'
import useAuth from '../../../hooks/useAuth'
import { useState } from 'react'

interface ReviewItemProps {
  review: Review
  onEdit: (review: Review) => void
  onDelete: (id: string) => void
}

const ReviewItem = ({ review, onEdit, onDelete }: ReviewItemProps) => {
  const { user } = useAuth() 
  const isOwner = user?._id === review.user._id
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  const open = Boolean(anchorEl)
  const visibleImages = review.images?.slice(0, 3) || []
  const remaining = review.images ? review.images.length - 3 : 0

  return (
    <Stack direction="row" spacing={2}>
      <Avatar src={review.user.avatar} />

      <Box flex={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={600}>{review.user.name}</Typography>

          {isOwner && (
           <>
              <IconButton size="small" onClick={e => setAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null)
                    onEdit(review)
                  }}
                >
                  <ListItemIcon>
                    <EditIcon sx={{ color: 'primary.main' }} fontSize="small" />
                  </ListItemIcon>
                  Chỉnh sửa
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    setAnchorEl(null)
                    onDelete(review._id)
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon sx={{ color: 'error.main' }} fontSize="small" />
                  </ListItemIcon>
                  Xoá
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>


        <ReviewStars value={review.rating} readOnly />
        <Typography>{review.comment}</Typography>

        {review.images && review.images.length > 0 && (
           <ImageList
              cols={visibleImages.length}
              gap={8}
              sx={{ mt: 1, maxWidth: 260 }}
            >
            {visibleImages.map((imgUrl, idx) => (
              <ImageListItem key={idx}
               sx={{
                  width: 80,
                  height: 80,
                  borderRadius:1,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onClick={() => setPreviewIndex(idx)}>
                <img
                  src={imgUrl}
                  alt={`review-${idx}`}
                  loading="lazy"
                  style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                />
                {idx === 2 && remaining > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 18
                }}
              >
                +{remaining}
              </Box>
            )}
              </ImageListItem>
            ))}
          </ImageList>
        )}
        <Dialog
          open={previewIndex !== null}
          onClose={() => setPreviewIndex(null)}
          maxWidth="md"
        >
          <DialogContent sx={{ p: 0 }}>
            {previewIndex !== null && (
              <img
                src={review.images[previewIndex]}
                alt="preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            )}
          </DialogContent>
        </Dialog>

      </Box>
    </Stack>
  )
}

export default ReviewItem
