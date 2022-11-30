import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.COLORS.GRAY_600};
`

export const LoadIndicator = styled.Text`
    font-size:  ${({theme}) => theme.FONT_SIZE.XL};
    color:  ${({theme}) => theme.COLORS.GRAY_300};
`