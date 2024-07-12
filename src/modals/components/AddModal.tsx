import { Button, Flex, Group, Modal, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren, Ref, forwardRef, useImperativeHandle } from "react";

export type addModalRef = {
  open: () => void;
  close: () => void;
};
type Props = PropsWithChildren & {
  isLoading: boolean;
  isDisabled: boolean;
};

const AddModal = ({ children, isLoading, isDisabled }: Props, ref: Ref<addModalRef>) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({ open, close }));
  return (
    <Modal
      title={<ModalHeader close={close} isDisabled={isDisabled} isLoading={isLoading} />}
      opened={opened}
      onClose={close}
      fullScreen
      withCloseButton={false}
      styles={{
        header: {
          display: "block",
          borderBottom: "1px solid #F3F3F3",
        },
      }}
    >
      {children}
    </Modal>
  );
};

const ModalHeader = ({
  close,
  isDisabled,
  isLoading,
}: {
  close: () => void;
  isDisabled: boolean;
  isLoading: boolean;
}) => {
  const theme = useMantineTheme();
  return (
    <Flex justify={"space-between"} align={"center"} w={"100%"}>
      <Group ml={"auto"}>
        <Button
          onClick={close}
          bg={"white"}
          c={"black"}
          style={{ border: "1px solid", borderColor: theme.colors.gray[3] }}
        >
          Cancel
        </Button>
        <Button type="submit" form="my-form" loading={isLoading} disabled={isDisabled}>
          Publier
        </Button>
      </Group>
    </Flex>
  );
};

export default forwardRef(AddModal);
