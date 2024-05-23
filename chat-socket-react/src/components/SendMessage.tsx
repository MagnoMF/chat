import { Button, FileInput, TextInput } from "@mantine/core";
import { useState } from "react";

export default function SendMessage({
  sendMessage,
}: {
  sendMessage: Function;
}) {
  const [message, setMessage] = useState<string>("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
          setMessage("");
        }}
      >
        <TextInput
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
