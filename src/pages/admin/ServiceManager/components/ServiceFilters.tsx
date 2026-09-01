import { Stack } from '@mui/material'

import CategoryFilter from '../filters/CategoryFilter'
import SearchFilter from '../filters/SearchFilter'
import PriceFilter from '../filters/PriceFilter'
import SortFilter from '../filters/SortFilter'
import DiscountFilter from '../filters/DiscountFilter'

import type { Category } from '../../../../types/Category/Category'
import type { FetchServicesParams } from '../../../../types/SearchParams/Params'

interface Props {
  filters: FetchServicesParams
  categories: Category[]

  onChange: (
    value: Partial<FetchServicesParams>
  ) => void
}

const ServiceFilters = ({
  filters,
  categories,
  onChange,
}: Props) => {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      flexWrap="wrap"
      alignItems="center"
    >
      <CategoryFilter
        categories={categories}
        value={filters.categoryId ?? null}
        onChange={(categoryId) =>
          onChange({
            categoryId:
              categoryId ?? undefined,
            page: 1,
          })
        }
      />

      <SearchFilter
        value={filters.search}
        onChange={(search) =>
          onChange({
            search,
            page: 1,
          })
        }
      />

      <PriceFilter
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onChange={(value) =>
          onChange({
            ...value,
            page: 1,
          })
        }
      />

      <SortFilter
        value={filters.sort}
        onChange={(sort) =>
          onChange({
            sort,
            page: 1,
          })
        }
      />

      <DiscountFilter
        value={filters.discountOnly}
        onChange={(discountOnly) =>
          onChange({
            discountOnly,
            page: 1,
          })
        }
      />
    </Stack>
  )
}

export default ServiceFilters