import { Stage } from "prisma-models";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { Box, FabProps } from "@mui/material";
import Fab from "@mui/material/Fab";
import { Check } from "@mui/icons-material";

interface FloatingActionButtonZoomProps extends FabProps {
  currentStage: `${Stage}`;
}

export function FloatingActionButtonZoom(props: FloatingActionButtonZoomProps) {
  const [desiredStage, setDesiredStage] = useState(0);
  const [delay, setDelay] = useState(40);
  const [animatedSecondLine, setAnimatedSecondLine] = useState(false);
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
