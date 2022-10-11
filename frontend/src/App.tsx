import { ThemeProvider } from "styled-components";
import { Delivery } from "./pages/Deliverys";
import { GlobalStyle } from "./styles/global";
import {defaultTheme} from './styles/themes/default';

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      
      <Delivery />
    </ThemeProvider>
  )
}

