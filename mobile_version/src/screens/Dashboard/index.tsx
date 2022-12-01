
import { FlatList } from "react-native";
import { HighLightCard } from "../../components/HighlightCard";
import { DeliveryCard, DeliveryCardProps } from "../../components/DeliveryCard";
import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Logo, 
    User,
    UserGreeting,
    UserName,
    Icon,
    HighLightCards,
    Deliverys,
    Title
 } from "./styles"
import logo_appdelivery from '../../../assets/logo_appdelivery.png';
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar, ArrowSquareOut} from 'phosphor-react-native'

export interface DataListProps extends DeliveryCardProps{
    id: string;
}

export function Dashboard(){
    const data: DataListProps[] = [
        {   
            id: '1',
            status: 'open',
            type: 'medium',
            title: 'Mesa de Cinuca',
            amount: 900,
            dateDelivery: '15/10/2022'           
        },
        {
            id: '2',
            status: 'closed',
            type: 'small',
            title: 'Documentos',
            amount: 20,
            dateDelivery: '16/10/2022'
        },
        {
            id: '3',
            status: 'closed',
            type: 'small',
            title: 'Documentos',
            amount: 20,
            dateDelivery: '16/10/2022'
        },
        {
            id: '4',
            status: 'closed',
            type: 'small',
            title: 'Documentos',
            amount: 20,
            dateDelivery: '16/10/2022'
        },
    ];

    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Logo source={logo_appdelivery}/>
                        <User>
                            <UserGreeting> Olá, </UserGreeting>
                            <UserName> Caioba</UserName>
                        </User>
                    </UserInfo>
                </UserWrapper>
                <Icon> <ArrowSquareOut color="#dd8c40" size={36}/></Icon>
            </Header>
            <HighLightCards>
                <HighLightCard
                    title="Em andamento"
                    icon={<ArrowCircleUp />}
                    type="inprogress"
                />
                <HighLightCard
                    title="Finalizadas"
                    icon={<ArrowCircleDown />}
                    type="closed"
                />
                <HighLightCard
                    title="Total"
                    icon={<CurrencyDollar  />}
                    type="total"
                />
            </HighLightCards>
            
            <Deliverys>
                <Title>Listagem</Title>
                <FlatList
                    data={data}
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
        </Container>
    )
}