import { useContext, useEffect, useState } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import SortIcon from "@mui/icons-material/Sort"
import dynamic from "next/dynamic"

import apiCall from "../../../../services/apiCalls/apiCall"
import AlertInfo from "../../../Other/alert-info"
import { AppContext } from "../../../../contexts/AppContext"
import AddWebsiteModal from "../../../Modals/Create-Modals/add-website-modal"
import BodyText from "../../../Text/body-text"
import ScaleUpOnHoverStack from "../../../Animation/scale-up-on-hover-stack"
import PleaseWait from "../../../Helpers/please-wait"
import SwitchButton from "../../../Inputs/switch-button"
import NextLink from "../../../Helpers/next-link"
import PillButton from "../../../Buttons/pill-button"
import CancelButton from "../../../Buttons/cancel-button"

const DeleteWebsiteModal = dynamic(() =>
  import("../../../Modals/Delete-Modals/delete-website-modal")
)

const SortableListItem = sortableElement(
  ({ item, fetchWebsites, showMenu }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [clickedWebsite, setClickedWebsite] = useState(null)
    const [destroyedDelete, triggerDestroyDelete] = useState(true)

    const handleOpenDeleteModal = (e) => {
      e.stopPropagation() // Prevent from open edit modal
      e.preventDefault()
      setClickedWebsite(item)
      setOpenDeleteModal(true)
      triggerDestroyDelete(false)
    }
    const handleCloseDeleteModal = () => {
      setOpenDeleteModal(false)
      setTimeout(() => {
        triggerDestroyDelete(true)
      }, "500")
    }

    return (
      <>
        <Box component="li" className="list-style-none" width="calc(33% - 6px)">
          <NextLink href={`/admin/back-office/websites/${item.id}/edit`}>
            <Stack
              className="no-select flex-center relative"
              sx={{
                cursor: showMenu ? "pointer" : "grab",
                padding: ".5rem",
                borderRadius: "10px",
                height: { xs: "150px", md: "200px" },
                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${
                  item.thumbnail_url || "/medias/default.jpg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                "&:hover": {
                  background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${
                    item.thumbnail_url || "/medias/default.jpg"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                },
              }}
            >
              <Box
                className="absolute"
                top={10}
                right={10}
                sx={{
                  color: (theme) => theme.palette.text.white,
                  display: showMenu ? "block" : "none",
                }}
                onClick={handleOpenDeleteModal}
              >
                <ScaleUpOnHoverStack>
                  <DeleteIcon
                    sx={{
                      fontSize: "2rem",
                      opacity: 0.2,
                      "&:hover": { opacity: 1 },
                    }}
                  />
                </ScaleUpOnHoverStack>
              </Box>

              <Typography
                fontSize="1rem"
                color="text.white"
                className="uppercase text-center"
              >
                {item.client}
              </Typography>
            </Stack>
          </NextLink>
        </Box>

        {!destroyedDelete && (
          <DeleteWebsiteModal
            website={clickedWebsite}
            open={openDeleteModal}
            handleClose={handleCloseDeleteModal}
            refreshData={fetchWebsites}
          />
        )}
      </>
    )
  }
)

const SortableList = sortableContainer(({ items, disabled, fetchWebsites }) => (
  <Box
    component="ul"
    className="list-style-none no-padding full-width flex-wrap"
    gap=".5rem"
  >
    {items.map((item, index) => (
      <SortableListItem
        disabled={disabled}
        showMenu={disabled}
        axis="xy"
        key={index}
        index={index}
        item={item}
        fetchWebsites={fetchWebsites}
      />
    ))}
  </Box>
))

const SortHelper = ({ handleSaveSortedWebsites, handleCancel }) => (
  <AlertInfo
    content={{
      show: true,
      severity: "info",
      title: "Modifiez l'ordre des sites web",
      text: "",
      js: (
        <Stack gap={2}>
          <BodyText>
            Il vous suffit de glisser-déposer les éléments sur la grille puis de
            sauvegarder !
          </BodyText>
          <Stack flexDirection="row" gap={1}>
            <CancelButton width="auto" handleCancel={handleCancel}>
              Annuler
            </CancelButton>
            <PillButton width="auto" onClick={handleSaveSortedWebsites}>
              Enregistrer
            </PillButton>
          </Stack>
        </Stack>
      ),
    }}
  />
)

export default function WebsitesPanelUISection(props) {
  const {} = props

  const [isLoading, setIsLoading] = useState(false)
  const [websites, setWebsites] = useState(null)
  const [disableSort, setDisableSort] = useState(true)
  const [openAddWebsiteModal, setOpenAddWebsiteModal] = useState(false)
  const [clickedWebsite, setClickedWebsite] = useState(null)

  const { handleError, handleSuccess } = useContext(AppContext)

  // Initial fetch
  useEffect(() => {
    fetchWebsites()
  }, [])

  return (
    <>
      <Stack justifyContent="center" direction="column" gap={2}>
        <BodyText preventTransitionOut>
          Cliquez sur une vignette pour voir et modifier les informations d'un
          site web. Ajoutez un nouveau site web avec le bouton ci-dessous.
          Supprimez un site web en survolant une vignette puis en cliquant sur
          l'icône Poubelle.
        </BodyText>

        <Stack width="100%" alignItems="end">
          <Stack className="row" alignItems="center" gap={4}>
            {/* <SwitchButton
              label="Modifier l'ordre"
              checked={!disableSort}
              handleCheck={() => setDisableSort(!disableSort)}
            /> */}
            <Stack
              className="row pointer"
              gap={1}
              color={
                disableSort ? "#fff" : (theme) => theme.palette.secondary.main
              }
              onClick={() => setDisableSort(false)}
            >
              <SortIcon color="inherit" />
              <Typography color="inherit">Réorganiser</Typography>
            </Stack>

            <PillButton
              disabled={!disableSort}
              startIcon={<AddIcon />}
              onClick={handleOpenAddWebsiteModal}
            >
              Ajouter
            </PillButton>
          </Stack>

          {!disableSort && (
            <SortHelper
              handleSaveSortedWebsites={handleSaveSortedWebsites}
              handleCancel={() => setDisableSort(true)}
            />
          )}
        </Stack>

        {isLoading ? (
          <PleaseWait />
        ) : !!websites ? (
          <SortableList
            axis="xy"
            items={websites}
            fetchWebsites={fetchWebsites}
            disabled={disableSort}
            onSortEnd={onSortEnd}
            onSortStart={() => (document.body.style.cursor = "grabbing")}
          />
        ) : null}
      </Stack>

      <AddWebsiteModal
        refreshData={fetchWebsites}
        open={openAddWebsiteModal}
        handleClose={handleCloseAddWebsiteModal}
      />
    </>
  )

  /***************** FETCH DATA ****************/
  async function fetchWebsites() {
    setIsLoading(true)
    const res = await apiCall.websites.getAll()
    if (res && res.ok) {
      const websites = await res.json()
      setWebsites(websites)
    }
    setIsLoading(false)
  }
  /***************** HANDLERS ****************/
  async function handleSaveSortedWebsites() {
    // We only send the sorted ids
    let sortedWebsiteIds = []
    websites.map((website) => {
      sortedWebsiteIds.push(website.id)
    })
    const res = await apiCall.websites.sort(sortedWebsiteIds)
    if (res) handleSuccess("Ordre des sites web mis à jour")
    else handleError("Une erreur est survenue...")
  }
  function handleOpenAddWebsiteModal() {
    setOpenAddWebsiteModal(true)
  }
  function handleCloseAddWebsiteModal() {
    setOpenAddWebsiteModal(false)
  }
  // Sort drag and drop handler
  function onSortEnd(e) {
    const newState = arrayMoveImmutable(websites, e.oldIndex, e.newIndex)
    setWebsites(newState)
    document.body.style.cursor = "default"
  }
}
