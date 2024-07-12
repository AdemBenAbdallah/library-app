import { InputWithButton } from "@/core/components/InputWithButton";
import DashLayout from "@/core/layouts/DashLayout";
import ProductForm from "@/features/products/form/ProductForm";
import { BlitzPage } from "@blitzjs/next";
import { Button, Group, Modal, Select, Stack } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";

const AdminProducts: BlitzPage = () => {
  const [search, setSearch] = useDebouncedState("", 200);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <DashLayout>
      <Stack flex={8} gap={30}>
        <Group justify="space-between">
          <Group>
            <InputWithButton defaultValue={search} onChange={(event) => setSearch(event.currentTarget.value)} w={400} />
            <Select
              w={120}
              radius="xl"
              size="md"
              placeholder="Gender"
              data={[
                { value: "", label: "All" },
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" },
              ]}
            />
          </Group>
          <Button onClick={open} radius={"md"} c={"white"}>
            Add Product
          </Button>
        </Group>
      </Stack>
      <Modal opened={opened} onClose={close} fullScreen>
        <ProductForm close={close} product={null} />
      </Modal>
    </DashLayout>
  );
};

export default AdminProducts;
