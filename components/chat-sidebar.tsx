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

export const ChatSidebar = () => {
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value as RoomRadioInputType;
  };

  return (
    <aside>
      <div onChange={onChangeValue} className={`${chatStyles.asideHeader} subtitle`}>
        {RoomRadioInput("Connected", true)}
        {RoomRadioInput("All")}
      </div>
    </aside>
  );
};
