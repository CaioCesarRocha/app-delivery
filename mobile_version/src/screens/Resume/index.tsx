import { useTheme } from "styled-components/native";
import Victory from "../../services/utils/victory_native";
import { HistoryCard } from "../../components/HistoryCard";
import { useResume } from "../../hooks/resume";
import { priceFormatter } from "../../services/utils/formatter";

import { 
    Container,
    Header,
    Title,
    Content,
    ChartContainer
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

export function Resume(){
    const { COLORS } = useTheme();
    const resume = useResume();
    return(
        <Container>
             <Header>
                <Title>
                    Resumo das entregas
                </Title>   
            </Header>

            <Content>
                <ChartContainer>
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
                    color={COLORS.GREEN_300}
                    title={'Preço Médio '}
                    amount={priceFormatter.format(resume.average)}
                />
            </Content>
        </Container>
    )
}