import { InputWithButton } from "@/core/components/InputWithButton";
import RenderTable, { Column } from "@/core/components/RenderTable";
import DashLayout from "@/core/layouts/DashLayout";
import ProductForm from "@/features/products/form/ProductForm";
import deleteProduct from "@/features/products/mutations/deleteProduct";
import getProductsByAdmin from "@/features/products/queries/getProductsByAdmin";
import { addModalRef } from "@/modals/components/AddModal";
import DeleteModal from "@/modals/components/DeleteModal";
import { getUploadThingUrl } from "@/utils/image-utils";
import { categoryNameFormat } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import { Avatar, Button, Group, Stack, Text } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const ITEMS_PER_PAGE = 10;

const AdminProducts: BlitzPage = () => {
  const [search, setSearch] = useDebouncedState("", 200);
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [$deleteProduct, { isLoading }] = useMutation(deleteProduct, {});
  const addModalRef = useRef<addModalRef>(null);

  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ products, count, from, to }] = usePaginatedQuery(getProductsByAdmin, {
    orderBy: { id: "asc" },
    where: {
      title: search ? { contains: search, mode: "insensitive" } : undefined,
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  type ProductType = (typeof products)[number];
  const columns: Column<ProductType>[] = [
    {
      header: "Product",
      accessor: (product: ProductType) => (
        <Group>
          <Avatar src={getUploadThingUrl(product.productImageKey)} size={50} radius="md" />
          {product.title}
        </Group>
      ),
    },
    {
      header: "Description",
      accessor: (product: ProductType) => (
        <Text size="sm" lineClamp={2} w={400} c={"gray.7"}>
          {product.description}
        </Text>
      ),
    },
    { header: "Price", accessor: (product: ProductType) => <Text>{product.price} DT</Text> },
    { header: "Language", accessor: "language" },
    { header: "Category", accessor: (product: ProductType) => <Text>{categoryNameFormat(product.category)}</Text> },
    { header: "Author", accessor: "author" },
    { header: "ISBN", accessor: "isbn" },
    {
      header: "",
      accessor: (product: ProductType) => (
        <Group>
          <IconEdit
            stroke={1}
            onClick={() => {
              setSelectedProduct(product);
              addModalRef?.current?.open();
            }}
            style={{ cursor: "pointer" }}
            size={25}
          />
          <IconTrash
            onClick={() => {
              setSelectedProduct(product);
              openDelete();
            }}
            stroke={1}
            style={{ cursor: "pointer" }}
            size={25}
          />
        </Group>
      ),
    },
  ];

  return (
    <DashLayout>
      <Stack flex={8} gap={30}>
        <Group justify="space-between">
          <Group>
            <InputWithButton defaultValue={search} onChange={(event) => setSearch(event.currentTarget.value)} w={400} />
          </Group>
          <Button onClick={() => addModalRef?.current?.open()} radius={"md"} c={"white"}>
            Add Product
          </Button>
        </Group>
        <RenderTable
          data={products}
          columns={columns}
          totalCount={count}
          currentPage={page + 1}
          onPageChange={(newPage: number) => router.push({ query: { page: newPage - 1 } })}
          itemsPerPage={ITEMS_PER_PAGE}
          from={from}
          to={to}
        />
      </Stack>

      <ProductForm close={() => addModalRef?.current?.close()} product={selectedProduct} addModalRef={addModalRef} />
      <DeleteModal
        text="Voulez-vous vraiment supprimer ce produit ?"
        opened={openedDelete}
        close={closeDelete}
        loading={isLoading}
        onDelete={async () => {
          await $deleteProduct({ id: selectedProduct!.id });
          closeDelete();
          notifications.show({
            title: "Produit supprimé",
            message: "Le produit a bien été supprimé",
            color: "red",
          });
        }}
      />
    </DashLayout>
  );
};

export default AdminProducts;
