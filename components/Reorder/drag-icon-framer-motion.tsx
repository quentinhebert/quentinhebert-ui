import { DragControls } from "framer-motion";
import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"

interface Props {
  dragControls: DragControls;
}

export default function ReorderIcon({ dragControls }: Props) {
  return (
    <DragIndicatorIcon color='secondary'
      sx={{"&:hover": {cursor: 'grab'}}}
      onPointerDown={(event) => {
        event.stopPropagation()
        dragControls.start(event)
      }}
    />
  );
}
