import { useEffect } from "react";
import Blog from "./components/Blog";
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducers";
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom'
import { initializeUsers } from "./reducers/usersReducer";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import Menu from "./components/Menu";
import { Content, Header, Title } from "./styled";

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch]);

  if (!user) {
    return <LoginForm />
  }

  return (
    <Router>
      <Header>
        <Title>Blogs</Title>
        <div>
          <Menu user={user} />
        </div>
      </Header>
      <Notification />
      <Content>
        <Routes>
          <Route path='/' element={<Blogs blogs={blogs} user={user} />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/blogs/:id' element={<Blog />} />
        </Routes>
      </Content>
    </Router>
  );
};

export default App;
