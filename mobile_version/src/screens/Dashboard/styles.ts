import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton} from 'react-native-gesture-handler';
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Power} from "phosphor-react-native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.WHITE};
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
`

export const Header = styled.View`
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

export const Deliverys = styled.View`
    padding: 0px 24px ;
    height: ${RFPercentage(42)}px;
    margin-top: ${RFPercentage(10)}px;
    margin-bottom: ${RFPercentage(3.3)}px;
`;

export const DeliverysHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`

export const Title = styled.Text`
    font-size: ${RFValue(23)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    color: ${({theme}) => theme.COLORS.GRAY_200};
`;

export const ContainerTypeListButton = styled(RectButton)`
    width: ${RFPercentage(20)}px;
    background-color: ${({theme}) => theme.COLORS.GRAY_600}; 
    padding: 14px 0px;
    border-radius: 5px;
    align-items: center;
`;

export const TextTypeListButton = styled.Text`
    color: ${({theme}) => theme.COLORS.WHITE};
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${RFValue(13)}px;   
`

export const TextEmptyList = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_600};
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${RFValue(18)}px;   
    margin-top: 50px;
    align-self: center;
`

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`