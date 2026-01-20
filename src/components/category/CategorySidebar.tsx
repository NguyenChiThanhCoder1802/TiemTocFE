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
  onChange?: (categoryId: string | null) => void
}

export default function CategorySidebar({
  value,
  onChange
}: CategorySidebarProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories({ isActive: true })
      .then(setCategories)
      .finally(() => setLoading(false))
  }, [])

  return (
    <Box>
      <Typography fontWeight={700} mb={1}>
        Danh mục dịch vụ
      </Typography>

      <List disablePadding>
        {!loading && (
          <ListItemButton
            selected={!value}
            onClick={() => onChange?.(null)}
          >
            <ListItemText primary="Tất cả" />
          </ListItemButton>
        )}

        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height={36} sx={{ mb: 1 }} />
          ))}

        {!loading &&
          categories.map(cat => (
            <ListItemButton
              key={cat._id}
              selected={value === cat._id}
              onClick={() => onChange?.(cat._id)}
            >
              <ListItemText primary={cat.name} />
            </ListItemButton>
          ))}
      </List>
    </Box>
  )
}
