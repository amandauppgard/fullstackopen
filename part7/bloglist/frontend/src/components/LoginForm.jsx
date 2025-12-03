import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducers";
import Notification from "./Notification";
import { Button, Header, Input, LoginFormStyle, Title } from "../styled";

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
    <Header>
      <Title>Log in to application</Title>
    </Header>
    <Notification />
      <form onSubmit={handleLogIn}>
        <LoginFormStyle>
        <label>
          username:
          <Input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          password:
          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <Button type="submit">login</Button>
            </LoginFormStyle>

      </form>
    </>
  )
}

export default LoginForm