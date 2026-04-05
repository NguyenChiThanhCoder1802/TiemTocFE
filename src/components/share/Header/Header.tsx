import { AppBar, Toolbar, Box } from "@mui/material"
import { useState } from "react"
import useAuth from "../../../hooks/useAuth"

import HeaderLogo from "./HeaderLogo"
import HeaderMenu from "./HeaderMenu"
import HeaderSearch from "./HeaderSearch"
import HeaderActions from "./HeaderActions"

import CustomerSidebar from "../../../components/customer/Sidebar/CustomerSidebar"

const Header = () => {

  const { isAuthenticated, isAdmin } = useAuth()
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255, 243, 224, 0.6)",
          backdropFilter: "blur(6px)",
          borderBottom: "1px solid rgba(255,255,255,0.3)"
        }}
      >
        <Toolbar
          sx={{
            minHeight: 52,
            px: 2,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <HeaderLogo />
            <HeaderMenu />
          </Box>

          {/* RIGHT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
           
            <HeaderSearch /> 
            <HeaderActions openSidebar={() => setOpenSidebar(true)} />
          </Box>
        </Toolbar>
      </AppBar>

      {isAuthenticated && !isAdmin && (
        <CustomerSidebar
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
        />
      )}
    </>
  )
}

export default Header