import { Box, Typography, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkUpdateCategoryStatus
} from '../../../api/CategoryAPI'
import type { Category } from '../../../types/Category/Category'
import CategoryTable from './CategoryTable'
import CategoryDialog from './CategoryDialog'

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null)

  const loadData = async () => {
    const data = await fetchCategories()
    setCategories(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmit = async (payload: {
    name: string
    description?: string
    order?: number
    isActive: boolean
  }) => {
    if (editingCategory) {
      await updateCategory(editingCategory._id, payload)
    } else {
      await createCategory(payload)
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
          Quản lý danh mục
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingCategory(null)
            setOpenDialog(true)
          }}
        >
          Thêm danh mục
        </Button>
      </Box>

      {/* TABLE */}
      <CategoryTable
        categories={categories}
        onEdit={(cat) => {
          setEditingCategory(cat)
          setOpenDialog(true)
        }}
        onToggleActive={async (cat) => {
          await bulkUpdateCategoryStatus(
            [cat._id],
            !cat.isActive
          )
          loadData()
        }}
        onDelete={async (id) => {
          if (confirm('Xoá danh mục này?')) {
            await deleteCategory(id)
            loadData()
          }
        }}
      />

      {/* DIALOG */}
      <CategoryDialog
        open={openDialog}
        category={editingCategory}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  )
}

export default CategoryPage
