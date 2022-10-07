import dynamic from "next/dynamic"
const EditFilmModal = dynamic(() => import("./Edit-Modals/edit-film-modal"))
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
