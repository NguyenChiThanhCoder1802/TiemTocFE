import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
} from '@mui/material'

import { Add } from '@mui/icons-material'

import {
  useEffect,
  useState,
  useCallback,
} from 'react'

import {
  fetchServiceAdmin,
  createService,
  updateService,
  deleteService,
} from '../../../api/servicesAPI'

import { fetchCategories } from '../../../api/CategoryAPI'

import type { Service } from '../../../types/HairService/Service'
import type { Category } from '../../../types/Category/Category'

import ServiceTable from './ServiceTable'
import ServiceFormDialog from './ServiceFormDialog'
import ServiceStats from './components/ServiceStats'
import ServiceFilters from './components/ServiceFilters'
import ServicePagination from './components/ServicePagination'
import ServiceStatisticsDialog from './components/ServiceStatisticsDialog'

import type { FetchServicesParams } from '../../../types/SearchParams/Params'

const HairSalonService = () => {
  const [services, setServices] =
    useState<Service[]>([])

  const [categories, setCategories] =
    useState<Category[]>([])

  const [openServiceDialog, setOpenServiceDialog] =
    useState(false)

  const [editingService, setEditingService] =
    useState<Service | null>(null)

  const [statisticsService, setStatisticsService] =
    useState<Service | null>(null)

  const [filters, setFilters] =
    useState<FetchServicesParams>({
      page: 1,
      limit: 10,
    })

  const [total, setTotal] = useState(0)

  const [totalPages, setTotalPages] =
    useState(1)

  /* ==================================================
     LOAD DATA
  ================================================== */

  const loadData = useCallback(async () => {
    const [
      serviceData,
      categoryData,
    ] = await Promise.all([
      fetchServiceAdmin(filters),
      fetchCategories({
        isActive: true,
      }),
    ])

    setServices(serviceData.data)

    setTotal(
      serviceData.pagination.total
    )

    setTotalPages(
      serviceData.pagination.totalPages
    )

    setCategories(categoryData)
  }, [filters])

  useEffect(() => {
    loadData()
  }, [loadData])

  /* ==================================================
     FILTER
  ================================================== */

  const handleFilterChange = (
    value: Partial<FetchServicesParams>
  ) => {
    setFilters((current) => ({
      ...current,
      ...value,
    }))
  }

  /* ==================================================
     CREATE / UPDATE
  ================================================== */

  const handleServiceSubmit = async (
    formData: FormData
  ) => {
    if (editingService) {
      await updateService(
        editingService._id,
        formData
      )
    } else {
      await createService(formData)
    }

    setOpenServiceDialog(false)

    setEditingService(null)

    loadData()
  }

  /* ==================================================
     DELETE
  ================================================== */

  const handleDelete = async (
    id: string
  ) => {
    if (
      !confirm(
        'Bạn có chắc muốn xoá dịch vụ này?'
      )
    ) {
      return
    }

    await deleteService(id)

    loadData()
  }

  return (
    <Box>
      {/* ==================================================
          HEADER
      ================================================== */}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Quản lý dịch vụ
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Quản lý dịch vụ, giá, trạng thái
            và hiệu suất
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingService(null)
            setOpenServiceDialog(true)
          }}
        >
          Thêm dịch vụ
        </Button>
      </Stack>

      {/* ==================================================
          STATS
      ================================================== */}

      <ServiceStats
        services={services}
      />

      {/* ==================================================
          FILTER
      ================================================== */}

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <ServiceFilters
          filters={filters}
          categories={categories}
          onChange={handleFilterChange}
        />
      </Paper>

      {/* ==================================================
          TABLE
      ================================================== */}

      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'auto',
        }}
      >
        <ServiceTable
          services={services}
          onEdit={(service) => {
            setEditingService(service)
            setOpenServiceDialog(true)
          }}
          onDelete={handleDelete}
          onStatistics={(service) => {
            setStatisticsService(service)
          }}
        />
      </Paper>

      {/* ==================================================
          PAGINATION
      ================================================== */}

      <ServicePagination
        page={filters.page ?? 1}
        totalPages={totalPages}
        total={total}
        onChange={(page) =>
          setFilters((current) => ({
            ...current,
            page,
          }))
        }
      />

      {/* ==================================================
          FORM
      ================================================== */}

      <ServiceFormDialog
        open={openServiceDialog}
        service={editingService}
        categories={categories}
        onClose={() => {
          setOpenServiceDialog(false)
          setEditingService(null)
        }}
        onSubmit={handleServiceSubmit}
      />

      {/* ==================================================
          STATISTICS
      ================================================== */}

      <ServiceStatisticsDialog
        open={Boolean(statisticsService)}
        service={statisticsService}
        onClose={() =>
          setStatisticsService(null)
        }
      />
    </Box>
  )
}

export default HairSalonService