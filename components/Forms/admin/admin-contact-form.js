import { useState, useEffect, useContext } from "react"
import { Stack, Typography } from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import AlertInfo from "../../Other/alert-info"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { Reorder } from "framer-motion"
import SortIcon from "@mui/icons-material/Sort"
import useSWR from "swr"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import RectangleButton from "../../Buttons/rectangle-button"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import SmallTitle from "../../Titles/small-title"
import InTextLink from "../../Links/in-text-link"
import SwitchButton from "../../Inputs/switch-button"
import PleaseWait from "../../Helpers/please-wait"
import ReorderItem from "../../Reorder/reorder-item"
import MotionDivDownOnMount from "../../Animation/motion-div-down-on-mount"
import CustomOutlinedButton from "../../Buttons/custom-outlined-button"
import SwipeableViewsReadyToUse from "../../Containers/swipeable-views-ready-to-use"
import CustomTooltip from "../../Helpers/custom-tooltip"

const Caroussel = ({
  addressItems,
  traditionalContactItems,
  socialMediaItems,
  contactItems,
  setContactItems,
  setAddressItems,
  setTraditionalContactItems,
  setSocialMediaItems,
  setSortDisabled,
  sortDisabled,
}) => {
  // Carousel utils
  const [index, setIndex] = useState(0)
  const handleChangeIndex = (index) => {
    setIndex(index)
  }

  // Format the different slides/cards of the carousel
  const cards = [
    {
      title: "Contacts traditionnels",
      id: "contact",
      items: traditionalContactItems,
      setItems: setTraditionalContactItems,
      description: [
        <Typography>
          L'adresse e-mail que vous renseignez sera celle qui sera affichée sur
          la page de <InTextLink text="contact" href="/contact" /> et dans le
          footer.
        </Typography>,
      ],
    },
    {
      title: "Réseaux sociaux",
      id: "social_medias",
      items: socialMediaItems,
      setItems: setSocialMediaItems,
      description: null,
    },
    {
      title: "Adresse postale",
      id: "address",
      items: addressItems,
      setItems: setAddressItems,
      description: null,
    },
  ]

  // Handle change data (contact items)
  const handleChange = (attribute, value, card, key) => {
    // Get copies
    const localGroup = contactItems[card.id] // Array
    const localItem = localGroup[key] // object

    // Update copy
    localItem[attribute] = value

    // Update local group
    localGroup[key] = localItem

    // Update state
    setContactItems({
      ...contactItems,
      [card.id]: localGroup,
    })
  }

  // Handle sort items (reorder)
  const handleEnableSort = () => setSortDisabled(false)
  const handleApplySortToState = () => {
    // Get a copy
    let localContactItems = contactItems

    // Perform changes for each group (not only the first slide)
    cards.map((card) => {
      localContactItems = { ...localContactItems, [card.id]: card.items }
    })

    // Update attribute "order" in each contact item
    Object.keys(localContactItems)
      .map((group) => localContactItems[group])
      .map((group) => {
        group.map((item, key) => {
          item.order = key + 1
        })
      })

    // Update state
    setContactItems(localContactItems)
    setSortDisabled(true)
  }
  const handleCancelSort = (group) => () => {
    const newStateSorted = contactItems[group]
    setContactItems({ ...contactItems, [group]: newStateSorted })
    setSortDisabled(true)
  }

  return (
    <SwipeableViewsReadyToUse
      index={index}
      setIndex={setIndex}
      handleChangeIndex={handleChangeIndex}
      totalSteps={cards.length}
    >
      {cards.map((card, key) => (
        <MotionDivDownOnMount
          key={key}
          role="tabpanel"
          id={`full-width-tabpanel-0`}
          className="flex column gap-10 full-width"
          style={{ alignSelf: "start" }}
        >
          <SmallTitle
            textAlign="left"
            color={(theme) => theme.palette.text.white}
          >
            {`${card.title} (${index + 1}/${cards.length})`}
          </SmallTitle>

          {card.id === "address" ? null : sortDisabled ? (
            <CustomOutlinedButton
              onClick={handleEnableSort}
              startIcon={<SortIcon />}
            >
              Modifier l'ordre
            </CustomOutlinedButton>
          ) : (
            <Stack className="row gap-10">
              <CustomOutlinedButton
                onClick={handleCancelSort(card.id)}
                color={(theme) => theme.palette.text.white}
              >
                Annuler
              </CustomOutlinedButton>
              <CustomOutlinedButton onClick={handleApplySortToState}>
                Appliquer l'ordre
              </CustomOutlinedButton>
            </Stack>
          )}

          {card.description?.length &&
            card.description.map((descItem, key) => (
              <AlertInfo
                key={key}
                content={{
                  show: true,
                  severity: "info",
                  text: descItem,
                }}
              />
            ))}

          <Reorder.Group
            axis="y"
            values={card.items}
            onReorder={card.setItems}
            className="full-width flex column list-style-none no-padding gap-10"
          >
            {card.items.map((item, key) => (
              <ReorderItem
                key={item.type}
                item={item}
                sortDisabled={sortDisabled || card.id === "address"}
              >
                <Stack
                  id={item.type}
                  className="row flex-center full-width"
                  sx={{
                    padding: { xs: "0 .2rem", md: "0 1rem" },
                  }}
                >
                  {/* Switch to toggle SHOW PROPERTY */}
                  <CustomTooltip
                    text="Cette ligne apparaît obligatoirement sur votre site."
                    show={item.show === null}
                    placement="right"
                  >
                    <SwitchButton
                      disabled={item.show === null}
                      checked={item.show}
                      handleCheck={(val) =>
                        handleChange("show", val, card, key)
                      }
                    />
                  </CustomTooltip>

                  {/* Input to change CONTACT FIELD */}
                  <CustomFilledInput
                    className="full-width"
                    label={item.label}
                    id={item.type}
                    value={item.value || ""}
                    onMouseDown={(e) => e.stopPropagation()} // Prevent from carousel swipe
                    onChange={(e) =>
                      handleChange("value", e.target.value, card, key)
                    }
                  />
                </Stack>
              </ReorderItem>
            ))}
          </Reorder.Group>
        </MotionDivDownOnMount>
      ))}
    </SwipeableViewsReadyToUse>
  )
}

export default function AdminContactForm(props) {
  /********** PROPS **********/
  const { handleClose } = props

  // App context
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const { mutate } = useSWR("footer")

  /********** USE-STATES **********/
  const [isFetching, setIsFetching] = useState(false)
  const [contactItems, setContactItems] = useState([])
  const [addressItems, setAddressItems] = useState([])
  const [traditionalContactItems, setTraditionalContactItems] = useState([])
  const [socialMediaItems, setSocialMediaItems] = useState([])
  const [sortDisabled, setSortDisabled] = useState(true)

  const [showAlert, setShowAlert] = useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  })

  /********** FETCH DATA **********/
  const fetchContact = async () => {
    setIsFetching(true)
    const res = await apiCall.application.contact.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setContactItems(jsonRes)

      // Populate intermediate states (useful for reordering)
      setAddressItems(jsonRes.address)
      setSocialMediaItems(jsonRes.social_medias)
      setTraditionalContactItems(jsonRes.contact)
    }
    setIsFetching(false)
  }

  // Initial fetch
  useEffect(() => {
    fetchContact()
  }, [])

  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Informations de contact mises à jour")
    fetchContact() // update data
    mutate() // update footer swr
    if (handleClose) handleClose()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage(
      "Une erreur est survenue lors de la modification des informations de contact..."
    )
  }
  const handleSaveContact = async () => {
    const res = await apiCall.application.contact.update(contactItems)
    if (res && res.ok) return handleSuccess()
    return handleError()
  }

  const handleCancel = async () => {
    if (handleClose) handleClose()
    await fetchContact() // reset data
  }

  if (isFetching) return <PleaseWait />

  /********** RENDER **********/
  return (
    <Stack width="100%" gap={4}>
      <MotionDivDownOnMount>
        <ModalTitle>Modifier les informations de contact</ModalTitle>
      </MotionDivDownOnMount>

      <CustomForm gap={4}>
        <MotionDivDownOnMount delay={0.5}>
          <Stack gap={2} width="100%">
            <Caroussel
              addressItems={addressItems}
              traditionalContactItems={traditionalContactItems}
              socialMediaItems={socialMediaItems}
              setAddressItems={setAddressItems}
              setTraditionalContactItems={setTraditionalContactItems}
              setSocialMediaItems={setSocialMediaItems}
              setContactItems={setContactItems}
              contactItems={contactItems}
              setSortDisabled={setSortDisabled}
              sortDisabled={sortDisabled}
            />

            {showAlert.show ? <AlertInfo content={showAlert} /> : null}
          </Stack>
        </MotionDivDownOnMount>

        <MotionDivDownOnMount delay={1}>
          {sortDisabled && (
            // We hide that section if user is reordering the elements so the user has to apply or cancel sorting change
            <Stack flexDirection="row" gap={2} justifyContent="end">
              <RectangleButton onClick={handleCancel}>Annuler</RectangleButton>
              <RectangleButton secondary="true" onClick={handleSaveContact}>
                Enregistrer
              </RectangleButton>
            </Stack>
          )}
        </MotionDivDownOnMount>
      </CustomForm>
    </Stack>
  )
}
