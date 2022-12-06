import { StatusBar} from "react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";
import {
  useFonts,
  Roboto_400Regular, 
  Roboto_500Medium, 
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/hooks/auth";
import { DeliveryProvider } from "./src/hooks/delivery";
import { Loading } from "./src/components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({ 
    Roboto_400Regular, 
    Roboto_500Medium, 
    Roboto_700Bold
  })

  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? 
        <>
          <StatusBar 
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <AuthProvider>
            <DeliveryProvider>
              <Routes/>
            </DeliveryProvider>
          </AuthProvider>     
        </>
      :       
        <Loading/>
      }     
    </ThemeProvider>
  );
}

