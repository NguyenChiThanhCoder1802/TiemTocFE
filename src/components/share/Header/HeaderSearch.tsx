import { Box, InputBase, alpha } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const HeaderSearch = () => {

  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/results?search=${search}`)
    }
  }

  return (
    <Box
      sx={{
        borderRadius: 2,
        backgroundColor: alpha("#FFF", 0.5),
        display: "flex",
        alignItems: "center",
        px: 1.5,
        py: 0.25
      }}
    >
      <SearchIcon sx={{ mr: 1, color: "#5D4037" }} />

      <InputBase
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      />
    </Box>
  )
}

export default HeaderSearch