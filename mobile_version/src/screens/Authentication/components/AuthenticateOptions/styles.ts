import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
`

export const SignInTitle = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_300};
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${RFValue(17)}px;
    margin-top: 70px;
    margin-bottom: 15px;
`
export const SignInButtonInfo = styled(RectButton)`
    align-items: center;
`

export const SignInButtonText = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_200};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${RFValue(14)}px;
`