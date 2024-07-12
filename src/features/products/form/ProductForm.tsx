import UploadThingFileInput from "@/core/components/UploadThingFileInput";
import AddModal, { addModalRef } from "@/modals/components/AddModal";
import { categoryNameFormat } from "@/utils/utils";
import { useMutation } from "@blitzjs/rpc";
import {
  Box,
  Center,
  Container,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { BookCategory } from "@prisma/client";
import { Ref, useEffect } from "react";
import addProduct from "../mutations/addProduct";
import updateProduct from "../mutations/updateProduct";
import { InputAddProduct, InputAddProductType, ProductType } from "../schema";

const ProductForm = ({
  close,
  product,
  addModalRef,
}: {
  close: () => void;
  product: ProductType | null;
  addModalRef: Ref<addModalRef>;
}) => {
  const [$updateProduct, { isLoading: isLoadingUpdate }] = useMutation(updateProduct);
  const [$addProduct, { isLoading: isLoadingAdd }] = useMutation(addProduct);
  const form = useForm<Omit<InputAddProductType, "content">>({
    validate: zodResolver(InputAddProduct),
    validateInputOnBlur: true,
  });

  const onSubmit = async (values: InputAddProductType) => {
    if (product) {
      await $updateProduct({ id: product.id, ...values });
      notifications.show({
        title: "Success",
        color: "green",
        message: "Product updated!",
      });
    }

    if (!product) {
      await $addProduct(values);
      notifications.show({
        title: "Success",
        color: "green",
        message: "Product created!",
      });
    }
    form.reset();
    close();
  };

  useEffect(() => {
    if (product) {
      form.setValues({
        title: product.title,
        price: product.price,
        language: product.language,
        description: product.description,
        productImageKey: product.productImageKey,
        author: product.author || "",
        isbn: product.isbn || "",
        category: product.category,
      });
    }
  }, [product, form]);

  const isLoading = isLoadingAdd || isLoadingUpdate;
  return (
    <AddModal isLoading={isLoading} isDisabled={!form.isValid()} ref={addModalRef}>
      <Container size={"lg"} mt={30}>
        <Center>
          <Stack w={"100%"}>
            <form onSubmit={form.onSubmit(onSubmit)} id="my-form">
              <Group align="flex-start" gap={50} wrap="wrap">
                <Box flex={1} miw={300}>
                  <UploadThingFileInput form={form} label="PRODUCT IMAGE" name="productImageKey" />
                </Box>
                <Stack flex={2}>
                  <TextInput
                    placeholder="Product title"
                    size="lg"
                    radius={0}
                    fw={600}
                    fz={rem(28)}
                    {...form.getInputProps("title")}
                    styles={{ input: { border: "none", borderBottom: "1px solid #DFDFE4" } }}
                  />

                  <Stack>
                    <Text tt="uppercase" fz={rem(14)}>
                      Price
                      <Text fw={400} c={"red"} span>
                        *
                      </Text>
                    </Text>
                    <NumberInput size="lg" {...form.getInputProps("price")} min={1} allowNegative={false} />
                  </Stack>

                  <Stack>
                    <Text tt="uppercase" fz={rem(14)}>
                      Author
                      <Text fw={400} c={"red"} span>
                        *
                      </Text>
                    </Text>
                    <TextInput size="lg" placeholder="Author" {...form.getInputProps("author")} />
                  </Stack>

                  <Stack>
                    <Text tt="uppercase" fz={rem(14)}>
                      Catégorie
                      <Text fw={400} c={"red"} span>
                        *
                      </Text>
                    </Text>
                    <Select
                      size="lg"
                      placeholder="Choisissez une catégorie"
                      {...form.getInputProps("category")}
                      data={Object.keys(BookCategory).map((key) => ({
                        value: key,
                        label: categoryNameFormat(key) || "",
                      }))}
                    />
                  </Stack>

                  <Stack>
                    <Text tt="uppercase" fz={rem(14)}>
                      ISBN
                      <Text fw={400} c={"red"} span>
                        *
                      </Text>
                    </Text>
                    <TextInput size="lg" placeholder="ISBN" {...form.getInputProps("isbn")} />
                  </Stack>

                  <Stack>
                    <Text tt="uppercase" fz={rem(14)}>
                      Language
                      <Text fw={400} c={"red"} span>
                        *
                      </Text>
                    </Text>
                    <Select
                      size="lg"
                      placeholder="Choisissez une catégorie"
                      {...form.getInputProps("language")}
                      data={["English", "French", "Arabic"]}
                    />
                  </Stack>

                  <Stack gap={rem(10)}>
                    <Text tt="uppercase" fz={rem(14)}>
                      Description
                      <Text fw={400} c={"red"} span>
                        *
                      </Text>
                    </Text>
                    <Textarea
                      placeholder="Description"
                      size="lg"
                      {...form.getInputProps("description")}
                      styles={{ input: { minHeight: 200 } }}
                    />
                  </Stack>
                </Stack>
              </Group>
            </form>
          </Stack>
        </Center>
      </Container>
    </AddModal>
  );
};

export default ProductForm;
