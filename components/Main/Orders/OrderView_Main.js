import { Box, Stack } from "@mui/material"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import PillButton from "../../Buttons/pill-button"
import CustomForm from "../../Forms/custom-form"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import BodyText from "../../Text/body-text"
import PageTitle from "../../Titles/page-title"
import { UserContext } from "../../../contexts/UserContext"
import PleaseWait from "../../Helpers/please-wait"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import { ORDERSTATES } from "../../../enums/orderStates"
import Pill from "../../Text/pill"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import CustomModal from "../../Modals/custom-modal"
import LoginForm from "../../Forms/login-form"
import SignUpForm from "../../Forms/signup-form"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import PasswordForgottenForm from "../../Forms/password-forgotten-form"
import AlertInfo from "../../Other/alert-info"
import RefreshButton from "../../Buttons/refresh-button"
import QuotationReadOnlySection from "../../Sections/Orders/order-read-only-section"

const MODES = {
  login: "LOGIN",
  signup: "SIGNUP",
  passwordForgotten: "PASSWORD_FORGOTTEN",
}
const allowedStatesForPaying = ["WAITING_FOR_PAYMENT", "PAYMENT_FAILED"]

const HeadItem = (props) => (
  <Box
    component="th"
    textAlign="left"
    sx={{
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      padding: 2,
    }}
  >
    <BodyText color={(theme) => theme.palette.text.secondary} {...props} />
  </Box>
)

const Row = (props) => <Box component="tr" {...props} />

const Value = ({ data }) => (
  <Box
    component="td"
    sx={{
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      padding: 2,
    }}
  >
    <BodyText>{data}</BodyText>
  </Box>
)

const StatusChip = ({ order }) => (
  <Pill
    bgColor={(theme) =>
      theme.alert.title[ORDERSTATES[order.status].severity].color
    }
  >
    <BodyText
      color={(theme) =>
        theme.alert.title[ORDERSTATES[order.status].severity].background
      }
    >
      {ORDERSTATES[order.status].label}
    </BodyText>
  </Pill>
)

export default function OrderView_Main({}) {
  const router = useRouter()
  const id = router.query.id
  const defaultEmail = router.query.default_email

  useEffect(() => {
    if (defaultEmail) handleSubmit()
  }, defaultEmail)

  const { user } = useContext(UserContext)

  const [mode, setMode] = useState(null)
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [email, setEmail] = useState(defaultEmail || "")
  const [access, setAccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [order, setOrder] = useState({
    id: id,
    label: "",
    created_at: null,
    last_update: null,
    status: "WAITING_FOR_PAYMENT",
    recipient_emails: [],
    payment_options: {},
    items: [],
    client: null,
  })

  const handleOpenAuth = () => setOpenAuthModal(true)
  const handleCloseAuth = () => {
    setMode(null)
    setOpenAuthModal(false)
  }

  const handleSubmit = async () => {
    if ((!defaultEmail && !email) || !id) return
    setLoading(true)
    const res = await apiCall.orders.view({
      id,
      email: defaultEmail || email,
      auth: false,
    })
    if (res && res.ok) {
      setAccess(true)
      const jsonRes = await res.json()
      setOrder(jsonRes)
    }
    setLoading(false)
  }

  const handleNext = async () => {
    if (!!user) {
      // Await assign client to order, then if success :
      // Bcs fetching next page is only allowed for order's client
      const res = await apiCall.orders.autoAssign({
        id: order.id,
      })
      if (res && res.ok)
        return router.push(
          `/account/orders/${id}/checkout/before-checkout-steps`
        )
      else {
        alert("erreur")
      }
    }
    return handleOpenAuth()
  }

  if (loading)
    return (
      <CenteredMaxWidthContainer>
        <Stack padding="0 1rem" gap={4}>
          <PleaseWait />
        </Stack>
      </CenteredMaxWidthContainer>
    )

  if (!access)
    return (
      <CenteredMaxWidthContainer>
        <Stack padding="0 1rem" gap={4}>
          <PageTitle text="Votre commande" />
          <BodyText>
            Afin d'accéder à votre commande, veuillez renseigner votre adresse
            e-mail (l'adresse e-mail à partir de laquelle vous avez cliqué sur
            ce lien).
          </BodyText>

          <CustomForm>
            <Stack className="row gap-10 full-width flex-center">
              <Stack maxWidth="300px">
                <CustomFilledInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Mon adresse e-mail"
                />
              </Stack>
              <PillButton type="submit" onClick={handleSubmit}>
                Voir ma commande
              </PillButton>
            </Stack>
          </CustomForm>
        </Stack>
      </CenteredMaxWidthContainer>
    )

  return (
    <Stack padding="2rem" gap={2} width="100%">
      {order.id && !loading && (
        <Stack gap={4}>
          <Stack className="row gap-10" alignItems="center">
            <StatusChip order={order} />
            <BodyText>{ORDERSTATES[order.status]?.description}</BodyText>
          </Stack>

          <Stack gap={4}>
            {order.invoice && (
              <Box
                component="a"
                href={order.invoice}
                download="facture.pdf"
                target="_blank"
              >
                <PillButton startIcon={<ReceiptIcon />}>Facture</PillButton>
              </Box>
            )}

            <QuotationReadOnlySection items={order.items} quotation={order} />

            <Stack width="100%" alignItems="end">
              {allowedStatesForPaying.includes(order.status) && (
                <PillButton
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleNext}
                >
                  Finaliser la commande
                </PillButton>
              )}
            </Stack>
          </Stack>
        </Stack>
      )}

      <CustomModal
        open={openAuthModal}
        handleClose={handleCloseAuth}
        background="#000"
        justifyContent="center"
      >
        <Stack gap={6}>
          <Stack gap={4} marginBottom="1rem">
            <ModalTitle
              alignItems="center"
              display="flex"
              gap={2}
              margin="0 auto"
            >
              <ShoppingCartIcon />
              Finalisez votre commande
            </ModalTitle>

            {mode === null && (
              <BodyText preventTransition fontSize="1rem" textAlign="center">
                Veuillez vous identifier ou créer votre compte.
              </BodyText>
            )}
          </Stack>

          {mode === MODES.login && (
            <LoginForm
              handleClickPasswordForgotten={() =>
                setMode(MODES.passwordForgotten)
              }
            />
          )}
          {mode === MODES.signup && (
            <Stack
              gap={4}
              sx={{
                border: `1px solid #fff`,
                borderRadius: "10px",
                padding: "2rem",
              }}
            >
              <ModalTitle>Créer mon compte</ModalTitle>
              {!isCompleted ? (
                <SignUpForm
                  handleClose={handleCloseAuth}
                  setIsCompleted={setIsCompleted}
                />
              ) : (
                <>
                  <AlertInfo
                    content={{
                      show: true,
                      severity: "success",
                      text: "Veuillez cliquer sur le lien de confirmation qui vous a été envoyé par email. Vous pourrez ensuite rafraîchir cette page pour finaliser la commande.",
                      title: "Votre inscription est presque terminée",
                    }}
                  />
                  <Stack alignItems="center">
                    <RefreshButton
                      label="Rafraîchir la page"
                      refresh={() => location.reload()}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          )}
          {mode === MODES.passwordForgotten && (
            <PasswordForgottenForm
              handleCancel={() => setMode(MODES.login)}
              defaultEmail={""}
            />
          )}

          <Stack gap={2}>
            {mode !== MODES.login &&
              mode !== MODES.passwordForgotten &&
              !isCompleted && (
                <PillButton
                  margin="0 auto"
                  onClick={() => setMode(MODES.login)}
                >
                  Me connecter
                </PillButton>
              )}
            {mode !== MODES.signup && (
              <PillButton
                margin="0 auto"
                onClick={() => setMode(MODES.signup)}
                border={(theme) => `1px solid ${theme.palette.secondary.main}`}
                color={(theme) => theme.palette.secondary.main}
                background="transparent"
              >
                Je n'ai pas de compte
              </PillButton>
            )}

            <BodyText
              fontSize="1rem"
              onClick={handleCloseAuth}
              textAlign="center"
              color={(theme) => theme.palette.secondary.main}
              className="cool-button pointer"
            >
              Annuler
            </BodyText>
          </Stack>
        </Stack>
      </CustomModal>
    </Stack>
  )
}
