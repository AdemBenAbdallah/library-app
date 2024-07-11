import { Vertical } from "@/core/components/MantineLayout";
import UploadThingFileInput from "@/core/components/UploadThingFileInput";
import { Box, Button, Paper, TextInput } from "@mantine/core";
import { Form, UseFormReturnType } from "@mantine/form";
import { InputUpdateUserType } from "../schemas";

type Props = {
  form: UseFormReturnType<InputUpdateUserType>;
  onSubmit: (values: InputUpdateUserType) => Promise<void>;
  isLoading: boolean;
};

const EditProfileForm = ({ form, onSubmit, isLoading }: Props) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Paper radius="md" p={{ base: "lg", md: "xl" }} maw={400} withBorder>
        <Vertical gap={"md"}>
          <TextInput label="Name" placeholder="name..." key={form.key("name")} {...form.getInputProps("name")} />
          <Box w={200}>
            <UploadThingFileInput form={form} label="Profile Picture" name="avatarImageKey" />
          </Box>
          <UploadThingFileInput form={form} label="Cover Picture" name="coverImageKey" />
          <Button disabled={!form.isValid()} loading={isLoading} type="submit">
            update
          </Button>
        </Vertical>
      </Paper>
    </Form>
  );
};

export default EditProfileForm;
