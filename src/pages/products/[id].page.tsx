import { ImageCard } from "@/core/components/ImageCard";
import Layout from "@/core/layouts/Layout";
import addToCart from "@/features/carts/mutations/addToCart";
import getProductById from "@/features/products/queries/getProductById";
import getRelatedProducts from "@/features/products/queries/getRelatedProducts";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { getUploadThingUrl } from "@/utils/image-utils";
import { categoryNameFormat, useStringParam } from "@/utils/utils";
import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Group, Image, NumberInput, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const ProductDetails: BlitzPage = () => {
  const currentUser = useCurrentUser();
  const id = useStringParam("id");
  const router = useRouter();
  const [product] = useQuery(getProductById, { id: id as string });
  const [quantity, setQuantity] = useState<number | string>(1);
  const [getProducts] = useQuery(getRelatedProducts, {
    category: product?.category || "OTHER",
  });

  const [$addToCart] = useMutation(addToCart, {});

  const addProductToCart = async () => {
    if (!product) return;
    if (!currentUser) {
      showNotification({
        title: "Veuillez vous connecter d'abord",
        message: "Pour accéder à cette fonctionnalité.",
        color: "red",
        autoClose: 2000,
      });
      setTimeout(() => {
        router.push(Routes.AuthPage({ path: `/products/${product.id}` }));
      }, 2000);
      return;
    }
    if (currentUser) {
      $addToCart({
        productId: product?.id || "",
        quantity: Number(quantity),
      });
      showNotification({
        title: "Product added to cart",
        message: "Product added to cart successfully",
        color: "green",
        autoClose: 3000,
      });
      setQuantity(1);
    }
  };
  return (
    <Layout title="Product Details">
      <Stack gap={100} pb={200}>
        <Group w={{ base: "100%", md: 1200 }} mt={20} mx={"auto"} align="start" gap={50} wrap="wrap">
          <Stack flex={1} bg={"red"} style={{ borderRadius: 10 }}>
            <Image
              miw={300}
              mah={500}
              src={getUploadThingUrl(product?.productImageKey)}
              w={"100%"}
              h={"100%"}
              style={{ borderRadius: 10 }}
            />
          </Stack>
          <Stack flex={1} justify="space-between" h={{ base: "auto", md: "100%" }}>
            <Stack gap={0}>
              <Title>{product?.title}</Title>
              <Text span c={"brandy"} fz={"sm"}>
                {product?.author}
              </Text>
            </Stack>
            <Group gap={6}>
              <Text fw={500}> Description:</Text>
              <Text c={"dimmed"} lineClamp={4}>
                {product?.description}
              </Text>
            </Group>

            <Stack gap={6}>
              <Text fw={500}> Category:</Text>
              <Group>
                <Button variant={"outline"}>{categoryNameFormat(product?.category || "")}</Button>
              </Group>
            </Stack>

            <Stack>
              <Group>
                <Text fw={500}>Prix:</Text>
                <Text span c={"dimmed"} fz={"sm"}>
                  {product?.price} DT
                </Text>
              </Group>

              <NumberInput
                value={quantity}
                onChange={(value) => setQuantity(value)}
                w={100}
                defaultValue={1}
                min={1}
                allowNegative={false}
              />
            </Stack>

            <Button onClick={addProductToCart} bg={"black"} w={"100%"}>
              Add to cart
            </Button>
          </Stack>
        </Group>
        <Stack px={{ base: 0, md: 20 }}>
          <Text ml={"auto"} td="underline" c={"brandy"} component={Link} href={Routes.ProductsPage()} fw={500}>
            see more
          </Text>
          <SimpleGrid
            cols={{ base: 2, sm: 2, lg: 5 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {getProducts?.map((product, idx) => <ImageCard key={idx} product={product} />)}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default ProductDetails;
