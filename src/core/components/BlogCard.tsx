import deleteBlog from "@/features/blogs/mutations/deleteBlog";
import { BlogType } from "@/features/blogs/schema";
import classes from "@/styles/module/BlogCard.module.css";
import { getUploadThingUrl } from "@/utils/image-utils";
import { useSession } from "@blitzjs/auth";
import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import { ActionIcon, Badge, Button, Card, Group, Image, Text, useMantineTheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrashFilled } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  blog: BlogType;
  setSelectedBlog?: (value: BlogType) => void;
  updateModalOpen?: () => void;
  isEdit?: boolean;
};

export function BlogCard({ blog, setSelectedBlog, updateModalOpen, isEdit }: Props) {
  const theme = useMantineTheme();
  const session = useSession();
  const router = useRouter();
  const [$deleteBlog] = useMutation(deleteBlog, {});

  const plainTextContent = stripHtmlTags(blog?.content);
  const truncatedContent = truncateText(plainTextContent, 150);

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Supprimer votre Blog",
      centered: true,
      children: <Text size="md">Êtes-vous sûr de vouloir supprimer votre Blog ?</Text>,
      labels: { confirm: "Supprimer", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: handleDelte,
    });

  const handleDelte = async () => {
    if (!blog) return;
    await $deleteBlog({
      id: blog.id,
    });
    notifications.show({
      title: "Blog supprimé",
      message: "Le blog a bien été supprimé",
      color: "red",
    });
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={getUploadThingUrl(blog?.blogImageKey)} alt={blog?.title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {blog?.title}
          </Text>
          <Badge size="sm" variant="light">
            {blog?.category}
          </Badge>
        </Group>
        <Text mih={90} fz="sm" mt="xs" lineClamp={4}>
          {truncatedContent}
        </Text>{" "}
      </Card.Section>

      <Group mt="xs">
        <Button onClick={() => router.push(Routes.BlogDetails({ id: blog?.id }))} radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        {/* <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon> */}
        {(isEdit || session.role === "ADMIN") && (
          <React.Fragment>
            <ActionIcon
              onClick={() => {
                if (!updateModalOpen || !setSelectedBlog) return;
                setSelectedBlog(blog);
                updateModalOpen();
              }}
              variant="default"
              radius="md"
              size={36}
            >
              <IconEdit width={20} height={20} color={theme.colors.blue[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon onClick={openDeleteModal} variant="default" radius="md" size={36}>
              <IconTrashFilled width={20} height={20} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
          </React.Fragment>
        )}
      </Group>
    </Card>
  );
}

function stripHtmlTags(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}
