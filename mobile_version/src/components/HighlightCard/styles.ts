import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar} from 'phosphor-react-native';

interface ContainerProps{
    status: 'inprogress' | 'closed' | 'total'
}

export const Container = styled.View<ContainerProps>`
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    width: ${RFValue(260)}px;
    border-radius: 5px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: 16px;

    ${(props) =>
    props.status === 'total' &&
    css`
      background-color: ${({theme}) => theme.COLORS.GREEN_700};
    `}
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

interface TitleProps{
    status: 'inprogress' | 'closed' | 'total'
}

export const Title = styled.Text<TitleProps>`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.COLORS.GRAY_200};

    ${(props) =>
    props.status === 'inprogress' &&
    css`
      color: ${({theme}) => theme.COLORS.GREEN_500};
    `}

    ${(props) =>
    props.status === 'closed' &&
    css`
      color: ${({theme}) => theme.COLORS.RED};
    `}
`;

export const InprogressIcon = styled(ArrowCircleUp).attrs(({theme}) => ({
    size: 40,
    color: theme.COLORS.GREEN_500
}))``;

export const ClosedIcon = styled(ArrowCircleDown).attrs(({theme}) => ({
    size: 40,
    color: theme.COLORS.RED
}))``;

export const TotalIcon = styled(CurrencyDollar).attrs(({theme}) => ({
    size: 40,
    color: theme.COLORS.WHITE
}))``;

export const Footer = styled.View`

`;

export const Amount = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${RFValue(32)}px;
    color: ${({theme}) => theme.COLORS.GRAY_200};
    margin-top: 38px;
`;

export const LastDelivery = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.COLORS.GRAY_100};
`;
