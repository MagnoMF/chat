import { Button, TextInput, Image, Center, Container } from "@mantine/core";
import { useForm } from "@mantine/form";
import chatImage from "../assets/images/chatindex.svg";

export default function WaitingRoom({ joinChatRoom }: { joinChatRoom: any }) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { userName: "", chatRoom: "" },
  });

  return (
    <Container>
      <Center>
        <Image radius="md" h={250} w="auto" src={chatImage} />
      </Center>
      <Center>
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
      </Center>
    </Container>
  );
}
