import { Modal, Button, Center, Title } from "@mantine/core";

function ModalDeleteChat({
  openedDeleteChat,
  chatRoom,
  setOpenedDeleteChat,
  removeChatRoom,
  setActiveConnection,
}: {
  chatRoom: string | undefined;
  openedDeleteChat: boolean;
  setOpenedDeleteChat: Function;
  removeChatRoom: Function;
  setActiveConnection: Function;
}) {
  return (
    <Modal
      opened={openedDeleteChat}
      onClose={() => setOpenedDeleteChat(false)}
      title="Deletar chat"
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Center>
        <Title style={{ margin: "25px 0" }} order={3}>
          Deseja deletar o chat {chatRoom} ?
        </Title>
      </Center>
      <Center>
        <Button
          style={{ marginRight: "40px" }}
          onClick={() => setOpenedDeleteChat(false)}
          variant="filled"
          color="red"
        >
          Não
        </Button>
        <Button
          onClick={() => {
            setOpenedDeleteChat(false);
            removeChatRoom(chatRoom);
            setActiveConnection(null);
          }}
          variant="filled"
          color="blue"
        >
          Sim
        </Button>
      </Center>
    </Modal>
  );
}

export default ModalDeleteChat;
