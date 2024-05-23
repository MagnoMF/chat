import { Button, TextInput, Title } from "@mantine/core";
import { HubConnection } from "@microsoft/signalr";
import { IconBrandTelegram } from "@tabler/icons-react";
import { useState } from "react";

export default function ChatRoom({
  sendMessage,
  messages,
}: {
  sendMessage: Function;
  messages: { userName: string; msg: string }[];
}) {
  const [message, setMessage] = useState<string>("");
  return (
    <>
      <Title
        order={2}
        style={{ borderBottom: "1px solid #5D5D5D", width: "100%" }}
      >
        {"Chat Room"}
      </Title>
      <div style={{ height: "92%", overflow: "auto" }}>
        {messages.map(({ userName, msg }, i) => {
          return <p key={i}> {`${userName} > ${msg}`}</p>;
        })}
      </div>
      <form
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ width: "90%" }}
            radius={"4px 0 0 4px"}
            type="text"
            placeholder="Digite sua mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" style={{ borderRadius: "0 4px 4px 0" }}>
            <IconBrandTelegram />
          </Button>
        </div>
      </form>
    </>
  );
}
