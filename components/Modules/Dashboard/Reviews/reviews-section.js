import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useContext } from "react"
import RefreshIcon from "@mui/icons-material/Refresh"
import AddIcon from "@mui/icons-material/Add"

import { Context } from "./module"
import ReviewsList from "./components/reviews-list"
import PillButton from "../../../Buttons/pill-button"
import useEditReview from "./hooks/useEditReview"
import useCreateReview from "./hooks/useCreateReview"

export function ReviewsSection() {
  const { state, fetchReviews } = useContext(Context)

  const { handleOpenCreateReviewModal, CreateReviewDialog } = useCreateReview({
    refreshData: fetchReviews,
  })
  const { handleOpenEditReviewModal, EditReviewDialog } = useEditReview({
    id: state.id,
    refreshData: fetchReviews,
  })

  return (
    <>
      <Stack
        position="relative"
        gap={4}
        sx={{
          background: (theme) => theme.palette.background.main,
          borderRadius: "30px",
        }}
        padding={{ xs: "2rem .75rem", md: "2rem" }}
      >
        <Typography variant="h5" color="#fff" textAlign="center">
          Avis
        </Typography>

        <RefreshBtn />
        <NewReviewBtn />

        <Stack gap={2} overflow="hidden">
          <ReviewsList handleOpenEditModal={handleOpenEditReviewModal} />
        </Stack>

        {CreateReviewDialog({})}
        {EditReviewDialog({})}
      </Stack>
    </>
  )

  function RefreshBtn() {
    return (
      <Box sx={{ position: "absolute", left: 30, top: 30 }}>
        <Tooltip title="Raffraîchir">
          <IconButton
            onClick={fetchReviews}
            sx={{
              aspectRatio: 1,
              background: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.background.main,
              "&:hover": { color: (theme) => theme.palette.secondary.main },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }
  function NewReviewBtn() {
    return (
      <Box sx={{ position: "absolute", right: 30, top: 30 }}>
        <Tooltip title="Nouveau prospect">
          <IconButton
            onClick={handleOpenCreateReviewModal}
            sx={{
              aspectRatio: 1,
              display: { xs: "block", md: "none" },
              background: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.background.main,
              "&:hover": { color: (theme) => theme.palette.secondary.main },
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>

        <PillButton
          preventTransition
          startIcon={<AddIcon />}
          onClick={handleOpenCreateReviewModal}
          display={{ xs: "none", md: "flex" }}
        >
          Créer
        </PillButton>
      </Box>
    )
  }
}
