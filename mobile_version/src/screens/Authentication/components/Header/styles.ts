import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    width: 100%;
    height: 55%;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 40px;
`

export const TitleWrapper = styled.View`
    align-items: center;
`

export const Title = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_100};
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${RFValue(22)}px;
    text-align: center;
    margin-top: 25px;
`

export const Logo = styled.Image`
    width: 80px;
    height: 95px;
`