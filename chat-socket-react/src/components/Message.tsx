import { Badge } from "@mantine/core";

function Message({
  userName,
  userNameChat,
  msg,
  keyMessage,
}: {
  userName: string;
  userNameChat: string | null;
  msg: string;
  keyMessage: string;
}) {
  function getStyle() {
    switch (userName) {
      case userNameChat:
        return (
          <div
            key={"user" + keyMessage}
            style={{ textAlign: "right", margin: "5px 0 " }}
          >
            <Badge
              key={"usermessage" + keyMessage}
              color="gray"
              size="lg"
              radius="sm"
            >
              {msg}
            </Badge>
            <Badge
              key={"username" + keyMessage}
              style={{ marginLeft: "10px" }}
              color="green"
            >
              {userName}
            </Badge>
          </div>
        );
      case "admin":
        return (
          <div
            key={"admin" + keyMessage}
            style={{ textAlign: "center", margin: "5px 0 " }}
          >
            <p key={"adminmessage" + keyMessage}>{msg}</p>
          </div>
        );
      default:
        return (
          <div key={"other" + keyMessage} style={{ marginTop: "5px" }}>
            <Badge key={"othername" + keyMessage} color="yellow">
              {userName}
            </Badge>
            <Badge
              key={"othermessage" + keyMessage}
              style={{ margin: "5px 0", marginLeft: "10px" }}
              size="lg"
              radius="sm"
            >
              {msg}
            </Badge>
          </div>
        );
    }
  }
  return <>{getStyle()}</>;
}

export default Message;
