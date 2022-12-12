import { UserTypeButton } from "../../../../components/Forms/UserTypeButton"
import { Container} from './styles'


interface UserTypeOptionsProps{
    userType: 'client' | 'deliveryman'
    setTypeClient: () => void;
    setTypeDeliveryman: () => void;
}

export function UserTypeOptions({
    userType,
    setTypeClient,
    setTypeDeliveryman
}:UserTypeOptionsProps){
    return(
        <Container>
            <UserTypeButton
                title='Cliente'
                type='client'
                onPress={setTypeClient}
                isActive={userType === 'client'}
            />
            <UserTypeButton
                title='Entregador'
                type='deliveryman'
                onPress={setTypeDeliveryman}
                isActive={userType === 'deliveryman'}
            />
        </Container>
    )
}