import { useEffect } from "react";
import { IChatSidebar } from "../classes/interfaces/props";
import { SocketService } from "../classes/services/socket.service";
import chatStyles from "../styles/Chat.module.css";

type RoomRadioInputType = "Connected" | "All";

const RoomRadioInput = (value: RoomRadioInputType, checkByDefault = false) => {
  return (
    <p>
      <input type="radio" id={value} value={value} name="rooms" defaultChecked={checkByDefault} />
      <label htmlFor={value}>{value}</label>
    </p>
  );
};

export const ChatSidebar = ({ chatSocket, roomsId, setRoomsId, selectedRoom, setSelectedRoom }: IChatSidebar) => {
  const socketService = SocketService.getInstance();

  useEffect(() => {
    getMessages("Connected");
  }, []);

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value as RoomRadioInputType;
    getMessages(inputValue);
  };

  const getMessages = (radioType: RoomRadioInputType) => {
    chatSocket?.emit(`get${radioType}Rooms`, socketService.getSocketBody(), (rooms: string[]) => setRoomsId(rooms));
  };

  return (
    <aside>
      <div onChange={onChangeValue} className={`${chatStyles.asideHeader} subtitle`}>
        {RoomRadioInput("Connected", true)}
        {RoomRadioInput("All")}
      </div>

      <div className={chatStyles.asideMain}>
        {roomsId.map((room) => (
          <div className={`${chatStyles.room} ${selectedRoom === room ? chatStyles.selectedRoom : ""}`} key={room} onClick={() => setSelectedRoom(room)}>
            {room}
          </div>
        ))}
      </div>
    </aside>
  );
};
