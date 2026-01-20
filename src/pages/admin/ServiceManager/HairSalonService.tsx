import { Box, Typography, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import {
  fetchServices,
  createService,
  updateService,
  deleteService
} from '../../../api/servicesAPI'
import { fetchCategories } from '../../../api/CategoryAPI'
import type { Service } from '../../../types/HairService/Service'
import type { Category } from '../../../types/Category/Category'
import ServiceTable from './ServiceTable'
import ServiceFormDialog from './ServiceFormDialog'

const HairSalonService = () => {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

   const loadData = async () => {
    const [serviceData, categoryData] = await Promise.all([
      fetchServices(),
      fetchCategories({ isActive: true })
    ])
    setServices(serviceData)
    setCategories(categoryData)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmit = async (formData: FormData) => {
    if (editingService) {
      await updateService(editingService._id, formData)
    } else {
      await createService(formData)
    }
    setOpenDialog(false)
    loadData()
  }

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Quản lý dịch vụ
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingService(null)
            setOpenDialog(true)
          }}
        >
          Thêm dịch vụ
        </Button>
      </Box>

      {/* TABLE */}
      <ServiceTable
        services={services}
        categories={categories}
        onEdit={(s) => {
          setEditingService(s)
          setOpenDialog(true)
        }}
        onDelete={async (id) => {
          if (confirm('Bạn có chắc muốn xoá dịch vụ này?')) {
            await deleteService(id)
            loadData()
          }
        }}
      />

      {/* DIALOG */}
      <ServiceFormDialog
        open={openDialog}
        service={editingService}
        categories={categories}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  )
}

export default HairSalonService
