import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";

import ConfirmDialogButton from "../../components/ConfirmDialogButton.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useCreateProductStage,
  useDeleteProduct,
  useFindFirstProduct,
  useUpdateProduct,
  useUpdateProductStage,
} from "zenstack-demo-warehouse-backend/src/hooks/generated";
import { ProductStage, Stage } from "prisma-models";
import * as React from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import HasPermission from "../../components/HasPermission.tsx";
import Link from "../../components/Link.tsx";
import { z } from "zod";
import { styled, useTheme } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import LoadingButton from "@mui/lab/LoadingButton";

import StepIcon, {
  stepIconClasses,
  StepIconProps,
} from "@mui/material/StepIcon";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tooltip from "@mui/material/Tooltip";
import {
  stagesSidebarDrawerWidth,
  TopProductBar,
  useTopProductBarWidth,
} from "./-components/TopProductBar.tsx";
import useAppBarHeight from "../../hooks/useAppBarHeight.ts";
import { Loading } from "../../components/QueryIndicator.tsx";
import Stepper from "@mui/material/Stepper";
import Fab from "@mui/material/Fab";
import useExpandStagesSidebar from "../../store/useExpandStagesSidebar.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Drawer, StepButton } from "@mui/material";
import { FloatingActionButtonZoom } from "../../components/FloatingActionButtonZoom.tsx";
import { useEffect } from "react";

export const Route = createFileRoute("/products/$productName")({
  component: ProductPage,
  validateSearch: z.object({
    stage: z.nativeEnum(Stage).optional().catch(undefined),
  }),
});

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

interface QontoStepIconProps extends StepIconProps {
  isSelected: boolean;
  stage?: ProductStage | undefined;
}

function QontoStepIcon(props: QontoStepIconProps) {
  const { isSelected, ...rest } = props;
  return (
    <div>
      <StepIcon
        {...rest}
        // active={props.stage?.done === true}
        active={!!props.stage}
        completed={props.stage?.done}
        sx={(theme) =>
          isSelected
            ? { fill: theme.palette.secondary.main }
            : {
                [`&.${stepIconClasses.active}`]: {
                  fill: theme.palette.primary.main,
                },
                [`&.${stepIconClasses.completed}`]: {
                  fill: "green",
                },
              }
        }
      />
    </div>
  );
}

const NotFound = ({ productName }: { productName: string }) => {
  const navigation = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation({ to: "/products" });
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <Box sx={{ p: 2 }}>
      <Typography>{productName} product not found</Typography>
      <Typography>Redirecting to products...</Typography>
    </Box>
  );
};
const steps = Object.keys(Stage).map((stage) => {
  return { label: stage };
});

const Stages = Object.values(Stage) as (keyof typeof Stage)[];

function ProductPage() {
  const { productName } = Route.useParams();

  const productQuery = useFindFirstProduct({
    where: {
      name: productName,
    },
    include: {
      stages: true,
    },
  });
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = useExpandStagesSidebar();
  const appBarHeight = useAppBarHeight() ?? 64;

  const product = productQuery.data;

  let finalStepperActiveStage = 0;
  for (const stage of Stages) {
    if (product?.stages.find((s) => s.stage === stage)?.done) {
      finalStepperActiveStage++;
    } else {
      break;
    }
  }
  const currentStage =
    (product && Stages[finalStepperActiveStage]) ?? Stages[0];

  return (
    <Box sx={{ width: "100%" }}>
      <TopProductBar
        position="sticky"
        open={openDrawer}
        sx={{
          zIndex: 100,
          top: appBarHeight + 5,
        }}
      >
        <Toolbar>
          <IconButton
            onClick={() => setOpenDrawer(false)}
            sx={{
              ...(openDrawer ? {} : { display: "none" }),
              position: "absolute",
              left: openDrawer ? -60 : 0,
              transition: theme.transitions.create("left", {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenDrawer(true)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(openDrawer && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            to={`/products/$productName/${currentStage}`}
            params={{ productName }}
          >
            <Typography variant="h6" noWrap component="div">
              {productName} product
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <HasPermission permission={"manageProduct"}>
            <DeleteProductButton productName={productName} />
          </HasPermission>
        </Toolbar>
      </TopProductBar>
      <StageView />
    </Box>
  );
}

const StageView = () => {
  const { productName } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();

  const urlStage = router.state.location.pathname.split("/").at(3) as
    | Stage
    | undefined;

  const productQuery = useFindFirstProduct({
    where: {
      name: productName,
    },
    include: {
      stages: true,
    },
  });

  const productStageCreateMutation = useCreateProductStage();
  const productStageUpdateMutation = useUpdateProductStage();

  const [openDrawer, setOpenDrawer] = useExpandStagesSidebar();
  const appBarHeight = useAppBarHeight() ?? 64;

  const product = productQuery.data;

  let finalStepperActiveStage = 0;
  for (const stage of Stages) {
    if (product?.stages.find((s) => s.stage === stage)?.done) {
      finalStepperActiveStage++;
    } else {
      break;
    }
  }
  const currentStage = Stages[finalStepperActiveStage];

  const stepperActiveStage =
    urlStage || currentStage || Object.values(Stage)[0];

  useEffect(() => {
    if (!urlStage) {
      navigate({
        to: `/products/$productName/${stepperActiveStage}` as any,
        params: { productName: productName as any },
      });
    }
  }, []);

  if (!productQuery.data || !product) {
    if (productQuery.isLoading) {
      return <Loading />;
    }
    return <NotFound productName={productName} />;
  }

  const stageExists = !!product.stages
    .map((s) => s.stage)
    .includes(stepperActiveStage);

  const urlProductStage = product.stages.find(
    (stage) => stage.stage === stepperActiveStage,
  );

  async function handleCreateActiveStage() {
    // create a stage for the product
    const createdProductStage = await productStageCreateMutation.mutateAsync({
      data: {
        ownedProducts_stages: {
          connect: {
            id: product.id,
          },
        },
        stage: stepperActiveStage,
      },
    });
    if (!createdProductStage) {
      console.error("failed to create stage");
      return;
    }
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* StagesSideBar */}
        <Box>
          <Drawer
            variant="permanent"
            open={openDrawer}
            PaperProps={{
              sx: {
                position: "static",
              },
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "sticky",
              top: appBarHeight * 2 + 6,
              ...(openDrawer ? { width: stagesSidebarDrawerWidth } : {}),
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
                activeStep={finalStepperActiveStage}
                orientation="vertical"
                connector={<QontoConnector />}
              >
                {steps.map((step, index) => (
                  <Tooltip
                    title={step.label}
                    key={step.label}
                    enterDelay={1000}
                  >
                    <Step>
                      <Link
                        // search={{
                        //   stage: step.label,
                        // }}
                        to={`/products/$productName/${step.label}`}
                      >
                        <Box sx={{ position: "absolute", left: -5 }}>
                          {step.label == urlStage && "➝"}
                        </Box>
                        <StepButton color="inherit">
                          <StepLabel
                            StepIconComponent={(props) => (
                              <QontoStepIcon
                                {...props}
                                isSelected={step.label === stepperActiveStage}
                                stage={product.stages.find(
                                  (stage) => stage.stage === step.label,
                                )}
                              />
                            )}
                          >
                            {openDrawer && step.label}
                          </StepLabel>
                        </StepButton>
                      </Link>
                    </Step>
                  </Tooltip>
                ))}
              </Stepper>
            </Box>
          </Drawer>
        </Box>

        <Box
          sx={{
            // width: width,
            // flexGrow: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            overflow: "hidden",
          }}
        >
          {stageExists ? (
            <Box sx={{ width: "100%" }}>
              {/*<Typography>stage {stepperActiveStage}</Typography>*/}
              <Outlet />

              {/*<Button onClick={handleSetStageActive}>Set Active</Button>*/}
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant={"body2"}>
                {stepperActiveStage} Stage hasn't started yet
              </Typography>
              <LoadingButton
                variant={"contained"}
                sx={{ m: 1, textTransform: "none" }}
                onClick={handleCreateActiveStage}
              >
                Start {stepperActiveStage}
              </LoadingButton>
            </Box>
          )}
        </Box>
      </Box>

      {/* change stage button */}
      <Box
        sx={{
          bgcolor: "background.paper",
          position: "relative",
        }}
      >
        {/* next stage button */}
        {urlProductStage &&
          (urlProductStage.done === false ? (
            <FloatingActionButtonZoom
              currentStage={urlProductStage.stage}
              onClick={async () => {
                const nextStage =
                  Stages[Stages.indexOf(stepperActiveStage) + 1];
                await productStageUpdateMutation.mutateAsync({
                  where: {
                    id: urlProductStage.id,
                  },
                  data: {
                    done: true,
                  },
                });
                navigate({
                  search: {
                    stage: nextStage,
                  },
                });
              }}
            />
          ) : (
            <Fab
              variant={"extended"}
              color={"primary"}
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                // width: "auto",
                overflow: "hidden",
                textTransform: "none",
              }}
              onClick={async () => {
                if (!urlProductStage) return;
                await productStageUpdateMutation.mutateAsync({
                  where: {
                    id: urlProductStage.id,
                  },
                  data: {
                    done: false,
                  },
                });
              }}
            >
              🚧 Re-open
            </Fab>
          ))}
      </Box>
    </>
  );
};

export const DeleteProductButton = ({
  productName,
}: {
  productName: string;
}) => {
  const deleteProductMutation = useDeleteProduct();
  const navigation = useNavigate({ from: "/products/$productName" });
  return (
    <ConfirmDialogButton
      dialogHandleConfirm={async (close) => {
        close();
        await deleteProductMutation.mutateAsync({
          where: {
            name: productName,
          },
        });
        navigation({ to: "/products" });
      }}
      buttonElement={(handleOpen) => (
        <Tooltip title={"Delete product"}>
          <IconButton onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    />
  );
};
