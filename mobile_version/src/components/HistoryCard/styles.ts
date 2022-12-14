import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

interface ContainerProps{
    color: string;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    background-color: ${({theme}) => theme.COLORS.GRAY_100};
    flex-direction: row;
    justify-content: space-between;
    padding: 13px 24px;
    border-radius:  5px;
    border-left-width: 7px;
    border-left-color: ${({color}) => color};
    margin-bottom: 8px;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${RFValue(15)}px;
`

export const Amount = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${RFValue(15)}px;
`