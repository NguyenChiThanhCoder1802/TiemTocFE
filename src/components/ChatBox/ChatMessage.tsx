import { Box, Typography } from "@mui/material"

interface Props {
  role: "user" | "ai"
  text: string
}

const ChatMessage = ({ role, text }: Props) => {

  const isUser = role === "user"

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start"
      }}
    >
      <Box
        sx={{
          bgcolor: isUser ? "primary.main" : "grey.200",
          color: isUser ? "#fff" : "#000",
          px: 2,
          py: 1.2,
          borderRadius: 2,
          maxWidth: "70%"
        }}
      >
        <Typography fontSize={14}>
          {text}
        </Typography>
      </Box>
    </Box>
  )
}

export default ChatMessage