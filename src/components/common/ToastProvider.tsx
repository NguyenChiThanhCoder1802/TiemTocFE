import { useState } from "react"
import { Snackbar, Alert } from "@mui/material"
import { ToastContext } from "./ToastContext"
import type { ToastType } from "./ToastContext"
export default function ToastProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState<ToastType>("success")

  const showToast = (msg: string, toastType: ToastType = "success") => {
    setMessage(msg)
    setType(toastType)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 8 }}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="outlined"
          sx={{
            bgcolor: "white",
            fontWeight: 500
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}