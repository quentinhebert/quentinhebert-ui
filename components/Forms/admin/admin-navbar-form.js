import { useState, useEffect } from "react"
import { Stack, Typography } from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import CustomFilledInput from "../../ReusableComponents/forms/custom-filled-input"
import DualInputLine from "../../ReusableComponents/forms/responsive-dual-input-container"
import { Reorder } from "framer-motion"
import SwitchButton from "../../ReusableComponents/buttons/switch-button"
import theme from "../../../config/theme"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import PleaseWait from "../../ReusableComponents/helpers/please-wait"
import withSnacks from "../../hocs/withSnacks"
import AlertInfo from "../../Other/alert-info"

function AdminNavbarForm(props) {
  /********** PROPS **********/
  const { handleClose, setSeverity, setOpenSnackBar, setMessageSnack } = props

  /********** USE-STATES **********/
  const [isFetching, setIsFetching] = useState(false)
  const [navbarItems, setNavbarItems] = useState([])
  const [isSorting, setIsSorting] = useState(false)
  const [updateRedirects, setUpdateRedirects] = useState(false)

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => ({
    visible: {
      opacity: 1,
      y: 5,
      transition: { duration: 0.75, delay: key / 10 },
    },
    hidden: { opacity: 0, y: 0 },
  })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  /********** FUNCTIONS **********/
  const fetchNavbar = async () => {
    setIsFetching(true)
    const res = await apiCall.admin.getNavbar()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setNavbarItems(jsonRes.menu_items)
    }
    setIsFetching(false)
  }

  useEffect(() => {
    fetchNavbar()
  }, [])

  const handleChange = (attribute, value, row) => {
    // Get a copy
    let localItems = navbarItems

    // Update copy
    localItems = {
      ...localItems,
      [row]: { ...localItems[row], [attribute]: value },
    }

    // Convert object copy to array
    localItems = Object.keys(localItems).map((key) => {
      return localItems[key]
    })

    // Update state
    setNavbarItems(localItems)
  }

  const handleCheckSort = (bool) => {
    setIsSorting(bool)
  }

  const handleCheckRedirects = (bool) => {
    setUpdateRedirects(bool)
  }

  const handleSuccess = () => {
    setSeverity("success")
    setOpenSnackBar(true)
    setMessageSnack("Navbar mise à jour")
    handleClose()
  }

  const handleError = () => {
    setSeverity("error")
    setOpenSnackBar(true)
    setMessageSnack("Navbar non mise à jour")
  }

  const handleSave = async () => {
    // Get a copy
    let localItems = navbarItems

    // Change order attribute according to order in the array
    localItems.map((item, key) => {
      return (localItems[key].order = key + 1)
    })

    console.debug(localItems)
    const res = await apiCall.admin.updateNavbar(localItems)
    if (res && res.ok) handleSuccess()
    else handleError()
  }

  const handleCancel = async () => {
    handleClose()
    setUpdateRedirects(false) // reset switch for redirects
    setIsSorting(false) // resest switch for sorting + view
    await fetchNavbar() // reset form
  }

  if (isFetching) return <PleaseWait />

  /********** RENDER **********/
  return (
    <Stack width="100%" gap={4} ref={ref}>
      <motion.div
        initial="hidden"
        variants={variants(0.5)}
        animate={controls}
        style={{ width: "100%" }}
      >
        <ModalTitle>Modifier la navbar</ModalTitle>
      </motion.div>

      <CustomForm gap={4}>
        <motion.div
          initial="hidden"
          variants={variants(2)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <Stack gap={2} width="100%">
            {updateRedirects && (
              <AlertInfo
                content={{
                  show: true,
                  severity: "info",
                  text: "Veillez à contacter un développeur pour qu'il puisse effectuer les changements sur le serveur.",
                  title: "Modification des pages de redirection *",
                }}
              />
            )}

            {!isSorting ? (
              navbarItems.map((item, key) => (
                <DualInputLine key={key}>
                  <SwitchButton
                    label="Visible"
                    checked={item?.show}
                    handleCheck={() => handleChange("show", !item?.show, key)}
                  />
                  <CustomFilledInput
                    label="Nom de l'item"
                    value={item?.label || ""}
                    onChange={(e) => handleChange("label", e.target.value, key)}
                  />
                  <CustomFilledInput
                    disabled={!updateRedirects}
                    label="Page de redirection *"
                    value={item?.href || ""}
                    onChange={(e) => handleChange("href", e.target.value, key)}
                  />
                </DualInputLine>
              ))
            ) : (
              <Reorder.Group
                axis="x"
                onReorder={setNavbarItems}
                values={navbarItems}
                style={{
                  display: "flex",
                  backgroundColor: theme.palette.background.secondary,
                  borderRadius: "10px",
                  padding: 2,
                  gap: 2,
                }}
              >
                {navbarItems.map((item) => (
                  <Reorder.Item
                    key={item.id}
                    value={item}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      color: theme.palette.text.secondary,
                      backgroundColor: theme.palette.background.main,
                      listStyle: "none",
                      cursor: "grab",
                      borderRadius: "10px",
                      padding: 10,
                      margin: 0,
                      gap: 10,
                    }}
                  >
                    <DragIndicatorIcon />
                    <Typography
                      color="secondary"
                      textTransform="uppercase"
                      letterSpacing={1}
                    >
                      {item.label}
                    </Typography>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}

            <Stack flexDirection="row" gap={4}>
              <SwitchButton
                label="Modifier l'ordre"
                handleCheck={handleCheckSort}
                checked={isSorting}
              />
              <SwitchButton
                label="Modifier les pages de redirection"
                handleCheck={handleCheckRedirects}
                checked={updateRedirects}
              />
            </Stack>
          </Stack>
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variants(4)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <Stack flexDirection="row" gap={2} justifyContent="end">
            <CustomSubmitButton onClick={handleCancel}>
              Annuler
            </CustomSubmitButton>
            <CustomSubmitButton secondary="true" onClick={handleSave}>
              Enregistrer
            </CustomSubmitButton>
          </Stack>
        </motion.div>
      </CustomForm>
    </Stack>
  )
}

export default withSnacks(AdminNavbarForm)
