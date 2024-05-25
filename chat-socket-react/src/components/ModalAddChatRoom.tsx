import { Center, Input, Modal } from "@mantine/core";
import { Button } from "@mantine/core";
import { useState } from "react";

function ModalAddChatRoom({
  openModal,
  setOpenModal,
  addChatRoom,
}: {
  openModal: boolean;
  setOpenModal: Function;
  addChatRoom: Function;
}) {
  const [chatRoom, setChatRoom] = useState("");
  return (
    <Modal
      opened={openModal}
      onClose={() => setOpenModal(false)}
      title="Adicionar sala de chat"
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Center>
        <Input
          onChange={(e) => setChatRoom(e.target.value)}
          placeholder="Nome sala"
        />
      </Center>
      <Center style={{ marginTop: "15px" }}>
        <Button
          onClick={() => addChatRoom(chatRoom.trim().toLowerCase())}
          variant="filled"
          color="blue"
        >
          Adicionar
        </Button>
      </Center>
    </Modal>
  );
}

export default ModalAddChatRoom;
