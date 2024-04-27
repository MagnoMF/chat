import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Container, Title } from "@mantine/core";
import WaitingRoom from "./components/WaitingRoom";
import { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import SendMessage from "./components/SendMessage";

function App() {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<{ userName: string; msg: string }[]>(
    []
  );

  async function joinChatRoom(userName: string, chatRoom: string) {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5117/chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("JoinSpecificChatRoom", (userName, msg) => {
        console.log("msg: ", msg, "userName", userName);
        setMessages((messages) => [...messages, { userName, msg }]);
      });

      conn.on("ReceiveSpecificMessage", (userName, msg) => {
        console.log("AKA", userName, msg);
        setMessages((messages) => [...messages, { userName, msg }]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", {
        Username: userName,
        ChatRoom: chatRoom,
      });
      setConnection(conn);
    } catch (err) {
      console.log(err);
    }
  }

  async function sendMessage(msg: string) {
    try {
      await connection?.invoke("SendMessage", msg);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <Container>
        <Title order={1}>Chat 100% Original & Seguro</Title>
        {!connection ? (
          <WaitingRoom joinChatRoom={joinChatRoom} />
        ) : (
          <>
            <ChatRoom messages={messages} />
            <SendMessage sendMessage={sendMessage} />
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
