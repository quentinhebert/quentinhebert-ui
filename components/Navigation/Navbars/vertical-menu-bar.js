import { useContext, useState } from "react"
import {
  Avatar,
  Backdrop,
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SwipeableDrawer,
} from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PersonIcon from "@mui/icons-material/Person"
import WorkIcon from "@mui/icons-material/Work"
import EmailIcon from "@mui/icons-material/Email"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { UserContext } from "../../../contexts/UserContext"
import ExpandOutlinedIcon from "@mui/icons-material/ExpandOutlined"
import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined"
import { USERTYPES } from "../../../enums/userTypes"
import BodyText from "../../Text/body-text"
import WaitForLogout from "../../Modals/wait-for-logout"
import { logout } from "../../../services/utils"
import BasicTooltip from "../../Helpers/basic-tooltip"
import { useRouter } from "next/router"
import NextLink from "../../Helpers/next-link"
import SettingsIcon from "@mui/icons-material/Settings"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import IconButtonWrapper from "../../Buttons/icon-button-wrapper"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import EuroIcon from "@mui/icons-material/Euro"
import LeaderboardIcon from "@mui/icons-material/Leaderboard"
import EventIcon from "@mui/icons-material/Event"
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined"
import Link from "next/link"

const AdminItems = [
  {
    label: "Mon compte",
    icon: <PersonIcon />,
    url: "/account",
    section: "account",
    orderMobile: 1,
  },
  {
    label: "Dashboard",
    icon: <DashboardIcon color="#fff" />,
    url: "/dashboard",
    section: "dashboard",
    orderMobile: 2,
  },
  {
    label: "Panneau adminitrateur",
    icon: <SettingsIcon />,
    url: "/admin",
    section: "admin",
    orderMobile: 3,
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
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()

  /******** USE-STATES ********/
  const [isExpanded, setIsExpanded] = useState(false)
  const [openLogoutModal, setOpenLogoutModal] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false)

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
      setUser(null) // User Context}
    }
    handleCloseLogoutModal()
  }
  function toggleMobileDrawer(bool) {
    return setOpenMobileDrawer(bool)
  }

  const pageSection = router.pathname.split("/")[1]
  const pageSubSection = router.pathname.split("/")[2]
  const isActive = (section) => {
    if (
      section === "account" &&
      pageSection === "account" &&
      pageSubSection === "orders"
    )
      return false
    if (
      section === "orders" &&
      pageSection === "account" &&
      pageSubSection === "orders"
    )
      return true
    if (pageSection === section) return true
    return false
  }

  /******** SUB-COMPONENTS ********/
  const renderMenuItems = (setOfItems) => {
    return (
      <>
        {setOfItems.map((item, key) => (
          <NextLink key={key} href={item.url}>
            <Stack
              sx={{
                width: { xs: "auto", md: "100%" },
                order: { xs: item.orderMobile, md: 0 },
              }}
            >
              <BasicTooltip title={item.label} disabled={isExpanded}>
                <ListItem>
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
          </NextLink>
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
        zIndex={1101}
        sx={{
          alignItems: { xs: "center", md: "start" },
          width: { xs: "100%", md: isExpanded ? "300px" : "55px" },
          top: { xs: null, md: 0 },
          bottom: { xs: 0, md: null },
          left: 0,
          padding: { xs: "1rem 1rem .5rem", md: "0 0 1.5rem 0" },
          height: { xs: "55px", md: "100svh" },
          flexDirection: { xs: "row", md: "column" },
          justifyContent: "space-between",

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

        <IconButtonWrapper
          onClick={() => toggleMobileDrawer(true)}
          tooltip="Menu"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuRoundedIcon />
        </IconButtonWrapper>

        <Stack sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />

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

      <SwipeableDrawer
        anchor="bottom"
        open={openMobileDrawer}
        onClose={() => toggleMobileDrawer(false)}
        onOpen={() => toggleMobileDrawer(true)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundImage: "",
            background: (theme) => theme.palette.background.main,
            borderRadius: "30px 30px 0 0",
            pt: 2,
          },
        }}
      >
        <Stack
          sx={{
            width: "40%",
            height: "6px",
            background: "grey",
            borderRadius: "30px",
            alignSelf: "center",
            mt: -1,
          }}
        />
        <MobileMenuList
          handleClose={() => toggleMobileDrawer(false)}
          handleLogout={handleLogout}
        />
      </SwipeableDrawer>
    </>
  )
}

function MobileMenuList({ handleClose, handleLogout }) {
  const { user } = useContext(UserContext)

  const ProfessionalDrawerList = []
  const AdminDrawerList = [
    {
      label: "Panneau Admin",
      icon: <SettingsIcon />,
      href: "/admin",
      nested: [
        {
          label: "Informations",
          icon: <InfoOutlinedIcon />,
          href: "/admin/manage-website-informations",
        },
        {
          label: "Fichiers",
          icon: <FolderOpenOutlinedIcon />,
          href: "/admin/manage-files",
        },
        {
          label: "Utilisateurs",
          icon: <SupervisedUserCircleIcon />,
          href: "/admin/manage-users",
        },
      ],
    },
    {
      label: "Mon compte",
      icon: <PersonIcon />,
      href: "/account",
      nested: [
        {
          label: "Informations personnelles",
          href: "/account/personal-information",
        },
        { label: "Sécurité", href: "/account/security" },
      ],
    },
    {
      label: "Back-Office",
      icon: <DesktopMacOutlinedIcon />,
      href: "/admin/back-office",
      nested: [
        { label: "Services", href: "/admin/back-office/services" },
        { label: "Références", href: "/admin/back-office/references" },
        { label: "Vidéo", href: "/admin/back-office/video" },
        { label: "Web", href: "/admin/back-office/web" },
      ],
    },
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      href: "/dashboard",
      nested: [
        {
          label: "Stats",
          icon: <LeaderboardIcon />,
          href: "/dashboard?active_tab=stats",
        },
        {
          label: "Prospects",
          icon: <MarkEmailUnreadOutlinedIcon />,
          href: "/dashboard?active_tab=prospects",
        },
        {
          label: "Commandes",
          icon: <WorkOutlineOutlinedIcon />,
          href: "/dashboard?active_tab=orders",
        },
        {
          label: "Agenda",
          icon: <EventIcon />,
          href: "/dashboard?active_tab=calendar",
        },
        {
          label: "Solde",
          icon: <EuroIcon />,
          href: "/dashboard?active_tab=balance",
        },
      ],
    },
  ]
  const ClientDrawerList = []

  const DrawerList = () => {
    if (!user) return []
    switch (user?.type) {
      case USERTYPES.ADMIN:
        return AdminDrawerList
      case USERTYPES.CLIENT:
        return ClientDrawerList
      case USERTYPES.PROFESSIONAL:
        return ProfessionalDrawerList
      default:
        return []
    }
  }

  let initialNestedOpen = []
  DrawerList().map(() => {
    initialNestedOpen.push(false)
  })
  const [isNestedOpen, setIsNestedOpen] = useState(initialNestedOpen)

  return (
    <Box role="presentation" sx={{ width: "100%", color: "#fff" }}>
      <List>
        {DrawerList().map((item, key) => (
          <>
            <Link href={item.href || "#"} passHref>
              <ListItemButton onClick={handleClose}>
                {!!item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.label} />
                <Box display={!!item.nested?.length ? "flex" : "none"}>
                  <IconButtonWrapper
                    tooltip={isNestedOpen[key] ? "Masquer" : "Afficher plus"}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const localArray = [...initialNestedOpen]
                      localArray[key] = !isNestedOpen[key]
                      setIsNestedOpen(localArray)
                    }}
                  >
                    {isNestedOpen[key] ? <ExpandLess /> : <ExpandMore />}
                  </IconButtonWrapper>
                </Box>
              </ListItemButton>
            </Link>

            {!!item.nested?.length &&
              item.nested.map((nestedItem) => (
                <Collapse in={isNestedOpen[key]} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    sx={{ background: "rgb(0,0,0,0.5)" }}
                  >
                    <Link href={nestedItem.href || "#"} passHref>
                      <ListItemButton sx={{ pl: 4 }} onClick={handleClose}>
                        {!!nestedItem.icon && (
                          <ListItemIcon>{nestedItem.icon}</ListItemIcon>
                        )}
                        <ListItemText primary={nestedItem.label} />
                      </ListItemButton>
                    </Link>
                  </List>
                </Collapse>
              ))}
          </>
        ))}
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon
                sx={{ color: (theme) => theme.alert.title.error.color }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Déconnexion"
              sx={{ color: (theme) => theme.alert.title.error.color }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List
        sx={{
          color: "lightgrey",
          background: "rgb(0,0,0,0.2)",
          "& .MuiListItemText-root": { flex: "0", minWidth: "auto" },
          "& .MuiListItemIcon-root": { minWidth: "auto" },
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleClose}
            sx={{ display: "flex", justifyContent: "center", gap: 1 }}
          >
            <ListItemIcon onClick={handleClose}>
              <CloseRoundedIcon sx={{ color: "lightgrey" }} />
            </ListItemIcon>
            <ListItemText primary="Fermer" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
