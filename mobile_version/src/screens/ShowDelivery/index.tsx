import { ButtonForm } from '../../components/Forms/Button';
import { IDelivery } from '../../services/interfaces/deliveryInterfaces';
import {
    Container,
    Header,
    Title
} from './styles';


interface Props{
    deliverySelected: IDelivery
    closeModalDelivery: () => void;
}

export function ShowDelivery({
    deliverySelected,
    closeModalDelivery
}: Props){

    function handleStatusDelivery(){
        console.log('Entrega selecionada')
        closeModalDelivery()
    }

    return(
        <Container>
            <Header>
                <Title>
                    Entrega
                </Title>
            </Header>

            <Title>
                   {deliverySelected.name_item}
                </Title>
                <Title>
                    {deliverySelected.price}
                </Title>


            <ButtonForm
                title='Enviar'
                onPress={() => handleStatusDelivery()}
            />
        </Container>
    )
}