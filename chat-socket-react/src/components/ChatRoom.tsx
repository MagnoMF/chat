import { Title } from "@mantine/core";

export default function ChatRoom({
  messages,
}: {
  messages: { userName: string; msg: string }[];
}) {
  return (
    <>
      <Title>ChatRoom</Title>
      {messages.map(({ userName, msg }, i) => {
        return <p key={i}> {`${userName} > ${msg}`}</p>;
      })}
    </>
  );
}
