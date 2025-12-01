import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducers";
import Notification from "./Notification";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const handleLogIn = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  };

  return (
    <>
      <h1>log in to application</h1>
      <Notification />
      <form onSubmit={handleLogIn}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm