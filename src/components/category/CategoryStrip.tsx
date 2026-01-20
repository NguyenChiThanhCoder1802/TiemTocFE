import { Box, Chip, Stack, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import type { Category } from '../../types/Category/Category'
import { fetchCategories } from '../../api/CategoryAPI'

interface CategoryStripProps {
  /** categoryId đang được chọn */
  value?: string | null
  /** emit khi user click category */
  onChange?: (categoryId: string | null) => void
}

export default function CategoryStrip({
  value,
  onChange
}: CategoryStripProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    fetchCategories({ isActive: true })
      .then(data => {
        if (mounted) setCategories(data)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        {/* ===== ALL CATEGORY ===== */}
        {!loading && (
          <Chip
            label="Tất cả"
            clickable
            color={!value ? 'primary' : 'default'}
            onClick={() => onChange?.(null)}
            sx={{
              borderRadius: 999,
              fontWeight: 600,
              px: 1.5
            }}
          />
        )}

        {/* ===== LOADING ===== */}
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={110}
              height={36}
            />
          ))}

        {/* ===== CATEGORY LIST ===== */}
        {!loading &&
          categories.map(cat => (
            <Chip
              key={cat._id}
              label={cat.name}
              clickable
              color={value === cat._id ? 'primary' : 'default'}
              onClick={() => onChange?.(cat._id)}
              sx={{
                borderRadius: 999,
                fontWeight: 600,
                px: 1.5,
                whiteSpace: 'nowrap'
              }}
            />
          ))}
      </Stack>
    </Box>
  )
}
