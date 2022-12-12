import { Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { useDelivery } from '../../hooks/delivery';
import { ButtonForm } from '../../components/Forms/Button';
import { ContentStatus } from '../../components/ContentStatus';
import { Loading } from '../../components/Loading';
import { IDelivery } from '../../services/interfaces/deliveryInterfaces';
import { 
    priceFormatter, 
    statusFormatter, 
    dateFormatter, 
    IconSizeFormatter 
} from '../../services/utils/formatter';
import {
    Container,
    Header,
    Title,
    CloseModalButton,
    CloseIcon,
    Content,
    DeliveryName,
    ContainerStatus,
    Footer,
} from './styles';


interface Props{
    deliverySelected: IDelivery
    closeModalDelivery: () => void;
}

export function ShowDelivery({
    deliverySelected,
    closeModalDelivery
}: Props){
    const [updateDeliveryAction, setUpdateDeliveryAction] = useState<'select'|'finish'>('select');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const { UpdateDelivery} = useDelivery();

    useEffect(() =>{
        if(deliverySelected.status === 'open')
            setUpdateDeliveryAction('select')
        else
            setUpdateDeliveryAction('finish')
    }, [deliverySelected])

    async function handleStatusDelivery(){
        setIsLoading(true);
        const resultUpdate = await UpdateDelivery(
            deliverySelected.id,
            deliverySelected,
            updateDeliveryAction
        )
        if(!resultUpdate){
            Alert.alert('Não foi possível concluir a operação');
            console.log('error ao concluir operação');
            return;
        }  
        if(updateDeliveryAction === 'select')
            Alert.alert('Entrega Selecionada com sucesso');
        else
            Alert.alert('Entrega Encerrada com sucesso'); 
        console.log('Status da entrega alterada');    
        setIsLoading(false);
        closeModalDelivery();   
    }

    return(
        <Container>
            <Header>              
                <Title>
                    Entregas
                </Title>  
                <CloseModalButton onPress={() => closeModalDelivery()}>
                    <CloseIcon/>
                </CloseModalButton>               
            </Header>
            <Content>
                {
                    isLoading ? 
                        <Loading/> :
                        <>
                            <DeliveryName>
                                {deliverySelected.name_item}
                            </DeliveryName>
                            <ContainerStatus>
                                <ContentStatus
                                    statusTitle="Status:"
                                    status={deliverySelected.status}
                                    statusContent={statusFormatter(deliverySelected.status)}
                                />
                                <ContentStatus
                                    statusTitle="Tipo:"
                                    statusContent={IconSizeFormatter(deliverySelected.size_item)}
                                />
                            </ContainerStatus>
                            <ContainerStatus>
                                <ContentStatus
                                    statusTitle="Data de Criação:"
                                    statusContent={dateFormatter.format(
                                        new Date(deliverySelected.created_at)
                                    )}
                                />
                            </ContainerStatus>
                            <ContainerStatus>
                                <ContentStatus
                                    statusTitle={user.typeUser === 'client' ? 'Preço:' : 'Lucro:'}
                                    status={user.typeUser === 'client' ? 'inprogress' : 'open'}
                                    statusContent={priceFormatter.format(deliverySelected.price)}
                                />
                            </ContainerStatus> 
                        </>                                 
                } 
            </Content> 
            <Footer>
                {deliverySelected.status === 'closed' ? null :
                    user.typeUser === 'deliveryman' &&
                        <ButtonForm
                            title={ deliverySelected.status === 'open' ? 'Selecionar':'Finalizar'}
                            onPress={() => handleStatusDelivery()}
                        />        
                } 
            </Footer>         
        </Container>
    )
}