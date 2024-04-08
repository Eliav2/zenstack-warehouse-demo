import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Collapse, Stack } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import React, { useEffect, useState } from "react";

import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";

function useDelayedAction(delayMS: number) {
  const [isDelayPassed, setIsDelayPassed] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => setIsDelayPassed(true), delayMS);

    return () => clearTimeout(timerId);
  }, []);
  return isDelayPassed;
}

const FlexBox = styled(Box)({
  display: "flex",
});
const CenteredFlexBox = styled(FlexBox)({
  justifyContent: "center",
  alignItems: "center",
});

const FullSizeCenteredFlexBox = React.memo(
  styled(CenteredFlexBox)(() => ({
    minWidth: "100%",
    minHeight: "100%",
  })),
);

export function Loading() {
  return (
    <FullSizeCenteredFlexBox>
      <QueryIndicator loading={true}>
        <CircularProgress />
      </QueryIndicator>
    </FullSizeCenteredFlexBox>
  );
}

interface QueryIndicatorProps {
  children: React.ReactNode;
  loading: boolean;
  errorMessage?: string | null;
  loadingIndicator?: React.ReactNode;
  skipLoadingIndicator?: boolean;
}

const QueryIndicator = ({
  children,
  loading,
  errorMessage,
  /// loadingIndicator = <Loading />,
  loadingIndicator = (
    <Stack
      sx={{
        minHeight: 80,
        minWidth: 220,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Stack>
  ),
}: // skipLoadingIndicator = FIRESTORE_PERSISTENT_ENABLED,
QueryIndicatorProps) => {
  const [expanded, setExpanded] = useState(false);
  const delayed = useDelayedAction(300);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // console.log(error);
  if (errorMessage)
    return (
      <Box sx={{ textAlign: "center", pt: 2 }}>
        <Box onClick={handleExpandClick} style={{ cursor: "pointer" }}>
          <CenteredFlexBox>
            <Typography variant={"body2"}>details</Typography>
            <RotatingIconButton isRotated={expanded} />
          </CenteredFlexBox>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant={"body2"}>{errorMessage}</Typography>
          </Collapse>
        </Box>
      </Box>
    );

  if (loading) {
    if (delayed) return <>{loadingIndicator}</>;
    return <>{null}</>;
  }
  return <>{children}</>;
};

interface RotatingIconButtonProps {
  isRotated?: boolean;
  icon?: React.FC;
}

const RotatingIconButton = (props: RotatingIconButtonProps) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleRotateClick = () => {
    setIsRotated(!isRotated);
  };
  const Icon = props.icon ?? KeyboardArrowLeftIcon;

  const _isRotated = props.isRotated ?? isRotated;

  return (
    <Icon
      onClick={handleRotateClick}
      style={{
        transform: _isRotated ? "rotate(-90deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease-in-out",
      }}
    />
  );
};

export default QueryIndicator;
