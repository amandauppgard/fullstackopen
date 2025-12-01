import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const type = useSelector(state => state.notification.type)

  if (!message) return null
  return <div className={`notification-${type}`}>{message}</div>;
};

export default Notification