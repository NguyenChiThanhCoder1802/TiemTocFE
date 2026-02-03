import { Box, Typography, Button, Stack } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useEffect, useState, useCallback } from 'react'
import {
  fetchServiceAdmin,
  createService,
  updateService,
  deleteService
} from '../../../api/servicesAPI'
import { fetchCategories } from '../../../api/CategoryAPI'
import type { Service } from '../../../types/HairService/Service'
import type { Category } from '../../../types/Category/Category'
import ServiceTable from './ServiceTable'
import ServiceFormDialog from './ServiceFormDialog'

import CategoryFilter from '../../../components/filters/CategoryFilter'
import SearchFilter from '../../../components/filters/SearchFilter'
import PriceFilter from '../../../components/filters/PriceFilter'
import SortFilter from '../../../components/filters/SortFilter'
import DiscountFilter from '../../../components/filters/DiscountFilter'
import type { FetchServicesParams } from '../../../types/SearchParams/Params'


const HairSalonService = () => {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [openServiceDialog, setOpenServiceDialog] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
 const [filters, setFilters] = useState<FetchServicesParams>({
  page: 1,
  limit: 10
})
const [totalPages, setTotalPages] = useState(1)

  const loadData = useCallback( async () => {
    const [serviceData, categoryData] = await Promise.all([
      fetchServiceAdmin(filters),
       
      fetchCategories({ isActive: true })
    ])
    setServices(serviceData.data)
    setTotalPages(serviceData.pagination.totalPages)
    setCategories(categoryData)
  },
  [filters]
  )


  useEffect(() => {
  loadData()
}, [loadData])



  const handleServiceSubmit = async (formData: FormData) => {
    if (editingService) {
      await updateService(editingService._id, formData)
    } else {
      await createService(formData)
    }
    setOpenServiceDialog(false)
    loadData()
  }

 
  return (
    <Box>
      {/* HEADER */}
      <Box mb={3}>
        {/* TOP BAR */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight={700}>
            Quản lý dịch vụ
          </Typography>

           <Stack direction="row" spacing={1.5} alignItems="center">
              <DiscountFilter
                value={filters.discountOnly}
                onChange={(discountOnly) =>
                  setFilters((f) => ({
                    ...f,
                    discountOnly,
                    page: 1
                  }))
                }
              />

              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ height: 36 }}
                onClick={() => {
                  setEditingService(null)
                  setOpenServiceDialog(true)
                }}
              >
                Thêm dịch vụ
              </Button>
            </Stack>
        </Stack>

        {/* FILTERS */}
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
              setFilters((f) => ({
                ...f,
                categoryId: categoryId ?? undefined,
                page: 1
              }))
            }
          />

          <SearchFilter
            value={filters.search}
            onChange={(search) =>
              setFilters((f) => ({
                ...f,
                search,
                page: 1
              }))
            }
          />

          <PriceFilter
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onChange={(v) =>
              setFilters((f) => ({
                ...f,
                ...v,
                page: 1
              }))
            }
          />

          <SortFilter
            value={filters.sort}
            onChange={(sort) =>
              setFilters((f) => ({
                ...f,
                sort
              }))
            }
          />

        
        </Stack>
      </Box>


      {/* TABLE */}
      <ServiceTable
        services={services}
        categories={categories}
        onEdit={(s) => {
          setEditingService(s)
          setOpenServiceDialog(true)
        }}
        onDelete={async (id) => {
          if (confirm('Bạn có chắc muốn xoá dịch vụ này?')) {
            await deleteService(id)
            loadData()
          }
        }}
      />
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 3
          }}
        >
          <Button
            variant="outlined"
            disabled={filters.page! <= 1}
            onClick={() => setFilters((f) => ({ ...f, page: f.page! - 1 }))}
          >
            {'<'}
          </Button>

          <Typography fontWeight={600}>
            Trang {filters.page} / {totalPages}
          </Typography>

          <Button
            variant="outlined"
            disabled={filters.page! >= totalPages}
            onClick={() => setFilters((f) => ({ ...f, page: f.page! + 1 }))}
          >
            {'>'}
          </Button>
        </Box>

      {/* SERVICE DIALOG */}
      <ServiceFormDialog
        open={openServiceDialog}
        service={editingService}
        categories={categories}
        onClose={() => setOpenServiceDialog(false)}
        onSubmit={handleServiceSubmit}
      />

    
    </Box>
  )
}

export default HairSalonService
