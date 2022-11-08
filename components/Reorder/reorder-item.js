import { Stack } from "@mui/material"
import { Reorder, useDragControls, useMotionValue } from "framer-motion"
import ReorderIcon from "./drag-icon-framer-motion.tsx"

export default function ReorderItem({ item, sortDisabled, ...props }) {
  const y = useMotionValue()
  const dragControls = useDragControls()

  return (
    <Reorder.Item
      value={item}
      id={item}
      className="flex row flex-center full-width"
      style={{
        y,
        x: 0,
      }}
      dragListener={false}
      dragControls={dragControls}
    >
      {!sortDisabled && <ReorderIcon dragControls={dragControls} />}
      <Stack {...props} sx={{ width: "100%" }} />
    </Reorder.Item>
  )
}
