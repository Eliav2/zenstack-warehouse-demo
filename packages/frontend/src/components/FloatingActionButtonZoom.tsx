import { Stage } from "prisma-models";
import * as React from "react";
import { FabProps } from "@mui/material";
import Fab from "@mui/material/Fab";
import { Check } from "@mui/icons-material";

interface FloatingActionButtonZoomProps extends FabProps {
  currentStage: `${Stage}`;
}

export function FloatingActionButtonZoom(props: FloatingActionButtonZoomProps) {
  const { currentStage, ...rest } = props;

  return (
    <>
      <Fab
        variant={"extended"}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          overflow: "hidden",
          textTransform: "none",
          whiteSpace: "nowrap",
          transition: "width 0.5s",
        }}
        color={"primary"}
        {...rest}
      >
        <Check />
        Done
      </Fab>
    </>
  );
}
