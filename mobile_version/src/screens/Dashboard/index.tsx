import { FlatList, Modal, Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Header } from "./components/Header/HeaderDashboard";
import { HighLightCards } from "./components/HighLightCards";
import { DeliveryCard } from "../../components/DeliveryCard";
import { Loading } from "../../components/Loading";
import { ShowDelivery } from "../ShowDelivery";
import { IDelivery } from "../../services/interfaces/deliveryInterfaces";
import { 
    Container,
    Deliverys,
    DeliverysHeader,
    Title,
    ContainerTypeListButton,
    TextTypeListButton,
    TextEmptyList
 } from "./styles"
import { useAuth } from "../../hooks/auth";
import { useDelivery } from "../../hooks/delivery";


export function Dashboard(){
    const [ dataDeliverys, setDataDeliverys] = useState<IDelivery[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [ typeList, setTypeList] = useState<'available'| 'deliveryman'>('available')
    const [showDeliveryModalOpen, setShowDeliveryModalOpen] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState({} as IDelivery);
    const {Logout, user } = useAuth();

    const {
        deliverys, 
        ListAllDeliverys,
        ListDeliverymanDeliverys, 
        CleanDeliverys
    } = useDelivery();

    useEffect(() =>{    
        setDataDeliverys(deliverys);
        setIsLoading(false);
    }, [deliverys]);

    async function loadDeliverys(){
        try{
            if(typeList === 'available')
                await ListAllDeliverys();
            else
                await ListDeliverymanDeliverys();
        }catch(error){
            console.log('error', error)
            Alert.alert('Não foi possível carregar as entregas')
        }      
    }

    useFocusEffect(useCallback(() =>{ //recarregar qdo navegar dps de um insert por exemplo.
        setIsLoading(true)
        loadDeliverys();
    }, [typeList]));

    async function handleLogout(){
        await Logout();
        await CleanDeliverys();
    }

    async function handleDeliverySelected(delivery: IDelivery){
        setSelectedDelivery(delivery)
        setShowDeliveryModalOpen(true)
    }

    async function handleCloseModal(){
        setShowDeliveryModalOpen(false)
    }

    return(
        <Container>      
            <Header/>
            {
                isLoading ? 
                    <Loading/> :
                    <>
                        <HighLightCards/>
                        <Deliverys>
                            <DeliverysHeader>
                                <Title>Listagem</Title>
                                {user.typeUser === 'deliveryman' &&
                                    <ContainerTypeListButton 
                                        onPress={() => setTypeList(
                                            typeList === 'available' ? 
                                            'deliveryman' : 'available'
                                    )}>
                                        <TextTypeListButton>
                                            {typeList === 'available' ? 
                                            'Minhas entregas': 'Entregas disponíveis'}
                                        </TextTypeListButton>
                                    </ContainerTypeListButton>
                                }                      
                            </DeliverysHeader>
                            <FlatList
                                data={dataDeliverys}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <DeliveryCard 
                                        data={item} 
                                        onPress={() =>handleDeliverySelected(item)}
                                    />
                                )}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingBottom: 10,
                                }}
                                ListEmptyComponent={() => (
                                    <TextEmptyList>
                                        Nenhuma entrega encontrada.
                                    </TextEmptyList>
                                )}
                            />               
                        </Deliverys>                
                    </>
            }
            <Modal visible={showDeliveryModalOpen}>
                <ShowDelivery
                    deliverySelected={selectedDelivery}
                    closeModalDelivery={() => handleCloseModal()}
                />
            </Modal>           
        </Container>
    )
}