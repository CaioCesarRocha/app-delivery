import styled, { css} from "styled-components/native";
import {RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
flex-direction: column;
`;

export const StatusTitle = styled.Text`
font-size: ${RFValue(18)}px;
font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
color: ${({theme}) => theme.COLORS.GRAY_100};
flex: 1;
justify-content: center;
align-items: center;
`;

interface StatusProps{
    status?: 'closed' | 'inprogress' | 'open'
}

export const Status = styled.Text<StatusProps>`
font-size: ${RFValue(25)}px;
font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
color: ${({theme}) => theme.COLORS.GRAY_200};
padding-left: 15px;

${(props) =>
    props.status === 'open' &&
    css`
    color: ${({theme}) => theme.COLORS.GREEN_500};
`}

${(props) =>
    props.status === 'closed' &&
    css`
    color: ${({theme}) => theme.COLORS.RED};
`}
`;