import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`

export const Title = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_100};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${RFValue(20)}px;
`

export const Form = styled.View`
    flex: 1;
    width: 100%;
    justify-content: space-between;
    padding: 24px;
`

export const Fields = styled.View`

`

export const UserTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px
`

