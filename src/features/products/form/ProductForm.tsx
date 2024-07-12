import UploadThingFileInput from "@/core/components/UploadThingFileInput";
import { useMutation } from "@blitzjs/rpc";
import {
  Box,
  Button,
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
  useMantineTheme,
} from "@mantine/core";
import { Form, useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { BookCategory } from "@prisma/client";
import addProduct from "../mutations/addProduct";
import updateProduct from "../mutations/updateProduct";
import { InputAddProduct, InputAddProductType, ProductType } from "../schema";

export const blogCategory = [
  "All",
  "Entraînement",
  "Nutrition",
  "Santé mentale",
  "Motivation",
  "Récupération",
  "Techniques avancées",
  "Histoires de réussite",
  "Conseils pour débutants",
  "Exercices spécifiques",
  "Équipement de gym",
];

const ProductForm = ({ close, product }: { close: () => void; product: ProductType | null }) => {
  const theme = useMantineTheme();
  const [$updateProduct, { isLoading: isLoadingUpdate }] = useMutation(updateProduct);
  const [$addProduct, { isLoading: isLoadingAdd }] = useMutation(addProduct);
  const form = useForm<Omit<InputAddProductType, "content">>({
    initialValues: {
      title: product?.title || "",
      price: product?.price || 0,
      language: product?.language || "FR",
      description: product?.description || "",
      productImageKey: product?.productImageKey || "",
      author: product?.author || "",
      isbn: product?.isbn || "",
      category: product?.category || "OTHER",
    },
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
    close();
  };

  const isLoading = isLoadingAdd || isLoadingUpdate;
  return (
    <Container size={"lg"}>
      <Center>
        <Stack w={"100%"}>
          <Form form={form} onSubmit={onSubmit}>
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
                    Catégorie
                    <Text fw={400} c={"red"} span>
                      *
                    </Text>
                  </Text>
                  <Select
                    size="lg"
                    placeholder="Choisissez une catégorie"
                    {...form.getInputProps("category")}
                    data={Object.keys(BookCategory).map((key) => ({ value: key, label: key.split("_").join(" ") }))}
                  />
                </Stack>

                <Stack>
                  <Text tt="uppercase" fz={rem(14)}>
                    Price
                    <Text fw={400} c={"red"} span>
                      *
                    </Text>
                  </Text>
                  <NumberInput
                    size="lg"
                    {...form.getInputProps("price")}
                    defaultValue={1}
                    min={1}
                    allowNegative={false}
                  />
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
                    data={["EN", "FR", "AR"]}
                  />{" "}
                </Stack>

                <Stack gap={rem(10)}>
                  <Text tt="uppercase" fz={rem(14)}>
                    Description
                    <Text fw={400} c={"red"} span>
                      *
                    </Text>
                  </Text>
                  <Textarea size="lg" {...form.getInputProps("description")} />
                </Stack>
              </Stack>
            </Group>

            <Group justify="flex-end" mt={30}>
              <Button
                onClick={close}
                bg={"white"}
                c={"black"}
                style={{ border: "1px solid", borderColor: theme.colors.gray[3] }}
              >
                Cancel
              </Button>
              <Button loading={isLoading} disabled={!form.isValid()} type="submit">
                Publier
              </Button>
            </Group>
          </Form>
        </Stack>
      </Center>
    </Container>
  );
};

export default ProductForm;
