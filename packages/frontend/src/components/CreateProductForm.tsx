import useAuthenticatedUser from "../hooks/useAuthenticatedUser.ts";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  useCreateProduct,
  useCreateProductStage,
  useFindManyProduct,
  useUpdateProduct,
} from "zenstack-demo-warehouse-backend/src/hooks/generated";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { ProductSchema } from "zod-models";
import Button from "@mui/material/Button";

export const CreateProductForm = () => {
  const { user } = useAuthenticatedUser();
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      handleCreateProduct(value.name);
      setOpenDialog(false);
      form.reset();
    },
  });
  const productCreateMutation = useCreateProduct();
  const productUpdateMutation = useUpdateProduct();
  const productStageMutation = useCreateProductStage();
  const productsQuery = useFindManyProduct({
    select: {
      id: true,
      name: true,
    },
  });

  const handleCreateProduct = async (name: string) => {
    const existingUserId = user.id; // replace with the actual user id
    try {
      // create a product
      const createdProduct = await productCreateMutation.mutateAsync({
        data: {
          name: name,
          managers: {
            create: {
              manager: {
                connect: {
                  id: existingUserId,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <Fab
        sx={{ position: "absolute", bottom: 32, right: 32 }}
        color="primary"
        variant="extended"
        onClick={() => setOpenDialog(true)}
      >
        <AddIcon />
        Create product
      </Fab>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: { overflow: "visible" },
        }}
      >
        <DialogTitle>Create product</DialogTitle>
        <DialogContent>
          <form
            style={{ padding: 16 }}
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <Stack spacing={1}>
              {/* A type-safe field component*/}
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    const productExists = productsQuery.data?.find(
                      (product) => product.name === value,
                    );
                    if (productExists) {
                      return "product already exists";
                    }
                    return (ProductSchema.shape.name.safeParse(value) as any)
                      ?.error?.issues[0].message;
                  },
                }}
                children={(field) => {
                  return (
                    <>
                      <Autocomplete
                        freeSolo
                        disablePortal
                        options={PRODUCTS_TYPES}
                        onChange={(e, value) =>
                          value && field.handleChange(value)
                        }
                        onBlur={field.handleBlur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            autoFocus
                            label="Product Name"
                            helperText={field.state.meta.touchedErrors}
                          />
                        )}
                      />
                    </>
                  );
                }}
              />
            </Stack>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "..." : "Create"}
                </Button>
              )}
            />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const PRODUCTS_TYPES = ["banana", "apple", "orange"];
