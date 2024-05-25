import { Avatar } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import ModalAddChatRoom from "./ModalAddChatRoom";
import { useState } from "react";
import { HubConnection } from "@microsoft/signalr";

function ListContacts({
  connections,
  addChatRoom,
  setActiveConnection,
  setModalDeleteChat,
}: {
  connections: { chatRoom: string; conn: HubConnection }[];
  addChatRoom: Function;
  setActiveConnection: Function;
  setModalDeleteChat: Function;
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ModalAddChatRoom
        openModal={openModal}
        setOpenModal={setOpenModal}
        addChatRoom={addChatRoom}
      />
      {connections.map((connection, key) => {
        return (
          <div
            onClick={() => setActiveConnection(connection)}
            key={"contact" + key}
            style={{
              backgroundColor: "#E3E3E3",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              border: "1.5px solid #E3E3E3",
              borderRadius: "4px",
              padding: "0 10px 0 10px",
              marginTop: "5px",
              gap: "15px",
            }}
          >
            <Avatar variant="filled" radius="xl" src="" />
            <p style={{ fontWeight: "600", fontSize: "16px" }}>
              {connection.chatRoom}
            </p>
          </div>
        );
      })}

      <div
        style={{
          marginTop: "15px",
          gap: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconPlus
          onClick={() => setOpenModal(true)}
          style={{
            padding: "8px",
            backgroundColor: "#799351",
            color: "white",
            height: "40px",
            width: "40px",
            borderRadius: "20px",
          }}
        />
        <IconTrash
          onClick={() => setModalDeleteChat(true)}
          style={{
            padding: "8px",
            backgroundColor: "#FF7878",
            color: "white",
            height: "40px",
            width: "40px",
            borderRadius: "20px",
          }}
        />
      </div>
    </>
  );
}

export default ListContacts;
