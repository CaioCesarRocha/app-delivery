import styled from "styled-components/native";
import {RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from "react-native-gesture-handler";
import { ArrowLeft, Bicycle, Truck, Jeep,} from 'phosphor-react-native'

export const Container = styled.View`
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
    justify-content: space-between;
    padding-bottom: 15px;
`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    height: ${RFPercentage(18)}px;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    padding: 20px;
    align-items: center;
`;

export const Title = styled.Text`
    flex: 1;
    font-size: ${RFValue(26)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme}) => theme.COLORS.GRAY_200};
    padding-left: 15px;
`;

export const Content = styled.View`
    height: ${RFPercentage(70)}px;
    align-items: center;
    justify-content: space-between;
    padding: 30px 20px;
`;

export const DeliveryName = styled.Text`
    font-size: ${RFValue(22)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    color: ${({theme}) => theme.COLORS.GRAY_100};
`;


export const ContainerStatus = styled.View`
    width: 100%;
    flex-direction: row;
    padding: 20px 30px;
    height: ${RFValue(80)}px;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    border-radius: 6px;
    align-items: center;
    justify-content: space-between;
`;


export const CloseModalButton = styled(BorderlessButton)``;

export const CloseIcon = styled(ArrowLeft).attrs(({theme}) => ({
    size: 36,
    color: theme.COLORS.GRAY_200
}))`
    padding-right: 15px;
`;

export const Footer = styled.View`
    width: 100%;
    height: ${RFPercentage(12)}px;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    justify-content: center;
    align-items: center;
`

export const SmallIcon = styled(Bicycle).attrs(({theme}) => ({
    size: 42,
    color: theme.COLORS.GRAY_200
}))``;

export const MediumIcon = styled(Jeep).attrs(({theme}) => ({
    size: 42,
    color: theme.COLORS.GRAY_200
}))``;

export const LargeIcon = styled(Truck).attrs(({theme}) => ({
    size: 42,
    color: theme.COLORS.GRAY_200
}))``;


