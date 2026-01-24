import { Box, Typography, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import {
  fetchCombos,
  createCombo,
  updateCombo,
  deleteCombo
} from '../../../api/ComboAPI'
import { fetchServices } from '../../../api/servicesAPI'
import type { Combo } from '../../../types/Combo/Combo'
import type { Service } from '../../../types/HairService/Service'
import ComboTable from './ComboTable'
import ComboDialog from './ComboDialog'

const ComboManager = () => {
  const [combos, setCombos] = useState<Combo[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingCombo, setEditingCombo] = useState<Combo | null>(null)

  const loadData = async () => {
    const [comboData, serviceData] = await Promise.all([
      fetchCombos(),
      fetchServices()
    ])
    setCombos(comboData)
    setServices(serviceData)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmit = async (formData: FormData) => {
    if (editingCombo) {
      await updateCombo(editingCombo._id, formData)
    } else {
      await createCombo(formData)
    }
    setOpenDialog(false)
    setEditingCombo(null)
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
          Quản lý Combo
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingCombo(null)
            setOpenDialog(true)
          }}
        >
          Thêm combo
        </Button>
      </Box>

      {/* TABLE */}
      <ComboTable
        combos={combos}
        onEdit={(c) => {
          setEditingCombo(c)
          setOpenDialog(true)
        }}
        onDelete={async (id) => {
          if (confirm('Bạn có chắc muốn xoá combo này?')) {
            await deleteCombo(id)
            loadData()
          }
        }}
      />

      {/* DIALOG */}
      <ComboDialog
        open={openDialog}
        combo={editingCombo}
        services={services}
        onClose={() => {
          setOpenDialog(false)
          setEditingCombo(null)
        }}
        onSubmit={handleSubmit}
      />
    </Box>
  )
}

export default ComboManager
