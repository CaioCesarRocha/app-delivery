import {TouchableOpacityProps} from 'react-native'
import { 
    Container,
    UserIcon,
    DeliveryIcon,
    Title
 } from "./styles";


interface Props extends TouchableOpacityProps{
    title: string,
    type: 'client' | 'deliveryman';
    isActive: boolean
}

export function UserTypeButton({
    title,
    type,
    isActive,
    ...rest
}: Props){
    return(
        <Container 
            {...rest} 
            isActive={isActive}
            type={type}
        >
            {type === 'client' ? <UserIcon/> : <DeliveryIcon/>}
            <Title>
                {title}
            </Title>
        </Container>
    )
}