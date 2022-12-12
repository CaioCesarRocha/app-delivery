import { useState } from "react";
import { useTheme } from "styled-components/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import {format} from "date-fns";
import {ptBR} from 'date-fns/locale'
import Victory from "../../services/utils/victory_native";
import { HistoryCard } from "../../components/HistoryCard";
import { Loading } from "../../components/Loading";
import { useResume } from "../../hooks/resume";
import { useDelivery } from "../../hooks/delivery";
import { priceFormatter } from "../../services/utils/formatter";
import { 
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    Month,
    NextIcon,
    PreviusIcon,
    NotFoundContainer,
    NotFoundDelivery,
} from "./styles";


export function Resume(){
    const [isLoading, setIsLoading] = useState(false);
    const { COLORS } = useTheme();
    const resume = useResume();
    const { ChangeDateFilter, dateFilter} = useDelivery();

    async function handleChangeDateFilter(action: 'next' | 'previus'){
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))  
        await ChangeDateFilter(action)
        setIsLoading(false)
    }

    return(
        <Container>
             <Header>
                <Title>
                    Resumo das entregas
                </Title>   
            </Header>
            {
                isLoading ? 
                    <Loading/> :
                    <Content
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingBottom: useBottomTabBarHeight(),
                        }}
                    >
                        <MonthSelect>
                            <MonthSelectButton onPress={() => handleChangeDateFilter('next')}>
                                <NextIcon/>
                            </MonthSelectButton>
                            <Month>
                                { format(dateFilter, 'MMM ,yyyy', {locale: ptBR})}
                            </Month>
                            <MonthSelectButton onPress={() => handleChangeDateFilter('previus')}>
                                <PreviusIcon/>
                            </MonthSelectButton>
                        </MonthSelect>
                        <ChartContainer>
                            { resume.totalPrices > 0 ?
                                <Victory.VictoryPie 
                                    data={resume.data}
                                    colorScale={resume.data.map( item => item.color)}
                                    style={{
                                        labels:{ 
                                            fontSize: RFValue(18),
                                            fontWeight: 'bold',
                                            fill: COLORS.WHITE
                                        }            
                                    }}
                                    labelRadius={50}
                                    x='percentage'
                                    y='value'
                                />
                            :   
                                <NotFoundContainer>
                                    <NotFoundDelivery>
                                        Nenhuma entrega encontrada neste mês.
                                    </NotFoundDelivery>
                                </NotFoundContainer>                  
                            }           
                        </ChartContainer>
                        {
                            resume.data.map( (resume, index) =>(
                                <HistoryCard
                                    key={index}
                                    color={resume.color}
                                    title={resume.title}
                                    amount={resume.value}
                                />                      
                            ))
                        }             
                        <HistoryCard
                            color={COLORS.GREEN_500}
                            title={'Preço Médio '}
                            amount={priceFormatter.format(resume.average)}
                        />
                    </Content>
            }
        </Container>
    )
}