import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import {format} from "date-fns";
import {ptBR} from 'date-fns/locale'
import Victory from "../../services/utils/victory_native";
import { HistoryCard } from "../../components/HistoryCard";
import { useResume } from "../../hooks/resume";
import { useDelivery } from "../../hooks/delivery";
import { priceFormatter } from "../../services/utils/formatter";
import { 
    Container,
    Header,
    LoadContainer,
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
                    <LoadContainer>
                        <ActivityIndicator 
                            color={COLORS.GRAY_100}
                            size="large"
                        />
                    </LoadContainer> :
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
                <HistoryCard
                    color={COLORS.GRAPH_SMALL}
                    title={'Pequenas'}
                    amount={resume.data[0].value}
                />
                <HistoryCard
                    color={COLORS.GRAPH_MEDIUM}
                    title={'Médias'}
                    amount={resume.data[1].value}
                />
                <HistoryCard
                    color={COLORS.GRAPH_LARGE}
                    title={'Grandes'}
                    amount={resume.data[2].value}
                />
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