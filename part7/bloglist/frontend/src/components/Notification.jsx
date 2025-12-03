import { useSelector } from "react-redux";
import { ErrorNotification, NotificationContainer, SuccessNotification } from "../styled";

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const type = useSelector(state => state.notification.type)

  if (!message) return null

  if (type === 'error') {
    return (
      <NotificationContainer>
        <ErrorNotification>
          {message}
        </ErrorNotification>
      </NotificationContainer>
    )
  }

  if (type === 'success') {
    return (
      <NotificationContainer>
        <SuccessNotification>
          {message}
        </SuccessNotification>
      </NotificationContainer>
    )
  }
  return <div className={`notification-${type}`}>{message}</div>;
};

export default Notification