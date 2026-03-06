import { Box, CircularProgress, Typography } from "@mui/material"
import ReactMarkdown from "react-markdown"
interface Props {
  role: "user" | "ai"
  text: string
  loading?: boolean

}

const ChatMessage = ({ role, text, loading }: Props) => {

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
          maxWidth: "70%",
          wordBreak: "break-word"
        }}
      >
         {loading ? (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={14} />
            <Typography fontSize={13}>AI đang trả lời...</Typography>
          </Box>
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <Typography fontSize={14} mb={1}>
                  {children}
                </Typography>
              ),
              li: ({ children }) => (
                <li style={{ marginBottom: 4 }}>
                  <Typography fontSize={14}>{children}</Typography>
                </li>
              ),
              strong: ({ children }) => (
                <Typography component="span" fontWeight={600}>
                  {children}
                </Typography>
              )
            }}
          >
            {text}
          </ReactMarkdown>
        )}
      </Box>
    </Box>
  )
}

export default ChatMessage