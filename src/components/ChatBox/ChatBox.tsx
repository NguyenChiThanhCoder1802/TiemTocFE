import { useState, useRef, useEffect } from "react"
import { Box, Paper, TextField, IconButton, Typography } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import ChatMessage from "./ChatMessage"
import { askAI } from "../../api/chatAPI"

interface Message {
  role: "user" | "ai"
  text: string
}

const ChatBox = () => {

  const [messages, setMessages] = useState<Message[]>(([
    {
      role: "ai",
      text: "Xin chào 👋 Tôi có thể tư vấn dịch vụ tóc cho bạn."
    }
  ]))

  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const sendMessage = async () => {

    if (!input.trim()) return

    const question = input

    const userMessage: Message = {
      role: "user",
      text: question
    }

    setMessages(prev => [...prev, userMessage])

    setInput("")

    try {

      const reply = await askAI(question)

      const aiMessage: Message = {
        role: "ai",
        text: reply
      }

      setMessages(prev => [...prev, aiMessage])

    } catch (error) {

      setMessages(prev => [
        ...prev,
        {
          role: "ai",
          text: "Xin lỗi, hệ thống đang bận."
        }
      ])
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <Paper
      elevation={4}
      sx={{
        width: 350,
        height: 500,
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #eee"
        }}
      >
        <Typography fontWeight={600}>
          Chat tư vấn dịch vụ
        </Typography>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5
        }}
      >
        {messages.map((m, i) => (
          <ChatMessage
            key={i}
            role={m.role}
            text={m.text}
          />
        ))}

        <div ref={bottomRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          display: "flex",
          borderTop: "1px solid #eee",
          p: 1
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Nhập câu hỏi..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage()
          }}
        />

        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>

      </Box>

    </Paper>
  )
}

export default ChatBox