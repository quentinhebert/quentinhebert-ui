import { Stack } from "@mui/material"
import { Reorder, useDragControls, useMotionValue } from "framer-motion"
import ReorderIcon from "../../ReusableComponents/navigation/drag-icon-framer-motion.tsx"

export default function ReorderItem({ item, sortDisabled, ...props }) {
  const y = useMotionValue()
  const dragControls = useDragControls()

  return (
    <Reorder.Item
      value={item}
      id={item}
      style={{
        y,
        x: 0,
        flexDirection: "row",
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
      dragListener={false}
      dragControls={dragControls}
    >
      {!sortDisabled && <ReorderIcon dragControls={dragControls} />}
      <Stack {...props} sx={{ width: "100%" }} />
    </Reorder.Item>
  )
}
