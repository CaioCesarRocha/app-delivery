import { ThemeProvider } from "styled-components";
import { DeliveryProvider } from "./contexts/DeliveryContext";
import { Delivery } from "./pages/Deliverys";
import { GlobalStyle } from "./styles/global";
import {defaultTheme} from './styles/themes/default';

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      
      <DeliveryProvider>
        <Delivery />
      </DeliveryProvider>   
    </ThemeProvider>
  )
}

