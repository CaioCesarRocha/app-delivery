import styled, {css} from "styled-components/native";
import { UserCircle, Truck, AlignRight } from "phosphor-react-native";
import { RFValue } from "react-native-responsive-fontsize";


interface ContainerProps{
    type: 'client' | 'deliveryman'
    isActive: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    width: 48%;    
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-width:  ${(props) => props.isActive ? 0 : 1.5};
    border-style: solid;
    border-color: ${({theme}) => theme.COLORS.GRAY_100};
    border-radius: 5px;
    padding: 16px;

    ${(props) =>
    props.isActive && props.type === 'client' &&
    css`
      background-color: ${({theme}) => theme.COLORS.GREEN_700};
    `}

    ${(props) =>
    props.isActive && props.type === 'deliveryman' &&
    css`
      background-color: ${({theme}) => theme.COLORS.GREEN_700};
    `}
`;

export const UserIcon = styled(UserCircle).attrs(({theme}) => ({
    size: 32,
    color: theme.COLORS.WHITE,  
}))`
    margin-right: 12
`;


export const DeliveryIcon = styled(Truck).attrs(({theme}) => ({
    size: 32,
    color: theme.COLORS.WHITE
}))`
    margin-right: 12
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme}) => theme.COLORS.GRAY_100};
`