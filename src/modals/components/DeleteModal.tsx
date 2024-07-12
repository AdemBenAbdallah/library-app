import { Button, Group, Modal, Stack, Text } from "@mantine/core";

const DeleteModal = ({ opened, close, loading, text = "Are you sure?", onDelete }) => {
  return (
    <Modal opened={opened} onClose={close} title="Supprimer">
      <Stack>
        <Text>{text}</Text>
        <Group ml={"auto"} mt={10}>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button bg={"red"} c={"white"} onClick={onDelete} loading={loading}>
            Supprimer
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteModal;
