import { Box, Divider, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import CustomModal from "../components/Modals/custom-modal"
import { ModalTitle } from "../components/Modals/Modal-Components/modal-title"
import PillButton from "../components/Buttons/pill-button"
import apiCall from "../services/apiCalls/apiCall"
import ProspectDD from "../components/Data-Display/Prospect-DD"
import useEditProspect from "./useEditProspect"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import BodyText from "../components/Text/body-text"
import PROSPECT_STATES from "../enums/prospectStates"
import useSWR from "swr"
import CustomFilledTextArea from "../components/Inputs/custom-filled-text-area"
import CustomIconButton from "../components/Buttons/custom-icon-button"
import EditIcon from "@mui/icons-material/Edit"
import CloseIcon from "@mui/icons-material/Close"
import ModeCommentIcon from "@mui/icons-material/ModeComment"
import SendIcon from "@mui/icons-material/Send"
import { AppContext } from "../contexts/AppContext"
import PleaseWait from "../components/Helpers/please-wait"
import { formatDayDate } from "../services/date-time"
import { UserContext } from "../contexts/UserContext"
import DeleteIcon from "@mui/icons-material/Delete"
import useConfirm from "./useConfirm"
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread"

export default function useViewProspect({ id, refreshData }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  const handleOpenViewProspectModal = () => setOpen(true)
  const handleCancel = handleClose
  const EditProspect = useEditProspect({
    id,
    refreshData,
  })

  const initialData = {
    id,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    services: [],
    budget: "",
    website: "",
    description: "",
    status: "DRAFT",
    opened: false,
  }
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWR("dashboardNotifications")

  const fetchData = async () => {
    setLoading(true)
    const res = await apiCall.dashboard.prospects.get({ id })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setData(jsonRes)
    }
    setLoading(false)
  }
  const handleOpenRequest = async (bool) => {
    const res = await apiCall.dashboard.prospects.markAsOpened({
      id,
      opened: bool,
    })
    if (!res || !res.ok)
      alert("An error occurred while marking the prospect request to `opened`")
    else {
      mutate()
      refreshData()
    }
  }
  useEffect(() => {
    if (!!id && open) handleOpenRequest(true)
    if (!open) {
      setData(initialData)
      refreshData()
    }
    fetchData()
  }, [open])

  useEffect(() => {
    fetchData()
  }, [EditProspect.open])

  const ViewProspectDialog = ({}) => {
    return (
      <CustomModal open={open} handleClose={handleClose} gap={6}>
        {/**** TITLE ****/}
        <Stack alignItems="center" flexDirection="row" gap={2}>
          <ModalTitle>Prospect</ModalTitle>
          <BodyText
            preventTransition
            sx={{
              width: "auto",
              padding: ".2rem .5rem",
              borderRadius: "15px",
              whiteSpace: "nowrap",
              background: (theme) =>
                theme.alert.title[PROSPECT_STATES[data.status].severity]
                  .background,
              border: "1px solid",
              borderColor: (theme) =>
                theme.alert.title[PROSPECT_STATES[data.status].severity].color,
              color: (theme) =>
                theme.alert.title[PROSPECT_STATES[data.status].severity].color,
            }}
          >
            {PROSPECT_STATES[data.status].label}
          </BodyText>
        </Stack>

        <ProspectDD
          id={id}
          firstname={data.firstname}
          lastname={data.lastname}
          budget={data.budget}
          created_at={data.created_at}
          last_update={data.last_update}
          email={data.email}
          description={data.description}
          opened={data.opened}
          company={data.company}
          phone={data.phone}
          services={data.services}
        />

        <Divider />

        <Comments prospectId={id} />

        {/**** BOTTOM BUTTONS ****/}
        <Stack
          zIndex={10}
          gap={2}
          width="120%"
          position="sticky"
          bottom="-3.5rem"
          sx={{
            transform: "translate(-8%, 10%)",
            background: (theme) => theme.palette.background.main,
            padding: "1rem 2rem",
            boxShadow: "0 0 50px 5px rgb(0,0,0,0.5)",
          }}
        >
          <Stack flexDirection="row" gap={2} margin="auto">
            <CustomIconButton
              onClick={handleCancel}
              icon={<CloseIcon />}
              tooltip="Fermer"
            />
            {data.status === "REQUEST" && (
              <CustomIconButton
                onClick={() => {
                  handleOpenRequest(false)
                  handleClose()
                }}
                icon={<MarkEmailUnreadIcon />}
                tooltip="Marquer comme non lu"
              />
            )}
            <CustomIconButton
              loading={loading}
              onClick={EditProspect.handleOpenModal}
              icon={<EditIcon />}
              tooltip="Modifier le prospect"
            />
          </Stack>

          <Divider />

          <Box component="a" href="/dashboard/orders/create" target="_blank">
            <PillButton
              disabled={loading}
              endIcon={<OpenInNewIcon />}
              background="transparent"
              border={(theme) => `1px solid ${theme.palette.secondary.main}`}
              color={(theme) => theme.palette.secondary.main}
            >
              Créer un devis
            </PillButton>
          </Box>
        </Stack>

        {EditProspect.Dialog({})}
      </CustomModal>
    )
  }

  function Comments({ prospectId }) {
    if (!prospectId) return <></>
    const [newComment, setNewComment] = useState("")
    let comments = []

    const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
    const { user } = useContext(UserContext)
    const Confirm = useConfirm()

    const swr = useSWR(
      `prospect-comments-${prospectId}`,
      async () => fetchComments(),
      {
        fallbackData: comments, // cached data initially returned by SWR
        revalidateOnMount: true,
      }
    )
    if (!!swr.data) comments = swr.data
    const { mutate } = useSWR(`prospect-comments-${prospectId}`)

    async function fetchComments() {
      const res = await apiCall.dashboard.prospects.getComments({
        id: prospectId,
      })
      if (res && res.ok) {
        const jsonRes = await res.json()
        return jsonRes
      }
      return []
    }
    async function postComment() {
      const res = await apiCall.dashboard.prospects.postComment({
        description: newComment,
        prospectId,
      })
      if (res && res.ok) {
        setNewComment("")
        mutate()
      } else {
        setSnackMessage("Votre commentaire n'a pas pu être posté...")
        setSnackSeverity("error")
      }
    }
    async function deleteComment(id) {
      const res = await apiCall.dashboard.prospects.deleteComment({ id })
      if (res && res.ok) mutate()
      else {
        setSnackMessage("Votre commentaire n'a pas pu être supprimé...")
        setSnackSeverity("error")
      }
    }
    function handleDeleteComment(id) {
      Confirm.setContent({
        title: "Supprimer le commentaire",
        message: "Voulez-vous vraiment supprimer ce commentaire ?",
        nextAction: () => deleteComment(id),
        nextBtnText: "Oui, supprimer",
      })
      Confirm.handleOpen()
    }

    return (
      <Card>
        <CardTitle>
          <ModeCommentIcon />
          Commentaires
        </CardTitle>

        <Stack gap={0.5}>
          {comments?.map((comment, key) => (
            <Stack
              key={key}
              sx={{
                gap: 1,
                padding: ".5rem 1rem",
                background: "rgb(0,0,0,0.4)",
                borderRadius: "10px",
              }}
            >
              <Typography whiteSpace="pre-line" color="#fff">
                {comment.description}
              </Typography>

              <Divider />

              <Stack flexDirection="row" justifyContent="space-between">
                <Typography
                  color="secondary"
                  textAlign="right"
                  fontSize=".8rem"
                >
                  {formatDayDate({
                    timestamp: comment.created_at,
                    timezone: user.timezone,
                  })}
                </Typography>
                <Typography
                  onClick={() => handleDeleteComment(comment.id)}
                  color="grey"
                  textAlign="left"
                  fontSize=".8rem"
                  className="pointer"
                  sx={{
                    gap: 0.5,
                    alignItems: "center",
                    display: "flex",
                    "&:hover": {
                      color: (theme) => theme.palette.error.main,
                    },
                  }}
                >
                  <DeleteIcon fontSize="inherit" /> Supprimer
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <CustomFilledTextArea
          onKeyDown={(event) => {
            if ((event.ctrlKey || event.metaKey) && event.key == "Enter")
              postComment()
          }}
          background="rgb(0,0,0,0.2)"
          borderColor="transparent"
          label="Nouveau commentaire"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <PillButton startIcon={<SendIcon />} onClick={postComment}>
          Poster
        </PillButton>

        <CustomModal open={Confirm.open} handleClose={Confirm.handleClose}>
          <Confirm.DialogContent />
        </CustomModal>
      </Card>
    )
  }

  function Card(props) {
    return (
      <Stack
        gap={2}
        sx={{
          boxShadow: "0 0 20px 1px rgb(0,0,0,0.5)",
          padding: 2,
          borderRadius: "15px",
        }}
        {...props}
      />
    )
  }
  function CardTitle(props) {
    return (
      <Typography
        variant="h5"
        color="#fff"
        {...props}
        display="flex"
        alignItems="center"
        gap={2}
      />
    )
  }

  return { handleOpenViewProspectModal, ViewProspectDialog }
}
