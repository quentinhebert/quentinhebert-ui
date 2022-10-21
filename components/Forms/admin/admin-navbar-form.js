import { useState, useEffect, useContext } from "react"
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
import AlertInfo from "../../Other/alert-info"
import OutlinedButton from "../../ReusableComponents/buttons/outlined-button"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import withConfirmAction from "../../hocs/withConfirmAction"
import useSWR from "swr"
import { AppContext } from "../../../contexts/AppContext"

function AdminNavbarForm(props) {
  /********** PROPS **********/
  const {
    handleClose,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /********** USE-STATES **********/
  const [isFetching, setIsFetching] = useState(false)
  const [navbarItems, setNavbarItems] = useState([])
  const [isSorting, setIsSorting] = useState(false)
  const [updateRedirects, setUpdateRedirects] = useState(false)
  const [idsToDelete, setIdsToDelete] = useState([])

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
    const res = await apiCall.application.navbar.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setNavbarItems(jsonRes.menu_items)
    }
    setIsFetching(false)
  }

  useEffect(() => {
    fetchNavbar()
  }, [])

  // Mutate function will be used to force refresh static prop data of the navabar
  const { mutate } = useSWR("navbar")

  const handleChange = (attribute, value, row) => {
    // Get a copy
    let localItems = navbarItems

    /** Trick to reload component when array changes **/
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
    setSnackSeverity("success")
    setSnackMessage("Navbar mise à jour")
    handleClose()
    mutate() // Refresh navbar static props
    fetchNavbar() // Reset form
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Navbar non mise à jour")
  }
  const handleSave = async () => {
    // Get a copy
    let localItems = navbarItems

    // Change order attribute according to order in the array
    localItems.map((item, key) => {
      return (localItems[key].order = key + 1)
    })

    const res = await apiCall.application.navbar.update(localItems, idsToDelete)
    if (res && res.ok) handleSuccess()
    else handleError()
  }

  const handleCancel = async () => {
    handleClose()
    setUpdateRedirects(false) // reset switch for redirects
    setIsSorting(false) // resest switch for sorting + view
    await fetchNavbar() // reset form
  }

  const handleAddItem = () => {
    const localItems = navbarItems
    const totalItems = localItems.length

    /** Trick to reload component when array changes **/
    // Update copy
    localItems = {
      ...localItems,
      [totalItems + 1]: {
        href: "/",
        label: "",
        show: false,
        order: totalItems + 1,
      },
    }

    // Convert object copy to array
    localItems = Object.keys(localItems).map((key) => {
      return localItems[key]
    })

    setNavbarItems(localItems)
  }

  const handleDeleteItem = (item, row) => {
    const deleteItem = () => {
      // Get copy
      const localItems = navbarItems
      const localIdsToDelete = idsToDelete

      // Save the item id to delete
      localIdsToDelete.push(item.id)
      setIdsToDelete(localIdsToDelete)

      // Delete row of object
      delete localItems[row]

      // Convert object copy to array
      localItems = Object.keys(localItems).map((key) => {
        return localItems[key]
      })

      // Update state
      setNavbarItems(localItems)
    }

    setActionToFire(() => () => deleteItem())
    setOpenConfirmModal(true)
    setConfirmTitle("Confirmer")
    setNextButtonText("Supprimer")
    setConfirmContent({
      text: `Voulez-vous vraiment supprimer "${item.label}" de la navbar ?`,
    })
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
          <Stack gap={4} width="100%">
            <Stack
              flexDirection="row"
              gap={4}
              padding={2}
              borderRadius="5px"
              sx={{
                border: "1px solid",
                borderColor: (theme) => theme.palette.secondary.main,
              }}
            >
              <SwitchButton
                label="Modifier l'ordre"
                handleCheck={handleCheckSort}
                checked={isSorting}
              />
              <SwitchButton
                label="Modifier les liens de page"
                handleCheck={handleCheckRedirects}
                checked={updateRedirects}
              />
            </Stack>

            {updateRedirects && (
              <AlertInfo
                content={{
                  show: true,
                  severity: "info",
                  text: "Veillez à contacter un développeur pour qu'il puisse effectuer les changements sur le serveur.",
                  title: "Modification des liens de pages *",
                }}
              />
            )}

            {isSorting ? (
              <Reorder.Group
                axis="x"
                onReorder={setNavbarItems}
                values={navbarItems}
                style={{
                  overflow: "auto",
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
            ) : (
              navbarItems.map((item, key) => (
                <DualInputLine key={key}>
                  <SwitchButton
                    label="Visible"
                    checked={item?.show}
                    handleCheck={() => handleChange("show", !item?.show, key)}
                  />
                  <CustomFilledInput
                    label="Nom"
                    value={item?.label || ""}
                    onChange={(e) => handleChange("label", e.target.value, key)}
                  />
                  <CustomFilledInput
                    disabled={!updateRedirects}
                    label="Lien de la page *"
                    value={item?.href || ""}
                    onChange={(e) => handleChange("href", e.target.value, key)}
                  />
                  <Stack
                    className="flex-center pointer"
                    onClick={() => handleDeleteItem(item, key)}
                  >
                    <DeleteIcon
                      color="secondary"
                      sx={{ "&:hover": { opacity: 0.5 } }}
                    />
                  </Stack>
                </DualInputLine>
              ))
            )}

            <OutlinedButton startIcon={<AddIcon />} onClick={handleAddItem}>
              Ajouter
            </OutlinedButton>
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

export default withConfirmAction(AdminNavbarForm)
