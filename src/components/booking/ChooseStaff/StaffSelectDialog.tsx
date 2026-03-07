import {
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material"
import type { Staff } from "../../../types/Staff/Staff"
import StaffCardList from "../../staff/StaffCardList"

interface Props {
  open: boolean
  staffs: Staff[]
  selectedStaff: Staff | null
  availability: Record<string, boolean>
  onClose: () => void
  onSelect: (staff: Staff | null) => void
}

export default function StaffSelectDialog({
  open,
  staffs,
  selectedStaff,
  availability,
  onClose,
  onSelect
}: Props) {
  const handleSelect = (staff: Staff | null) => {
    onSelect(staff)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Chọn nhân viên</DialogTitle>

      <DialogContent>
        <StaffCardList
          staffs={staffs}
          selectedStaffId={selectedStaff?._id}
          availability={availability}
          onSelect={handleSelect}
        />
      </DialogContent>
    </Dialog>
  )
}