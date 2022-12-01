import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { CaretLeft } from "phosphor-react-native";
import { DataListProps } from ".";
import { DeliveryCardProps } from "../../components/DeliveryCard";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.WHITE};
`

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    flex-direction: row;   
`;

export const UserWrapper = styled.View`
    width: 90%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${RFPercentage(10)}px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
`;

export const Logo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;
`;

export const UserGreeting = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_200};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
`;

export const UserName = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_100};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`;

export const Icon = styled.View`
    margin-top: ${RFPercentage(10)}px;
`

export const LogoutIcon = styled(CaretLeft).attrs(({theme}) => ({
    size: 32,
    color: theme.COLORS.WHITE
}))``;

export const HighLightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {paddingHorizontal: 24}
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export const Deliverys = styled.View`
    flex: 1%;
    padding: 0 24px;
    margin-top: ${RFPercentage(12)}px;
    margin-bottom: ${RFPercentage(4)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    margin-bottom: 16px;
`;
