import { Rating, Stack, Typography } from "@mui/material"
import useSWR from "swr"
import apiCall from "../../../services/apiCalls/apiCall"
import { useContext } from "react"
import { AppContext } from "../../../contexts/AppContext"
import translations from "../../../services/translation"
import AutoPlaySlider from "../../Carousels/AutoPlaySlider"
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded"
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown"

async function fetchUpToDateReviews() {
  const res = await apiCall.reviews.getAll()
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
              zIndex: -2,
            }}
          >
            <FormatQuoteRoundedIcon
              color="secondary"
              sx={{ rotate: "180deg", fontSize: "4rem" }}
            />
            <Typography variant="h5">{review.label}</Typography>
            <Typography fontStyle="italic">{review.description}</Typography>
            <Stack
              mt={3}
              alignSelf="flex-end"
              flexDirection="row"
              alignItems="center"
              gap={2}
            >
              <Rating
                readOnly
                precision={0.5}
                size="medium"
                value={review.grade}
                sx={{
                  "&.MuiRating-root": {
                    color: (theme) =>
                      `${theme.palette.secondary.main} !important`,
                  },
                }}
              />
              <Typography color="gray">
                {review.company || review.firstname + " " + review.lastname}
              </Typography>
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
