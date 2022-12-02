import { StatusBar} from "react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";
import {
  useFonts,
  Roboto_400Regular, 
  Roboto_500Medium, 
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/routes/app.routes";
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
          <NavigationContainer>
            <AppRoutes/>
          </NavigationContainer>        
        </>
      :       
        <Loading/>
      }     
    </ThemeProvider>
  );
}

