import styled from "styled-components/native";
import { CaretLeft } from "phosphor-react-native";

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    background-color: ${({theme}) => theme.COLORS.GRAY_600};
    color: ${({theme}) => theme.COLORS.GRAY_100};
    justify-content: center;
    align-items: center;

    h2{
        font-size: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    }
`

export const Logo = styled.Image`
    width: 46px;
    height: 55px;
`

export const BackButton = styled.TouchableOpacity`
    flex: 1;
`

export const BackIcon = styled(CaretLeft).attrs(({theme}) => ({
    size: 32,
    color: theme.COLORS.WHITE
}))``;