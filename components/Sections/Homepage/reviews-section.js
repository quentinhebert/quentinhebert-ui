import { Rating, Stack, Typography } from "@mui/material"
import useSWR from "swr"
import apiCall from "../../../services/apiCalls/apiCall"
import { useContext, useState } from "react"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"
import AutoPlaySlider from "../../Carousels/AutoPlaySlider"
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded"
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown"
import styles from "../../../styles/TextShine.module.css"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import PillButton from "../../Buttons/pill-button"
import CustomModal from "../../Modals/custom-modal"
import BrowserLayout from "../../Layouts/BrowserLayout"

async function fetchUpToDateReviews() {
  const res = await apiCall.reviews.getAllPublic()
  const jsonRes = await res.json()
  return jsonRes
}

export default function ReviewsSection(props) {
  const { lang } = useContext(AppContext)

  const { data } = useSWR(`reviews`, async () => fetchUpToDateReviews(), {
    fallbackData: props,
    revalidateOnMount: true,
  })

  const reviews = data

  const [selectedReviewKey, setSelectedReviewKey] = useState(null)
  const [openReviewDetails, setOpenReviewDetails] = useState(false)

  // Populate Items for the slider
  const Items = []
  !!reviews.length
    ? reviews.map((review, key) => {
        Items.push(() => (
          <Stack
            width="100%"
            color="#fff"
            padding="2rem"
            borderRadius="30px"
            gap={2}
            sx={{
              boxShadow: (theme) =>
                `0 0 30px 2px ${theme.palette.secondary.main}`,
            }}
          >
            <FormatQuoteRoundedIcon
              color="secondary"
              sx={{ rotate: "180deg", fontSize: "4rem" }}
            />

            <Typography
              sx={{
                fontSize: { xs: "1.2rem", md: "2rem" },
                lineHeight: { xs: "1.2rem", md: "2rem" },
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {review.label}
            </Typography>
            <Typography
              fontStyle="italic"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                overflow: "hidden",
                opacity: 0.7,
              }}
            >
              {review.description}
            </Typography>

            <Stack
              mt={2}
              flexDirection={{ xs: "column-reverse", xl: "row" }}
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              gap={4}
            >
              <PillButton
                color={(theme) => theme.palette.secondary.main}
                background="transparent"
                padding="0"
                endIcon={<ArrowRightAltIcon sx={{ fontSize: "3rem" }} />}
                onClick={() => {
                  setOpenReviewDetails(true)
                  setSelectedReviewKey(key)
                }}
              >
                Afficher en entier
              </PillButton>
              <Stack
                flexDirection={{ xs: "column", md: "row" }}
                alignItems="center"
                gap={2}
              >
                <Rating
                  readOnly
                  precision={0.5}
                  size="small"
                  value={review.grade}
                  sx={{
                    "&.MuiRating-root": {
                      color: (theme) =>
                        `${theme.palette.secondary.main} !important`,
                      filter: (theme) =>
                        `drop-shadow(0 0 8px ${theme.palette.secondary.main})`,
                    },
                  }}
                />
                <Typography color="#fff" className={styles.shine}>
                  {review.company || review.firstname + " " + review.lastname}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ))
      })
    : []

  return (
    <Stack
      className="full-width flex-center"
      gap={10}
      sx={{
        background: "#000",
        height: "auto",
        padding: "10rem 0",
        zIndex: 0,
      }}
    >
      <Stack position="relative">
        <Typography variant="h2" color="secondary">
          {translations.homepage.reviews.title[lang]}
        </Typography>
        <ThumbsUpDownIcon
          sx={{
            color: "#000",
            fontSize: "20rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: (theme) =>
              `drop-shadow(0 0 20px ${theme.palette.secondary.main})`,
            zIndex: -1,
          }}
        />
      </Stack>

      <AutoPlaySlider reviews={reviews} Items={Items} />

      <CustomModal
        fullscreen
        open={openReviewDetails}
        handleClose={() => setOpenReviewDetails(false)}
        background="transparent"
      >
        <BrowserLayout
          title="Retour d'expérience"
          onBtnClicks={{ red: () => setOpenReviewDetails(false) }}
          boxShadow={(theme) =>
            `0 0 100px 10px ${theme.palette.secondary.main}`
          }
          height="90vh"
        >
          <Stack padding={4} gap={2} overflow="auto">
            <FormatQuoteRoundedIcon
              color="secondary"
              sx={{ rotate: "180deg", fontSize: "4rem" }}
            />

            <Typography color="#fff" variant="h4">
              {reviews[selectedReviewKey]?.label}
            </Typography>
            <Typography color="grey" fontSize="1.3rem" fontStyle="italic">
              {reviews[selectedReviewKey]?.description}
            </Typography>

            <Stack
              mt={4}
              flexDirection={{ xs: "column", md: "row" }}
              alignSelf="end"
              alignItems={{ xs: "end", md: "center" }}
              gap={2}
            >
              <Rating
                readOnly
                value={reviews[selectedReviewKey]?.grade || 5}
                precision={0.5}
                size="large"
                sx={{
                  "&.MuiRating-root": {
                    color: (theme) =>
                      `${theme.palette.secondary.main} !important`,
                    filter: (theme) =>
                      `drop-shadow(0 0 8px ${theme.palette.secondary.main})`,
                  },
                }}
              />
              <Typography
                color="#fff"
                className={styles.shine}
                fontSize="1.5rem"
              >
                {reviews[selectedReviewKey]?.company ||
                  reviews[selectedReviewKey]?.firstname +
                    " " +
                    reviews[selectedReviewKey]?.lastname}
              </Typography>
            </Stack>
          </Stack>
        </BrowserLayout>
      </CustomModal>
    </Stack>
  )
}

export async function getStaticProps({ params }) {
  const {} = params
  const data = await fetchUpToDateReviews()
  let notFound = false

  if (data.statusCode === 400 || data.statusCode === 404) notFound = true

  return { props: data, notFound, revalidate: 60 }
}
