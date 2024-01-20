import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../resources/blurry-gradient-haikei.png';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background: url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
`;

export default GlobalStyles;
