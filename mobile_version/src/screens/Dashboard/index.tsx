import { FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";
import { 
    ArrowCircleUp, 
    ArrowCircleDown,
    CurrencyDollar, 
} from 'phosphor-react-native'
import { HighLightCard } from "../../components/HighlightCard";
import { DeliveryCard } from "../../components/DeliveryCard";
import logo_appdelivery from '../../../assets/logo_appdelivery.png';
import { IDelivery } from "../../services/interfaces/deliveryInterfaces";
import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Logo, 
    User,
    UserGreeting,
    UserName,
    LogoutIcon,
    LogoutButton,
    HighLightCards,
    Deliverys,
    Title,
    LoadContainer
 } from "./styles"
import { useAuth } from "../../hooks/auth";
import { useDelivery } from "../../hooks/delivery";
import { useSummary } from "../../hooks/summary";


export function Dashboard(){
    const [ dataDeliverys, setDataDeliverys] = useState<IDelivery[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const {COLORS} = useTheme();
    const {Logout, user } = useAuth();
    const summary = useSummary()
    const {
        deliverys, 
        ListAllDeliverys, 
        CleanDeliverys
    } = useDelivery();

    useEffect(() =>{    
        setDataDeliverys(deliverys);
        setIsLoading(false);
    }, [deliverys]);

    async function loadDeliverys(){
        await ListAllDeliverys();
    }

    useEffect(() =>{
        loadDeliverys();
    }, [])

    useFocusEffect(useCallback(() =>{ //recarregar qdo navegar dps de um insert por exemplo.
        loadDeliverys();
    }, []));

    async function handleLogout(){
        await Logout();
        await CleanDeliverys();
    }

    return(
        <Container>
            {
                isLoading ? 
                    <LoadContainer>
                        <ActivityIndicator 
                            color={COLORS.GRAY_700}
                            size="large"
                        />
                    </LoadContainer> :
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Logo source={logo_appdelivery}/>
                                <User>
                                    <UserGreeting> Olá, </UserGreeting>
                                    <UserName>{user.username} </UserName>
                                </User>
                            </UserInfo>
                        </UserWrapper>
                        <LogoutButton onPress={handleLogout}>
                            <LogoutIcon />
                        </LogoutButton>
                    </Header>
                    <HighLightCards>
                        <HighLightCard
                            title="Em andamento"
                            icon={<ArrowCircleUp />}
                            status="inprogress"
                            amount={summary.inprogress}
                        />
                        <HighLightCard
                            title="Finalizadas"
                            icon={<ArrowCircleDown />}
                            status="closed"
                            amount={summary.closed}
                        />
                        <HighLightCard
                            title="Total"
                            icon={<CurrencyDollar  />}
                            status="total"
                            amount={summary.total}
                        />
                    </HighLightCards>           
                    <Deliverys>
                        <Title>Listagem</Title>
                        <FlatList
                            data={deliverys}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <DeliveryCard data={item} />
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: 10,
                            }}
                        />
                    </Deliverys>                
                </>
            }           
        </Container>
    )
}