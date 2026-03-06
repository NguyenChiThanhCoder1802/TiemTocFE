import { Box, Typography, Skeleton} from '@mui/material'
import type { ServiceCard } from '../../types/HairService/ServiceCard'
import HairServiceCard from './HairServiceCard'

interface Props {
  items: ServiceCard[]
  title: string
  linkPrefix: string
  loading?: boolean
   maxItems?: number 
}

const ItemCardList = ({ items, title, linkPrefix, loading,maxItems = 4 }: Props) => {
  const visibleItems = items.slice(0, maxItems)
  return (
    <Box sx={{ px: 0, py: 2 }}>
       <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.5
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600
          }}
        >
          {title}
        </Typography>

        
      </Box>
   
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
          ? Array.from({ length: maxItems }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                width={260}
                height={320}
              />
            ))
          : visibleItems.map((item, index) => (
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
