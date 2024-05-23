import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Button, Center, Container, Grid, Input, Modal } from "@mantine/core";
import { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import ListContacts from "./components/ListContacts";

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
  const [messages, setMessages] = useState<{ userName: string; msg: string }[]>(
    []
  );

  async function addChatRoom(chatRoom: string) {
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
        setMessages((messages) => [...messages, { userName, msg }]);
      });

      conn.on("ReceiveSpecificMessage", (userName, msg) => {
        setMessages((messages) => [...messages, { userName, msg }]);
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
      console.log(activeConnection?.chatRoom);
      await activeConnection?.conn.invoke("SendMessage", msg);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <Modal
        opened={modalUserName || !userName}
        onClose={() =>
          userName ? setModalUserName(false) : setModalUserName(true)
        }
        title="Seu nome"
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Center>
          <Input
            onChange={(e) => setUserName(e.target.value.trim().toLowerCase())}
            placeholder="Digite seu nome"
          />
        </Center>
        <Center style={{ marginTop: "15px" }}>
          <Button
            onClick={() => setModalUserName(false)}
            variant="filled"
            color="grape"
          >
            Salvar
          </Button>
        </Center>
      </Modal>
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
              connections={connections}
              addChatRoom={addChatRoom}
              setActiveConnection={setActiveConnection}
            />
          </Grid.Col>
          <Grid.Col span={8}>
            {activeConnection && (
              <ChatRoom messages={messages} sendMessage={sendMessage} />
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
