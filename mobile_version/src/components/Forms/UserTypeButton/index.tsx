import { RectButtonProps} from 'react-native-gesture-handler'
import { 
    Container,
    Button,
    UserIcon,
    DeliveryIcon,
    Title,
    
 } from "./styles";


interface Props extends RectButtonProps{
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
            isActive={isActive}
            type={type}
        >
            <Button  
                {...rest} 
            >
                {type === 'client' ? <UserIcon/> : <DeliveryIcon/>}
                <Title>
                    {title}
                </Title>
            </Button>
        </Container>
    )
}