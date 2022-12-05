import styled, { css } from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
`;

interface propsHeader{
    screen: 'login' | 'register'
}

export const Header = styled.View<propsHeader>`
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    width: 100%;
    height: 55%;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 40px;

    ${(props) =>
    props.screen === 'login' &&
    css`
      height: 55%;
    `}
`

export const TitleWrapper = styled.View`
    align-items: center;
`

export const Title = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_100};
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${RFValue(22)}px;
    text-align: center;
    margin-top: 25px;
`

export const Logo = styled.Image`
    width: 80px;
    height: 95px;
`

export const Form = styled.View`
    background-color: ${({theme}) => theme.COLORS.GRAY_600};
    flex: 1;
    width: 100%;
    justify-content: space-between;
    padding: 24px;
    
`

export const Fields = styled.View`
    margin-top: ${RFPercentage(-6)}px;
`

export const UserTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px
`

