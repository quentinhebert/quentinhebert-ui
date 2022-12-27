import { useContext, useState } from "react"
import { Avatar, Backdrop, Box, ListItem, Stack, Tooltip } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import DashboardIcon from "@mui/icons-material/Dashboard"
import { PersonalComputer, Projects } from "grommet-icons"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import PersonIcon from "@mui/icons-material/Person"
import WorkIcon from "@mui/icons-material/Work"
import EmailIcon from "@mui/icons-material/Email"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { UserContext } from "../../../contexts/UserContext"
import ExpandOutlinedIcon from "@mui/icons-material/ExpandOutlined"
import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined"
import { USERTYPES } from "../../../enums/userTypes"
import Link from "next/link"
import BodyText from "../../Text/body-text"
import WaitForLogout from "../../Modals/wait-for-logout"
import { logout } from "../../../services/utils"
import BasicTooltip from "../../Helpers/basic-tooltip"
import { useRouter } from "next/router"

const AdminItems = [
  {
    label: "Panneau adminitrateur",
    icon: <AdminPanelSettingsIcon />,
    url: "/admin",
    section: "admin",
    orderMobile: 1,
  },
  {
    label: "Mon compte",
    icon: <PersonIcon />,
    url: "/account",
    section: "account",
    orderMobile: 3,
  },
  {
    label: "Dashboard",
    icon: <DashboardIcon color="#fff" />,
    url: "/dashboard",
    section: "dashboard",
    orderMobile: 2,
  },
]

const ClientItems = [
  {
    label: "Mon compte",
    icon: <PersonIcon />,
    url: "/account",
    section: "account",
  },
  {
    label: "Mes commandes",
    icon: <ShoppingCartIcon />,
    url: "/account/orders",
    section: "orders",
  },
  // { label: "Messages", icon: <EmailIcon />, url: "#" },
]

const ProfessionalItems = [
  { label: "Mon compte", icon: <PersonIcon />, url: "/account" },
  // { label: "Mes missions", icon: <WorkIcon />, url: "#" },
  // { label: "Messages", icon: <EmailIcon />, url: "#" },
]

const Separator = () => (
  <Stack
    sx={{
      borderTop: "1px solid #fff",
      width: "90%",
      opacity: 0.3,
      display: { xs: "none", md: "flex" },
    }}
  />
)

const AvatarBubble = ({ user }) => {
  if (user?.avatar_path)
    return (
      <Avatar
        alt="Avatar"
        src={user?.avatar_path}
        sx={{ width: "1.5rem", height: "1.5rem" }}
      />
    )
  return (
    <Avatar sx={{ width: "1.5rem", height: "1.5rem" }}>
      {user?.firstname[0] || ""}
    </Avatar>
  )
}

const Label = ({ ...props }) => (
  <BodyText
    fontSize="1rem"
    sx={{
      opacity: 0.5,
      whiteSpace: "nowrap",
      display: { xs: "none", md: "flex" },
    }}
    {...props}
  />
)

export function VerticalMenuBar({}) {
  /******** CONTEXTS ********/
  const { user, setUser, setAccessToken } = useContext(UserContext)
  const router = useRouter()

  /******** USE-STATES ********/
  const [isExpanded, setIsExpanded] = useState(false)
  const [openLogoutModal, setOpenLogoutModal] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)

  /******** HANDLERS ********/
  const handleOpenLogoutModal = () => setOpenLogoutModal(true)
  const handleCloseLogoutModal = () => setOpenLogoutModal(false)
  const toggleExpand = () => {
    if (isExpanded) return handleReduce()
    setIsExpanded(true)
    setOpenBackdrop(true)
  }
  const handleReduce = () => {
    setIsExpanded(false)
    setOpenBackdrop(false)
  }
  const handleLogout = async () => {
    handleOpenLogoutModal()
    const isLoggedOut = await logout() // clean local cookies
    if (isLoggedOut) {
      setAccessToken(null) // User Context
      setUser(null) // User Context}
    }
    handleCloseLogoutModal()
  }

  const pageSection = router.pathname.split("/")[1]
  const pageSubSection = router.pathname.split("/")[2]
  const isActive = (section) => {
    if (pageSection === section && pageSubSection !== "orders") return true
    if (section !== "account" && pageSubSection === "orders") return true
    return false
  }

  /******** SUB-COMPONENTS ********/
  const renderMenuItems = (setOfItems) => {
    return (
      <>
        {setOfItems.map((item, key) => (
          <Link key={key} href={item.url} passHref>
            <Stack
              component="a"
              sx={{
                width: { xs: "auto", md: "100%" },
                order: { xs: item.orderMobile, md: 0 },
              }}
            >
              <BasicTooltip title={item.label} disabled={isExpanded}>
                <ListItem button>
                  <Stack
                    flexDirection="row"
                    gap={2}
                    alignItems="center"
                    padding="0.5rem 0"
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    <Box
                      sx={{
                        color: isActive(item.section)
                          ? (theme) => theme.palette.secondary.main
                          : "#fff",
                      }}
                    >
                      {item.icon}
                    </Box>
                    {isExpanded ? <Label>{item.label}</Label> : null}
                  </Stack>
                </ListItem>
              </BasicTooltip>
            </Stack>
          </Link>
        ))}
      </>
    )
  }

  /******** RENDER ********/
  return (
    <>
      <Backdrop
        open={openBackdrop}
        onClick={toggleExpand}
        sx={{ zIndex: 1100 }}
      />

      <Stack
        component="nav"
        position="fixed"
        alignItems="center"
        zIndex={1101}
        sx={{
          width: { xs: "100%", md: isExpanded ? "300px" : "55px" },
          top: { xs: null, md: 0 },
          bottom: { xs: 0, md: null },
          left: 0,
          padding: { xs: "1rem", md: "0 0 1.5rem 0" },
          height: { xs: "55px", md: "100vh" },
          flexDirection: { xs: "row", md: "column" },
          justifyContent: "center",

          transition: "width 0.1s ease-in-out",
          background: (theme) => theme.palette.background.main,
          color: "#fff",
          boxShadow: "0px 0px 20px 0px rgb(0,0,0,0.5)",
        }}
      >
        <ListItem
          sx={{
            display: { xs: "none", md: "flex" },
            background: (theme) => theme.palette.background.darkGrey,
            padding: "1.5rem 1rem",
          }}
        >
          <Stack
            flexDirection="row"
            gap={2}
            alignItems="center"
            sx={{ whiteSpace: "nowrap" }}
          >
            <AvatarBubble user={user} />
            {isExpanded ? (
              <BodyText fontSize="1rem">
                {user.firstname} {user.lastname}
              </BodyText>
            ) : (
              <></>
            )}
          </Stack>
        </ListItem>

        {!!user && user.type === USERTYPES.ADMIN && renderMenuItems(AdminItems)}

        {!!user &&
          user.type === USERTYPES.CLIENT &&
          renderMenuItems(ClientItems)}

        {!!user &&
          user.type === USERTYPES.PROFESSIONAL &&
          renderMenuItems(ProfessionalItems)}

        <Stack sx={{ flexGrow: { xs: 0, md: 1 } }} />

        <BasicTooltip
          title="Déconnexion"
          disabled={isExpanded}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <ListItem button onClick={handleLogout}>
            <Stack flexDirection="row" gap={2} padding="0.5rem 0">
              <LogoutIcon />
              {isExpanded ? <Label>Déconnexion</Label> : <></>}
            </Stack>
          </ListItem>
        </BasicTooltip>

        <Separator />

        <BasicTooltip
          title="Développer"
          disabled={isExpanded}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <ListItem button onClick={toggleExpand}>
            <Stack
              flexDirection="row"
              gap={2}
              padding="0.5rem 0"
              sx={{
                cursor: "pointer",
              }}
            >
              <Stack sx={{ rotate: "90deg" }}>
                {isExpanded ? <CompressOutlinedIcon /> : <ExpandOutlinedIcon />}
              </Stack>
              {isExpanded ? <Label>Réduire</Label> : <></>}
            </Stack>
          </ListItem>
        </BasicTooltip>
      </Stack>

      <WaitForLogout open={openLogoutModal} />
    </>
  )
}
