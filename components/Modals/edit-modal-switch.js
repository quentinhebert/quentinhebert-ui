import dynamic from "next/dynamic"
const EditWebsiteSlideModal = dynamic(() =>
  import("./Edit-Modals/edit-website-slide-modal")
)
const EditFilmModal = dynamic(() => import("./Edit-Modals/edit-film-modal"))
const EditFilmGearModal = dynamic(() =>
  import("./Edit-Modals/edit-film-gear-modal")
)
const EditWebsiteModal = dynamic(() =>
  import("./Edit-Modals/edit-website-modal")
)
const EditUserModal = dynamic(() => import("./Edit-Modals/edit-user-modal"))
const EditReferenceModal = dynamic(() =>
  import("./Edit-Modals/edit-reference-modal")
)

export default function EditModalSwitch(props) {
  /********** PROPS **********/
  const { dataId, dataModel, openEditModal, handleCloseEditModal } = props

  // MAIN SWITCH
  switch (dataModel) {
    case "edit-user":
      return (
        <EditUserModal
          userId={dataId}
          openEditModal={openEditModal}
          handleCloseEditModal={handleCloseEditModal}
        />
      )
    case "edit-film":
      return (
        <EditFilmModal
          filmId={dataId}
          open={openEditModal}
          handleClose={handleCloseEditModal}
        />
      )
    case "edit-film-gear":
      return (
        <EditFilmGearModal
          gearId={dataId}
          openEditModal={openEditModal}
          handleCloseEditModal={handleCloseEditModal}
        />
      )
    case "edit-website":
      return (
        <EditWebsiteModal
          websiteId={dataId}
          openEditModal={openEditModal}
          handleCloseEditModal={handleCloseEditModal}
        />
      )
    case "edit-website-slide":
      return (
        <EditWebsiteSlideModal
          slideId={dataId}
          openEditModal={openEditModal}
          handleCloseEditModal={handleCloseEditModal}
        />
      )
    case "edit-reference":
      return (
        <EditReferenceModal
          referenceId={dataId}
          openEditModal={openEditModal}
          handleCloseEditModal={handleCloseEditModal}
        />
      )
    default:
      return <></>
  }
}
