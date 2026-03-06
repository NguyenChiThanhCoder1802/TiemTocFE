import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import type { Category } from '../../types/Category/Category'
import { fetchCategories } from '../../api/CategoryAPI'

interface CategorySidebarProps {
  value?: string | null
  onChange?: (value: { id: string | null; name: string | null }) => void
}

export default function CategorySidebar({
  value,
  onChange
}: CategorySidebarProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories({ isActive: true })
      .then((data) => {
      const filtered = data.filter(
        (cat) => cat.name.toLowerCase() !== 'combo'
      )
      setCategories(filtered)
    })
      .finally(() => setLoading(false))
  }, [])

  return (
    <Box>
      <Typography fontWeight={700} mb={1}>
        Danh mục dịch vụ
      </Typography>

      <List disablePadding>
        {/* ===== TẤT CẢ ===== */}
        {!loading && (
          <ListItemButton
            selected={!value}
            onClick={() =>
              onChange?.({ id: null, name: null })
            }
          >
            <ListItemText primary="Tất cả" />
          </ListItemButton>
        )}

        {/* ===== LOADING ===== */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height={36} sx={{ mb: 1 }} />
          ))}

        {/* ===== CATEGORY LIST ===== */}
        {!loading &&
          categories.map(cat => (
            <ListItemButton
              key={cat._id}
              selected={value === cat._id}
              onClick={() =>
                onChange?.({
                  id: cat._id,
                  name: cat.name
                })
              }
            >
              <ListItemText primary={cat.name} />
            </ListItemButton>
          ))}
      </List>
    </Box>
  )
}