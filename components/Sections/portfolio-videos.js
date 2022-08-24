import SwipeableViews from "react-swipeable-views/lib/SwipeableViews"
import MultirowGalleryVideo from "./multirow-gallery-video"

const TabPanel = ({ videos, categoryId }) => (
  <div
    role="tabpanel"
    id={`full-width-tabpanel-${categoryId}`}
    aria-controls={`full-width-tab-${categoryId}`}
    value={0}
  >
    <MultirowGalleryVideo
      videos={videos.filter((video) => video.category_id === categoryId)}
    />
  </div>
)

export default function PortfolioVideos(props) {
  const { videos, tab, handleChangeIndex } = props

  if (!videos) return <></>
  return (
    <SwipeableViews
      index={tab}
      disableLazyLoading
      enableMouseEvents
      onChangeIndex={handleChangeIndex}
      axis="x"
      springConfig={{
        duration: "1s",
        easeFunction: "cubic-bezier(0.3, 0, 0.3, 1)",
        delay: "0s",
      }}
    >
      <TabPanel videos={videos} categoryId={1} />
      <TabPanel videos={videos} categoryId={2} />
      <TabPanel videos={videos} categoryId={3} />
      <TabPanel videos={videos} categoryId={4} />
    </SwipeableViews>
  )
}
