import { LoadContainer} from "./styles";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

export function Loading(){
    const { COLORS }= useTheme();

    return(
        <LoadContainer>
            <ActivityIndicator 
                color={COLORS.GRAY_100}
                size="large"
            />
        </LoadContainer>
    )
}