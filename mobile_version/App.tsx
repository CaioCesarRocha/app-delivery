import { StatusBar} from "react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";
import {
  useFonts,
  Roboto_400Regular, 
  Roboto_500Medium, 
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { Home } from "./src/screens/Home";
import { Loading } from "./src/components/Loading";
import { Dashboard } from "./src/screens/Dashboard";
import { Register } from "./src/screens/Register";

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
          <Register/>
        </>
      :       
        <Loading/>
      }     
    </ThemeProvider>
  );
}

