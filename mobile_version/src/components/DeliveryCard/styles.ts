import styled, {css} from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { X, Bicycle, Truck, Jeep, CheckCircle } from 'phosphor-react-native'

export const Container = styled.View`
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
    border-radius: 5px;
    padding: 17px 24px; 
    margin-bottom: ${RFPercentage(1)}px;
`

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between
`;

export const HeaderPrimary = styled.View`
    
`

export const SmallIcon = styled(Bicycle).attrs(({theme}) => ({
    size: 36,
    color: theme.COLORS.GRAY_200
}))``;

export const MediumIcon = styled(Jeep).attrs(({theme}) => ({
    size: 36,
    color: theme.COLORS.GRAY_200
}))``;

export const LargeIcon = styled(Truck).attrs(({theme}) => ({
    size: 36,
    color: theme.COLORS.GRAY_200
}))``;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.COLORS.GRAY_200};
`;

export const Amount = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme}) => theme.COLORS.GRAY_200};
    margin-top: 2px;
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
`;

interface StatusProps{
    variant: 'inprogress' | 'closed' | 'open'
}

export const Status = styled.Text<StatusProps>`
    font-size: ${RFValue(14)}px;
    margin-left: 17px;
    color: ${({theme}) => theme.COLORS.GRAY_200};

    ${(props) =>
    props.variant === 'closed' &&
    css`
      color: ${({theme}) => theme.COLORS.RED};
    `}

    ${(props) =>
    props.variant === 'open' &&
    css`
      color: ${({theme}) => theme.COLORS.GREEN_500};
    `}
`;

export const DateDelivery = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.COLORS.GRAY_200};
`;
