import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducers";
import { Link } from "react-router-dom";
import { Button, NavBar } from "../styled";

const Menu = ({user}) => {
  const dispatch = useDispatch()

  const handleLogOut = async () => {
    dispatch(logoutUser(user))
  };

  return (
    <NavBar>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <p>{user.name} logged in</p>
        <Button
          onClick={() => {
            handleLogOut();
          }}
        >
          logout
        </Button>
      </div>
    </NavBar>
  )
}

export default Menu