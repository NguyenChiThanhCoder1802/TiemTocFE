import { Box, Typography, Skeleton } from '@mui/material'
import type { ServiceCard } from '../../types/HairService/ServiceCard'
import HairServiceCard from './HairServiceCard'

interface Props {
  items: ServiceCard[]
  title: string
  linkPrefix: string
  loading?: boolean
}

const ItemCardList = ({ items, title, linkPrefix, loading }: Props) => {
  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
        {title}
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                width={260}
                height={320}
              />
            ))
          : items.map((item, index) => (
              <HairServiceCard
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

export default ItemCardList
