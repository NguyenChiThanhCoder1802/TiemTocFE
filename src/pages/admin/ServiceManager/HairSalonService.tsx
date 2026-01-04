import { Box, Typography, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import {
  fetchServices,
  createService,
  updateService,
  deleteService
} from '../../../api/servicesAPI'
import type { Service } from '../../../types/HairService/Service'
import ServiceTable from './ServiceTable'
import ServiceFormDialog from './ServiceFormDialog'

const HairSalonService = () => {
  const [services, setServices] = useState<Service[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const loadServices = async () => {
    const data = await fetchServices()
    setServices(data)
  }

  useEffect(() => {
    loadServices()
  }, [])

  const handleSubmit = async (formData: FormData) => {
    // Log FormData entries for debugging server 400 errors
    for (const [k, v] of Array.from(formData.entries())) {
      try {
        if (v instanceof File) console.log('formData', k, v.name)
        else console.log('formData', k, v)
      } catch (e) {
        console.log('formData', k, v)
      }
    }

    if (editingService) {
      await updateService(editingService._id, formData)
    } else {
      await createService(formData)
    }
    setOpenDialog(false)
    loadServices()
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
        onEdit={(s) => {
          setEditingService(s)
          setOpenDialog(true)
        }}
        onDelete={async (id) => {
          if (confirm('Bạn có chắc muốn xoá dịch vụ này?')) {
            await deleteService(id)
            loadServices()
          }
        }}
      />

      {/* DIALOG */}
      <ServiceFormDialog
        open={openDialog}
        service={editingService}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  )
}

export default HairSalonService
