import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { CaretRight, CaretLeft } from "phosphor-react-native";

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)`
   
`;

export const Month = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.COLORS.GRAY_100};
`;

export const NextIcon = styled(CaretRight).attrs(({theme}) => ({
    color: theme.COLORS.GRAY_100,
}))`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${RFValue(26)}px;
`;

export const PreviusIcon = styled(CaretLeft).attrs(({theme}) => ({
    color: theme.COLORS.GRAY_100,
}))`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${RFValue(26)}px;
`;