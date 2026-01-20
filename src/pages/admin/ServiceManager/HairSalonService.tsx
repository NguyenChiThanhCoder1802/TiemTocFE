import { Box, Typography, Button, Stack } from '@mui/material'
import { Add, Layers } from '@mui/icons-material'
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
import ComboDialog from './ComboDialog'

const HairSalonService = () => {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [openServiceDialog, setOpenServiceDialog] = useState(false)
  const [openComboDialog, setOpenComboDialog] = useState(false)
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

  const handleServiceSubmit = async (formData: FormData) => {
    if (editingService) {
      await updateService(editingService._id, formData)
    } else {
      await createService(formData)
    }
    setOpenServiceDialog(false)
    loadData()
  }

  const handleCreateCombo = async (formData: FormData) => {
    await createService(formData)
    setOpenComboDialog(false)
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

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<Layers />}
            onClick={() => setOpenComboDialog(true)}
          >
            Tạo combo
          </Button>

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

      {/* SERVICE DIALOG */}
      <ServiceFormDialog
        open={openServiceDialog}
        service={editingService}
        categories={categories}
        onClose={() => setOpenServiceDialog(false)}
        onSubmit={handleServiceSubmit}
      />

      {/* COMBO DIALOG */}
      <ComboDialog
        open={openComboDialog}
        services={services}
        categories={categories}
        onClose={() => setOpenComboDialog(false)}
        onSubmit={handleCreateCombo}
      />
    </Box>
  )
}

export default HairSalonService
