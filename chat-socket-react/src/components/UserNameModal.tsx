import { Button, Modal, Center, Input } from "@mantine/core";

function UserNameModal({
  setUserName,
  modalUserName,
  userName,
  setModalUserName,
}: {
  setUserName: Function;
  modalUserName: boolean;
  userName: string | null;
  setModalUserName: Function;
}) {
  return (
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
          color="blue"
        >
          Salvar
        </Button>
      </Center>
    </Modal>
  );
}

export default UserNameModal;
