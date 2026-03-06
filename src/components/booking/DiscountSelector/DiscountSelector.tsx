import { useEffect, useState } from 'react'
import { Box, Stack, Typography, Chip, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { getDiscountCards, applyDiscountCard } from '../../../api/discountAPI'
import type { DiscountCard } from '../../../types/Discount/Discount'

import DiscountManualInput from './DiscountManualInput'
import DiscountDialog from './DiscountDialog'

interface Props {
  amount: number
  serviceIds: string[]
  onApply: (data: {
    code: string
    discountAmount: number
    finalAmount: number
  } | null) => void
}

export default function DiscountSelector({
  amount,
  serviceIds,
  onApply
}: Props) {
  const [discounts, setDiscounts] = useState<DiscountCard[]>([])
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [loadingCode, setLoadingCode] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDiscountCards()
      setDiscounts(data.filter(d => d.isActive))
    }
    fetchData()
  }, [])

  const applyVoucher = async (code: string) => {
    try {
      setLoadingCode(code)

      const result = await applyDiscountCard(
        code,
        amount,
        serviceIds
      )

      setSelectedCode(result.discountSnapshot.code)

      onApply({
        code: result.discountSnapshot.code,
        discountAmount: result.discountAmount,
        finalAmount: result.finalAmount
      })

      setOpenDialog(false)

    } catch {
      alert('Voucher không hợp lệ')
      setSelectedCode(null)
      onApply(null)
    } finally {
      setLoadingCode(null)
    }
  }

  const removeVoucher = () => {
    setSelectedCode(null)
    onApply(null)
  }

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        p: 3,
        borderRadius: 3,
        boxShadow: 1
      }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Chọn Voucher
        </Typography>

        <Typography
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={() => setOpenDialog(true)}
        >
          Ưu đãi
        </Typography>
      </Stack>

      <DiscountManualInput onApply={applyVoucher} />

      {selectedCode && (
        <Stack direction="row" spacing={2} mb={2}>
          <Chip
            icon={<CheckCircleIcon />}
            label={`Đã áp dụng: ${selectedCode}`}
            color="primary"
          />
          <Button color="secondary" onClick={removeVoucher}>
            Bỏ voucher
          </Button>
        </Stack>
      )}

      <DiscountDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        discounts={discounts}
        selectedCode={selectedCode}
        loadingCode={loadingCode}
        onSelect={applyVoucher}
      />
    </Box>
  )
}