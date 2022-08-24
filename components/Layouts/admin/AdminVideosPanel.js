import {
  Box,
  Button,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { compose } from "redux"
import apiCall from "../../../services/apiCalls/apiCall"
import withConfirmAction from "../../hocs/withConfirmAction"
import withSnacks from "../../hocs/withSnacks"
import SortVideos from "../../Modals/sort-videos"
import CustomTable from "../../Sections/custom-table"
import SortIcon from "@mui/icons-material/Sort"
const AddCategoryVideoModal = dynamic(() =>
  import("../../Modals/Create-Modals/add-video-modal")
)

const headCells = [
  {
    id: "id",
    numeric: false,
    label: "ID",
  },
  {
    id: "thumbnail_url",
    numeric: false,
    label: "Thumbnail",
    valueGetter: function (param, rowId) {
      return param ? <img src={param} style={{ width: "100px" }} /> : <></>
    },
  },
  {
    id: "title",
    numeric: false,
    label: "Title",
  },
  {
    id: "url",
    numeric: false,
    label: "Video URL",
    valueGetter: function (param, rowId) {
      return param ? (
        <Box
          component="a"
          href={param}
          target="_blank"
          sx={{
            "&:hover": {
              color: (theme) => theme.palette.text.secondary,
              textDecoration: "underline",
            },
          }}
        >
          {param}
        </Box>
      ) : (
        <></>
      )
    },
  },
  {
    id: "description",
    numeric: false,
    label: "Description",
    valueGetter: function (param, rowId) {
      return param ? <Box>{param}</Box> : <Box></Box>
    },
  },
]

function AdminVideosPanel(props) {
  const {
    user,
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  const [rows, setRows] = useState(null)
  const [allRows, setAllRows] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState({ id: 1 })
  const [categories, setCategories] = useState(null)
  const [openAddVideoModal, setOpenAddVideoModal] = useState(false)
  const [openSortVideosModal, setOpenSortVideosModal] = useState(false)
  const [triggerRefresh, refresh] = useState(false)
  const router = useRouter()

  /***************** FETCH DATA ****************/
  const fetchCategoryVideos = async (categoryId) => {
    const res = await apiCall.unauthenticated.getCategoryVideos(categoryId)
    if (res && res.ok) {
      const result = await res.json()
      const localArray = []
      await result.map((category, key) => {
        localArray.push(category)
      })
      setRows(localArray)
      setAllRows(localArray)
    }
  }
  const fetchCategories = async () => {
    const res = await apiCall.unauthenticated.getPublicCategories()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setCategories(jsonRes)
    }
  }

  // Get category videos and ids of categories from DB
  useEffect(() => {
    fetchCategories()
  }, [])
  useEffect(() => {
    fetchCategoryVideos(selectedCategory.id)
  }, [categories, selectedCategory, triggerRefresh])

  /***************** FUNCTIONS *****************/
  const deleteVideos = async (videosToDelete) => {
    // videosToDelete must be an array of videos ids (we get it from handleDeleteVideos())
    const errorsCount = videosToDelete.length
    const [errors] = await Promise.all(
      videosToDelete.map(async (videoId) => {
        const res = await apiCall.admin.deleteCategoryVideo({ id: videoId })
        if (res && res.ok) {
          errorsCount -= 1
        }
        return errorsCount
      })
    )

    if (errors === 0) {
      setSeverity("success")
      setMessageSnack("Video(s) deleted successfully.")
      setOpenSnackBar(true)
    } else {
      setSeverity("error")
      setMessageSnack(
        `A problem occured while deleting ${errors} of the selected videos.`
      )
      setOpenSnackBar(true)
    }

    await fetchCategoryVideos(selectedCategory.id || 1) // Refresh data
  }

  /***************** HANDLERS *****************/
  const handleDeleteVideos = async (videosToDelete) => {
    // videosToDelete must be an array of video ids (we get it from table-helper.js)
    if (!videosToDelete.length) {
      setSeverity("error")
      setMessageSnack("A problem occurred while deleting the selected video(s)")
      return setOpenSnackBar(true)
    }
    // Open confirm modal
    setConfirmTitle(`Delete ${videosToDelete.length} video(s)`)
    setActionToFire(() => async () => await deleteVideos(videosToDelete))
    setConfirmContent({
      text: `Do you really want to delete ${videosToDelete.length} video(s) ?`,
    })
    setNextButtonText("Delete")
    setOpenConfirmModal(true)
  }
  const handleCreate = () => {
    setOpenAddVideoModal(true)
  }
  const handleChangeSelectedCategory = async (e) => {
    setSelectedCategory(categories[e.target.value - 1])
  }
  const handleCloseSortVideosModal = async () => {
    if (triggerRefresh) refresh(false)
    else refresh(true)
    setOpenSortVideosModal(false)
  }

  // SUB-COMPONENTS
  const SelectCategory = () => (
    <Stack flexDirection="row" alignItems="center" margin="0 1rem">
      <Typography component="h6" variant="h6" sx={{ fontSize: "1rem" }}>
        Select a category:
      </Typography>
      <Select
        value={selectedCategory.id}
        onChange={(e) => handleChangeSelectedCategory(e)}
        sx={{
          margin: "0.5rem",
          ".MuiOutlinedInput-input": {
            color: "#fff",
          },
        }}
      >
        {categories &&
          categories.map((category, key) => (
            <MenuItem value={category.id} key={key} sx={{ color: "#fff" }}>
              {category.label}
            </MenuItem>
          ))}
      </Select>
    </Stack>
  )

  return (
    <>
      <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
        <Typography component="h6" variant="h6">
          <Link onClick={() => router.push("/admin")} href="#" color="#000">
            Dashboard
          </Link>
          {" > Manage work content"}
        </Typography>

        <Typography component="span" variant="body1">
          Beneath, you can add, edit or delete any th videos of any category of
          your work page.
        </Typography>

        <Box>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenSortVideosModal(true)}
            startIcon={<SortIcon />}
          >
            Sort videos
          </Button>
        </Box>

        <Stack alignItems="center" justifyContent="center" direction="column">
          <Paper
            variant="contained"
            sx={{ width: "100%", flexDirection: "column" }}
          >
            <SelectCategory />
            <CustomTable
              rows={rows}
              allRows={allRows}
              setRows={setRows}
              headCells={headCells}
              arrayTitle={rows ? `Videos - ${rows.length} result(s)` : "Videos"}
              handleDelete={handleDeleteVideos}
              handleCreate={handleCreate}
              refreshData={() => fetchCategoryVideos(selectedCategory.id || 1)}
              editDataModel="edit-category-video"
            />
          </Paper>
          {openAddVideoModal ? (
            <AddCategoryVideoModal
              open={openAddVideoModal}
              handleClose={() => setOpenAddVideoModal(false)}
              refreshData={() => fetchCategoryVideos(selectedCategory.id || 1)}
            />
          ) : null}
        </Stack>
      </Stack>

      {rows && rows.length && categories[selectedCategory.id] ? (
        <SortVideos
          videos={rows}
          category={
            categories
              ? {
                  id: categories[selectedCategory.id].id,
                  label: categories[selectedCategory.id].label,
                }
              : ""
          }
          open={openSortVideosModal}
          handleClose={handleCloseSortVideosModal}
        />
      ) : null}
    </>
  )
}

export default compose(withSnacks, withConfirmAction)(AdminVideosPanel)
