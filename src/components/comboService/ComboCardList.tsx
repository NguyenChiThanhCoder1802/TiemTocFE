import { Box, Typography, Skeleton } from '@mui/material'
import type { Combo } from '../../types/Combo/Combo'
import ComboCard from './ComboCard'

interface Props {
  items: Combo[]
  title: string
  linkPrefix: string
  loading?: boolean
}

const ComboCardList = ({ items, title, linkPrefix, loading }: Props) => {
  return (
   <Box sx={{ px: 0, py: 4 }}>
  <Typography
    variant="h5"
    fontWeight={700}
    sx={{ mb: 2 }}
  >
    {title}
  </Typography>

          <Box
  sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(4, 1fr)'
    },
    gap: 2.5
  }}
>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                width={260}
                height={340}
              />
            ))
          : items.map((item, index) => (
              <ComboCard
                key={item._id}
                item={item}
                index={index}
                linkPrefix={linkPrefix}
              />
            ))}
      </Box>
    </Box>
  )
}

export default ComboCardList
