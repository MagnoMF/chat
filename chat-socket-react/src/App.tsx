import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Container, Grid } from "@mantine/core";
import { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import ListContacts from "./components/ListContacts";
import UserNameModal from "./components/UserNameModal";
import ModalDeleteChat from "./components/ModalDeleteChat";

function App() {
  const [connections, setConnections] = useState<
    {
      chatRoom: string;
      conn: HubConnection;
    }[]
  >([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [modalUserName, setModalUserName] = useState<boolean>(true);
  const [activeConnection, setActiveConnection] = useState<{
    chatRoom: string;
    conn: HubConnection;
  } | null>(null);
  const [messages, setMessages] = useState<
    { chatRoom: string; userName: string; msg: string }[]
  >([]);
  const [modalDeleteChat, setModalDeleteChat] = useState<boolean>(false);
  function removeRoom(chatRoom: string) {
    setConnections(connections.filter((chat) => chat.chatRoom !== chatRoom));
    setMessages(messages.filter((msg) => msg.chatRoom !== chatRoom));
  }

  async function addChatRoom(chatRoom: string) {
    if (connections.length === 5)
      return alert("Quantidade Máxima de conexões atingida (5)");
    try {
      const existsCon = connections.filter(
        (chat) => chat.chatRoom === chatRoom
      );
      if (existsCon.length > 0) return;
      const conn = new HubConnectionBuilder()
        .withUrl("http://192.168.1.106:5117/chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("JoinSpecificChatRoom", (userName, msg) => {
        setMessages((messages) => [...messages, { chatRoom, userName, msg }]);
      });

      conn.on("ReceiveSpecificMessage", (userName, msg) => {
        setMessages((messages) => [...messages, { chatRoom, userName, msg }]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", {
        Username: userName,
        ChatRoom: chatRoom,
      });
      setConnections([...connections, { chatRoom, conn }]);
    } catch (err) {
      console.log(err);
    }
  }

  async function sendMessage(msg: string) {
    try {
      msg.trim() && (await activeConnection?.conn.invoke("SendMessage", msg));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <UserNameModal
        setModalUserName={setModalUserName}
        modalUserName={modalUserName}
        userName={userName}
        setUserName={setUserName}
      />
      <ModalDeleteChat
        setActiveConnection={setActiveConnection}
        chatRoom={activeConnection?.chatRoom}
        openedDeleteChat={modalDeleteChat}
        setOpenedDeleteChat={setModalDeleteChat}
        removeChatRoom={removeRoom}
      />
      <Container
        size="md"
        p="md"
        style={{
          height: "100vh",
          border: "2px solid #5D5D5D",
          borderRadius: "5px",
          backgroundColor: "#F4F4F4",
        }}
      >
        <Grid columns={12}>
          <Grid.Col
            style={{ borderRight: "1px solid #5D5D5D", height: "98vh" }}
            span={4}
          >
            <ListContacts
              setModalDeleteChat={setModalDeleteChat}
              connections={connections}
              addChatRoom={addChatRoom}
              setActiveConnection={setActiveConnection}
            />
          </Grid.Col>
          <Grid.Col span={8}>
            {activeConnection && (
              <ChatRoom
                userNameChat={userName}
                activeConnection={activeConnection}
                messages={messages}
                sendMessage={sendMessage}
              />
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
