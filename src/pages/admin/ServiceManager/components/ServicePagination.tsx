import {
  Box,
  Pagination,
  Typography,
  Stack,
} from '@mui/material'

interface Props {
  page: number
  totalPages: number
  total: number
  onChange: (page: number) => void
}

const ServicePagination = ({
  page,
  totalPages,
  total,
  onChange,
}: Props) => {
  if (totalPages <= 1) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        mt={3}
      >
        Tổng {total} dịch vụ
      </Typography>
    )
  }

  return (
    <Stack
      alignItems="center"
      spacing={1}
      mt={3}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) =>
          onChange(value)
        }
        color="primary"
        shape="rounded"
      />

      <Typography
        variant="caption"
        color="text.secondary"
      >
        Trang {page} / {totalPages} · Tổng {total} dịch vụ
      </Typography>
    </Stack>
  )
}

export default ServicePagination