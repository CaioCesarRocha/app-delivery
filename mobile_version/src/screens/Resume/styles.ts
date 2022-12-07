import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    width: 100%;
    height: 25%;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 40px;
`
export const Title = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_100};
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${RFValue(22)}px;
    text-align: center;
    margin-top: 25px;
`

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {flex: 1, padding: 24}
})``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`
