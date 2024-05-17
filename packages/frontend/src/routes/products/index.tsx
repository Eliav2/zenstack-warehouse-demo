import { createFileRoute } from "@tanstack/react-router";
import { Box, Divider, Typography } from "@mui/material";
import { useFindManyProduct } from "zenstack-demo-warehouse-backend/src/hooks/generated";
import { Stack } from "@mui/system";
import ProductCard from "../../components/ProductCard.tsx";
import Link from "../../components/Link.tsx";
import { CreateProductForm } from "../../components/CreateProductForm.tsx";
import HasPermission from "../../components/HasPermission.tsx";

export const Route = createFileRoute("/products/")({
  component: ProductsIndexPage,
});

function ProductsIndexPage() {
  const productsQuery = useFindManyProduct({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <>
      <Typography variant={"h4"} sx={{ p: 2 }}>
        Products
      </Typography>
      <Divider
        sx={{
          width: "70%",
          height: 2,
          background:
            "linear-gradient(to right, transparent, rgba(0, 0, 0, 0.6), transparent)",
        }}
      />
      <Box sx={{ m: 2 }}>
        <HasPermission permission={"manageProduct"}>
          <CreateProductForm />
        </HasPermission>
      </Box>

      <Stack
        spacing={2}
        direction={"row"}
        sx={{
          flexWrap: "wrap",
          justifyContent: "center", // changed from "center"
          alignItems: "space-around",
        }}
      >
        {productsQuery.data?.map((product) => {
          return (
            <Link
              key={product.name}
              to={`/products/$productName`}
              params={{ productName: product.name }}
              style={{ margin: 0 }}
            >
              <ProductCard name={product.name} />
            </Link>
          );
        })}
      </Stack>
    </>
  );
}
