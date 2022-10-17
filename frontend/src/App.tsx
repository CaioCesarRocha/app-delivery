import { ThemeProvider } from "styled-components";
import { DeliveryProvider } from "./contexts/DeliveryContext";
import { UserProvider } from "./contexts/UserContext";
import AppRoutes from "./app.routes";
import { GlobalStyle } from "./styles/global";
import {defaultTheme} from './styles/themes/default';

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <UserProvider>
        <DeliveryProvider>
          <AppRoutes />
        </DeliveryProvider>
      </UserProvider>   
    </ThemeProvider>
  )
}

