import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { BorderlessButton} from 'react-native-gesture-handler';
import { Power} from "phosphor-react-native";

export const Container = styled.View`
width: 100%;
height: ${RFPercentage(36)}px;
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

export const LogoutIcon = styled(Power).attrs(({theme}) => ({
size: 36,
color: theme.COLORS.RED
}))`
margin-top: ${RFPercentage(10)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;