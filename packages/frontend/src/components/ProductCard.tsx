import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useFindFirstProduct } from "zenstack-demo-warehouse-backend/src/hooks/generated";
import { Stage } from "prisma-models";

const Stages = Object.values(Stage) as (keyof typeof Stage)[];

interface ProductCardProps {
  name: string;
}

export default function ProductCard(props: ProductCardProps) {
  const productQuery = useFindFirstProduct({
    where: {
      name: props.name,
    },
    include: {
      stages: true,
    },
  });
  const product = productQuery.data;

  let finalStepperActiveStage = 0;
  for (const stage of Stages) {
    if (product?.stages.find((s) => s.stage === stage)?.done) {
      finalStepperActiveStage++;
    } else {
      break;
    }
  }
  const currentStage = Stages[finalStepperActiveStage] ?? "DONE";

  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            status: {currentStage}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
