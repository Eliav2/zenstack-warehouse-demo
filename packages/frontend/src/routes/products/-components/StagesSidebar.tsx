import * as React from "react";
import { Box } from "@mui/material";
import { Drawer } from "./TopProductBar.tsx";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Stage } from "prisma-models";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "green",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderLeftWidth: 3,
    borderRadius: 1,
  },
}));

const steps = Object.keys(Stage).map((stage) => {
  return { label: stage };
});

export function StagesSidebar(props: {
  open: boolean;
  appBarHeight: number;
  activeStep: "" | 0 | false | number;
  callbackfn: (step, index) => React.JSX.Element;
}) {
  return (
    <Box>
      <Drawer
        variant="permanent"
        open={props.open}
        PaperProps={{
          sx: {
            position: "static",
          },
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: props.appBarHeight * 2 + 6,
        }}
      >
        <Box
          sx={{
            alignSelf: "flex-start",
            p: 1,
            px: 2,
            display: "flex",
            justifyContent: "flex-start",
            position: "static",
          }}
        >
          <Stepper
            activeStep={props.activeStep}
            orientation="vertical"
            connector={<QontoConnector />}
          >
            {steps.map(props.callbackfn)}
          </Stepper>
        </Box>
      </Drawer>
    </Box>
  );
}
