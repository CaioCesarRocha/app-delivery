import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
   width: 100%
`

export const Error = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme}) => theme.COLORS.RED};
    margin-top: 2px;
    margin-bottom: 10px;
`

