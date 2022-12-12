import styled from "styled-components/native";
import { RFValue, RFPercentage,} from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    width: 100%;
    height: 20%;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 40px;
`;
export const Title = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_100};
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${RFValue(22)}px;
    text-align: center;
    margin-top: 25px;
`;
export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;
export const NotFoundContainer = styled.View`
    height: ${RFPercentage(36)}px;
    justify-content: center;
    align-items: center;
`;
export const NotFoundDelivery = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.COLORS.GRAY_100};
`;