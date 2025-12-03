import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body, html {
    background: Bisque;
    margin: 0;
    padding: 0;
    font-family: Alfa Slab One;
    font-size: 16px;
  }
`;

export const Title = styled.div`
  font-size: 3rem;
  align-self: center;
`

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid brown;
  border-radius: 10px;
  padding-inline: 10px;
  margin: 20px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-block: 10px;
  gap: 5px;
  border: 2px solid brown;
  border-radius: 10px;
  padding-inline: 10px;
  margin: 20px;
  align-items: start;
`

export const LoginFormStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
`

export const Button = styled.button`
  justify-content: center;
  cursor: pointer;
  border: 2px solid brown;
  border-radius: 5px;
  padding-block: 3px;
  padding-inline: 7px;
  background: Tan;
  font-family: Alfa Slab One;
  &:hover {
    background: brown;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const BlogList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 5px;
  margin-block: 10px;
`

export const BlogItem = styled.div`
  border: 2px solid brown;
  padding-inline: 10px;
  padding-block: 5px;
  border-radius: 5px;
`

export const BlogForm = styled.div`
  display: flex;
  gap: 5px;
`

export const Input = styled.input`
  background: OldLace;
  border: 1px solid brown;
  border-radius: 3px;
  outline: none;
  padding: 3px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    border-color: brown;
    box-shadow: none;
  }
`;

export const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SuccessNotification = styled.div`
  background: DarkOliveGreen;
  border-radius: 5px;
  padding-block: 10px;
  padding-inline: 20px;
`

export const ErrorNotification = styled.div`
  background: FireBrick;
  border-radius: 5px;
  padding-block: 10px;
  padding-inline: 20px;
`