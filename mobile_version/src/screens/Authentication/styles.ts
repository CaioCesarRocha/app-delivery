import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
`;

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

