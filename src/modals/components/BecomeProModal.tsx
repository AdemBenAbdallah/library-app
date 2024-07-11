import { Horizontal, Vertical } from "@/core/components/MantineLayout";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ContextModalProps } from "@mantine/modals";
import { ReactFC } from "~/types";

type InnerProps = {
  price: number;
  onDelete: () => void;
};

const BecomeProModal: ReactFC<ContextModalProps<InnerProps>> = ({ context, id, innerProps }) => {
  const { price, onDelete } = innerProps;

  let closeModal = () => context.closeModal(id);
  const [opened, { open, close }] = useDisclosure();
  return (
    <Vertical fullW gap={15}>
      <Vertical>For subscription price pro is ${price}!</Vertical>
      <Button onClick={open} w={"fit-content"} ml={"auto"}>
        Tell me more
      </Button>
      <Modal zIndex={209} overlayProps={{ blur: 2 }} size={"sm"} opened={opened} onClose={close} title="More Info">
        More info about the pro plan
      </Modal>

      <Horizontal justify="space-between">
        <Button color="grey" onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={onDelete}>Delete</Button>
      </Horizontal>
    </Vertical>
  );
};

export default BecomeProModal;
