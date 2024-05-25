import { Button, TextInput, Title } from "@mantine/core";
import { HubConnection } from "@microsoft/signalr";
import { IconBrandTelegram } from "@tabler/icons-react";
import { useState } from "react";
import Message from "./Message";

export default function ChatRoom({
  sendMessage,
  messages,
  activeConnection,
  userNameChat,
}: {
  sendMessage: Function;
  messages: { chatRoom: string; userName: string; msg: string }[];
  activeConnection: { chatRoom: string; conn: HubConnection };
  userNameChat: string | null;
}) {
  const [message, setMessage] = useState<string>("");
  return (
    <>
      <Title
        order={2}
        style={{
          borderBottom: "1px solid #5D5D5D",
          width: "100%",
          color: "#5D5D5D",
        }}
      >
        {activeConnection.chatRoom}
      </Title>
      <div style={{ height: "89vh", overflowY: "auto" }}>
        {messages
          .filter((message) => message.chatRoom === activeConnection.chatRoom)
          .map(({ userName, msg }, key) => {
            return (
              <Message
                userNameChat={userNameChat}
                userName={userName}
                msg={msg}
                keyMessage={key.toString()}
              />
            );
          })}
      </div>
      <form
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          setMessage("");
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
