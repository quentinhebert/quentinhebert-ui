import { useContext, useEffect, useState } from "react"
import { Box, Rating, Stack, Typography } from "@mui/material"
import PagesLayout from "../../components/Layouts/PagesLayout"
import PleaseWait from "../../components/Helpers/please-wait"
import { useRouter } from "next/router"
import apiCall from "../../services/apiCalls/apiCall"
import Custom404_Main from "../../components/Main/Errors/Custom404_Main"
import CustomForm from "../../components/Forms/custom-form"
import CenteredMaxWidthContainer from "../../components/Containers/centered-max-width-container"
import CustomFilledInput from "../../components/Inputs/custom-filled-input"
import CustomFilledTextArea from "../../components/Inputs/custom-filled-text-area"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import MotionDivOnMount from "../../components/Animation/motion-div-on-mount"
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import CustomCard from "../../components/Cards/custom-card"
import BodyText from "../../components/Text/body-text"
import { AppContext } from "../../contexts/AppContext"

const head = {
  // Main meta tags
  title: "Retour d'expérience",
  description:
    "Laissez une note et un commentaire à Quentin après votre mission.",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function ReviewPage({ navbar, footer }) {
  const router = useRouter()
  const id = router.query.id

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const initialReview = {
    id,
    label: "",
    description: "",
    grade: 0,
    editable: true,
    firstname: "",
    lastname: "",
    company: "",
  }

  const [fetching, setFetching] = useState(true)
  const [review, setReview] = useState(initialReview)
  const [success, setSuccess] = useState(false)

  async function fetchData() {
    setFetching(true)
    const res = await apiCall.reviews.get({ id })
    if (res?.ok) {
      const jsonRes = await res.json()
      setReview(jsonRes)
    }
    setFetching(false)
  }

  useEffect(() => {
    if (!!id) fetchData()
  }, [id])

  async function handleSubmit() {
    if (
      !review.grade ||
      !review.label ||
      review.label?.trim() === "" ||
      !review.description ||
      review.description?.trim() === ""
    ) {
      setSnackMessage("Veuillez remplir tous les champs.")
      return setSnackSeverity("error")
    }
    const res = await apiCall.reviews.post({
      id,
      description: review.description,
      label: review.label,
      grade: review.grade,
    })
    if (res?.ok) {
      setSuccess(true)
      return fetchData()
    }
    setSnackSeverity("error")
    setSnackMessage("Une erreur s'est produite")
  }

  return (
    <PagesLayout head={head} navbarData={navbar} footerData={footer}>
      {fetching ? (
        <Stack flexGrow={1} justifyContent="center">
          <PleaseWait />
        </Stack>
      ) : !id || !review?.user_id ? (
        <Custom404_Main />
      ) : review?.editable ? (
        <Stack paddingY="4rem" color="#fff">
          <CenteredMaxWidthContainer>
            <CustomForm>
              <Typography
                variant="h4"
                color="secondary.main"
                textAlign="center"
              >
                {review.user_id.firstname}, qu'avez-vous pensé de la prestation
                de Quentin ?
              </Typography>
              <Typography variant="h6" textAlign="center">
                Faites-lui part de votre expérience !
              </Typography>

              <Rating
                precision={0.5}
                size="large"
                value={review.grade}
                onChange={(event, newValue) =>
                  setReview({ ...review, grade: newValue })
                }
                sx={{
                  fontSize: { xs: "3rem", md: "4rem" },
                  paddingY: "2rem",
                  "&.MuiRating-root": {
                    color: (theme) =>
                      `${theme.palette.secondary.main} !important`,
                  },
                }}
              />
              <CustomFilledInput
                label="Intitulé"
                placeholder="Excellente prestation"
                value={review.label}
                onChange={(e) =>
                  setReview({ ...review, label: e.target.value })
                }
              />
              <CustomFilledTextArea
                label="Raccontez votre expérience"
                rows={10}
                placeholder="Quentin a été très professionnel et a su nous guider tout au long du projet..."
                value={review.description}
                onChange={(e) =>
                  setReview({ ...review, description: e.target.value })
                }
              />

              <CTAButton label="Envoyer" onClick={handleSubmit} />
            </CustomForm>
          </CenteredMaxWidthContainer>
        </Stack>
      ) : (
        <ThankYou review={review} success={success} />
      )}
    </PagesLayout>
  )
}

function CTAButton({ label, onClick }) {
  return (
    <Stack
      textAlign="center"
      boxShadow={(theme) => `0 0 30px 5px ${theme.palette.secondary.main}`}
      borderRadius={30}
      padding="1rem 2rem"
      width={{ xs: "200px", md: "400px" }}
      marginTop={2}
      onClick={onClick}
    >
      <MotionDivOnMount
        preventOut
        hidden={{ opacity: 0, y: -5 }}
        visible={{ opacity: 1, y: 0 }}
      >
        <Typography
          color="secondary"
          className="flex-center pointer"
          display="flex"
          fontFamily="Trophy"
          gap={1}
          sx={{
            padding: "0 1rem",
            fontSize: { xs: ".6rem", sm: ".8rem", md: "1.2rem" },
            transition: "0.3s ease-in-out",
            "& > .MuiSvgIcon-root": {
              transition: "0.3s ease-in-out",
            },
            "&:hover": {
              transform: "scale(1.1)",
              "& > .MuiSvgIcon-root": {
                transition: "0.3s ease-in-out",
                translate: { xs: "5px", md: "10px", lg: "15px" },
              },
            },
          }}
        >
          {label} <ArrowRightAltIcon />
        </Typography>
      </MotionDivOnMount>
    </Stack>
  )
}

function ThankYou({ review, success }) {
  return (
    <CenteredMaxWidthContainer>
      <Stack paddingY="8rem" gap={4}>
        {success && (
          <Typography
            variant="h4"
            color="#fff"
            gap={2}
            flexDirection={{ xs: "column", md: "row" }}
            textAlign="center"
            className="flex flex-center"
          >
            <TaskAltIcon
              sx={{
                color: (theme) => theme.alert.title.success.color,
                fontSize: "3rem",
              }}
            />
            Merci d'avoir laissé un commentaire !
          </Typography>
        )}

        <CustomCard backgroundColor={(theme) => theme.palette.background.main}>
          <Typography variant="h5" color="gray" textAlign="center">
            Votre commentaire
          </Typography>

          <Stack flexDirection="row" gap={2}>
            <Rating
              readOnly
              precision={0.5}
              size="large"
              value={review.grade}
              sx={{
                "&.MuiRating-root": {
                  color: (theme) =>
                    `${theme.palette.secondary.main} !important`,
                },
              }}
            />
            <Typography
              variant="h6"
              color="#fff"
              textAlign="left"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                overflow: "hidden",
                wordBreak: "break-word",
                whiteSpace: "break-spaces",
              }}
            >
              {review.label}
            </Typography>
          </Stack>

          <Typography color="#fff" textAlign="left" fontStyle="italic">
            {review.description}
          </Typography>
        </CustomCard>
      </Stack>
    </CenteredMaxWidthContainer>
  )
}
