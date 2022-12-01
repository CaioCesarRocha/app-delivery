import styled from 'styled-components/native';
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from 'react-native';


export const Container = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({theme}) => theme.COLORS.GREEN_500}; 
    padding: 18px;
    border-radius: 5px;
    align-items: center;
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.COLORS.WHITE};
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${RFValue(14)}px;   
`
