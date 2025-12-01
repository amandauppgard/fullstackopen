import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducers";
import { Link } from "react-router-dom";

const Menu = ({user}) => {
  const dispatch = useDispatch()

  const handleLogOut = async () => {
    dispatch(logoutUser(user))
  };

  return (
    <div>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      <div>
        <p>{user.name} logged in</p>
        <button
          onClick={() => {
            handleLogOut();
          }}
        >
          logout
        </button>
      </div>
    </div>
  )
}

export default Menu