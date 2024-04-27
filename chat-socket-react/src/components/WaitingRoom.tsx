import { Button, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function WaitingRoom({ joinChatRoom }: { joinChatRoom: any }) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { userName: "", chatRoom: "" },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values, e) => {
          joinChatRoom(values.userName, values.chatRoom);
        })}
      >
        <TextInput
          label="User Name"
          placeholder="Enter your name"
          withAsterisk
          {...form.getInputProps("userName")}
        />
        <TextInput
          label="Chat Room"
          placeholder="Enter chat room"
          withAsterisk
          {...form.getInputProps("chatRoom")}
        />
        <Button type="submit">Join</Button>
      </form>
    </>
  );
}
