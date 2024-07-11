import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";

type Options = {
  onCancel?: () => void;
  title?: string;
  text?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};
export const ConfirmDelete = (cb, otpions: Options = {}) => {
  const {
    onCancel,
    text = "Are you sure you want to delete this? This action is destructive.",
    title = "Confirm Deletion",
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
  } = otpions;

  return modals.openConfirmModal({
    title: title,
    centered: true,
    children: <Text size="sm">{text}</Text>,
    labels: { confirm: confirmLabel, cancel: cancelLabel },
    confirmProps: { color: "red" },
    onCancel: onCancel,
    onConfirm: () => cb?.(),
  });
};
