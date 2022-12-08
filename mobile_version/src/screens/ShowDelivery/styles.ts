import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme}) => theme.COLORS.GRAY_300};
`;

