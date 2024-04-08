import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { DialogActions, DialogContentText } from "@mui/material";
import Button from "@mui/material/Button";

// interface ConfirmDialogButtonBaseProps {
//   //for controlled state
//   open?: boolean;
//   titleText?: string;
//   content?: React.ReactNode;
//   buttonElement?: (handleOpen: () => void) => React.ReactNode;
//
//   dialogConfirmButtonLabel?: string;
//   dialogCancelButtonLabel?: string;
// }
//
// interface ConfirmDialogButtonBaseHandleConfirmProps extends ConfirmDialogButtonBaseProps {
//   dialogHandleConfirm: (close: () => void) => void;
// }
//
// interface ConfirmDialogButtonBaseDialogButtonProps extends ConfirmDialogButtonBaseProps {
//   dialogConfirmButton: React.ReactNode;
// }

type ConfirmDialogButtonBaseProps = {
  //for controlled state
  open?: boolean;
  titleText?: React.ReactNode;
  content?: React.ReactNode;
  buttonElement?: (handleOpen: () => void) => React.ReactNode;

  dialogConfirmButtonLabel?: React.ReactNode;
  dialogCancelButtonLabel?: React.ReactNode;
};
export type ConfirmDialogButtonProps = ConfirmDialogButtonBaseProps &
  (
    | { dialogHandleConfirm: (close: () => void) => void }
    | { dialogConfirmButton: React.ReactNode }
  );

/**
 * Example usage:
 * ```tsx
 * <ConfirmDialogButton
 *   dialogHandleConfirm={(close) => {
 *     close();
 *     // handleDeleteResource();
 *   }}
 *   buttonElement={(handleOpen) => (
 *     <IconButton onClick={handleOpen}>
 *       <DeleteIcon />
 *     </IconButton>
 *   )}
 * />
 * ```
 */
const ConfirmDialogButton = React.forwardRef(
  (props: ConfirmDialogButtonProps, ref) => {
    const [open, setOpen] = useState(false);
    const _open = props.open ?? open;

    const handleCancel = () => {
      setOpen(false);
    };

    const _handleOpen = () => {
      setOpen(true);
    };

    const _props = { ...props };
    //remove undefined props
    Object.keys(_props).forEach(
      (key) =>
        (_props as any)[key] === undefined && delete (_props as any)[key],
    );

    const p = {
      ...({
        titleText: "Confirmation",
        content: (
          <DialogContent>
            <DialogContentText>
              This action cannot be undone, Are you sure?
            </DialogContentText>
          </DialogContent>
        ),
        dialogConfirmButtonLabel: "Confirm",
        dialogCancelButtonLabel: "Cancel",
        buttonElement: (handleOpen: () => void = _handleOpen) => (
          <Button onClick={handleOpen}>Confirm Dialog</Button>
        ),
      } satisfies ConfirmDialogButtonBaseProps),
      ..._props,
    };

    let dialogConfirmButton: React.ReactNode;
    if ("dialogConfirmButton" in props) {
      dialogConfirmButton = props.dialogConfirmButton;
    } else {
      dialogConfirmButton = (
        <Button
          autoFocus
          onClick={() => {
            props.dialogHandleConfirm(handleCancel);
          }}
        >
          {p.dialogConfirmButtonLabel}
        </Button>
      );
    }

    return (
      <>
        {p.buttonElement(_handleOpen)}
        <Dialog open={_open} disableRestoreFocus onClose={() => setOpen(false)}>
          <DialogTitle>{p.titleText}</DialogTitle>
          {p.content}
          <DialogActions>
            <Button onClick={handleCancel}>{p.dialogCancelButtonLabel}</Button>
            {dialogConfirmButton}
          </DialogActions>
        </Dialog>
      </>
    );
  },
);
export default ConfirmDialogButton;
