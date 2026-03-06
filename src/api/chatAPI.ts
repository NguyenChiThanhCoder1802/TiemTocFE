import axiosInstance from "../utils/axiosInstance"
import type { ApiResponse } from "../types/ApiResponse"

const BASE_URL = "/chat"

/* ======================
   ASK AI
====================== */

export const askAI = async (message: string): Promise<string> => {

  const res = await axiosInstance.post<ApiResponse<{ reply: string }>>(
    `${BASE_URL}/ask`,
    { message }
  )

  return res.data.data.reply
}