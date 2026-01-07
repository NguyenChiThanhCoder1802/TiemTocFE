import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  Chip,

} from '@mui/material'

import { getStaffListApi, approveStaffApi } from '../../../api/AdminAPI'

interface Staff {
  _id: string
  user: {
    _id: string
    name: string
    email: string
  }
  experienceYears: number
  skills: string[]
  position: 'stylist' | 'assistant' | 'manager'
  status: 'pending' | 'approved' | 'rejected'
}

interface Props {
  open: boolean
  onClose: () => void
  onApproved?: () => void // callback reload StaffList
}

/* ===================== HELPERS ===================== */

const renderStatus = (status: Staff['status']) => {
  switch (status) {
    case 'pending':
      return <Chip label="Chờ duyệt" color="warning" size="small" />
    case 'approved':
      return <Chip label="Đã duyệt" color="success" size="small" />
    case 'rejected':
      return <Chip label="Từ chối" color="error" size="small" />
    default:
      return null
  }
}

/* ===================== COMPONENT ===================== */

const StaffApprovalDialog = ({ open, onClose, onApproved }: Props) => {
  const [staffs, setStaffs] = useState<Staff[]>([])
  const [loading, setLoading] = useState(false)

  const fetchStaffs = async () => {
    setLoading(true)
    const res = await getStaffListApi(false)
    setStaffs(res.data.data)
    setLoading(false)
  }

  useEffect(() => {
    if (open) fetchStaffs()
  }, [open])

  const handleApprove = async (userId: string) => {
    await approveStaffApi(userId)
    await fetchStaffs()
    onApproved?.()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Duyệt nhân viên</DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Typography>Đang tải...</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Vị trí</TableCell>
                <TableCell>Kinh nghiệm</TableCell>
                <TableCell>Kỹ năng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {staffs.map(staff => (
                <TableRow key={staff._id}>
                  <TableCell>{staff.user.name}</TableCell>
                  <TableCell>{staff.user.email}</TableCell>
                  <TableCell>{staff.position}</TableCell>
                  <TableCell>{staff.experienceYears} năm</TableCell>
                  <TableCell>
                    {staff.skills.length ? staff.skills.join(', ') : '-'}
                  </TableCell>
                  <TableCell>
                    {renderStatus(staff.status)}
                  </TableCell>
                  <TableCell>
                    {staff.status === 'pending' && (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleApprove(staff.user._id)}
                      >
                        Duyệt
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {!staffs.length && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body2" color="text.secondary">
                      Không có nhân viên cần duyệt
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  )
}

export default StaffApprovalDialog
