import { useState } from "react"
import { Fab, Box } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import CloseIcon from "@mui/icons-material/Close"
import ChatBox from "./ChatBox"

const ChatWidget = () => {

  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ChatBox */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            bottom: 90,
            right: 20,
            zIndex: 9999
          }}
        >
          <ChatBox />
        </Box>
      )}

      {/* Chat Bubble */}
      <Fab
        color="primary"
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9999
        }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </>
  )
}

export default ChatWidget