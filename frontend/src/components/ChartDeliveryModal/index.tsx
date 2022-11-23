import { PieChart, Pie, Cell } from "recharts";
import { useCharts } from "../../hooks/useCharts";
import * as Dialog from '@radix-ui/react-dialog'
import { Overlay, Content, CloseButton, Title, ContentChart , OptionChart, BallChart, CollumnChart, 
  TitleInfo, ContentAverage} from './styles';
import { X } from 'phosphor-react';
import { priceFormatter } from "../../services/utils/formatter";


const COLORS = ["#55c7e0", "#0088FE", "#1d0366"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function ChartDeliveryModal() {
  const infoCharts = useCharts();
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>        
        <Title>Status das Entregas</Title>
        <ContentChart>
          <CollumnChart>
            <TitleInfo>Tipo</TitleInfo>
            <OptionChart>
              <BallChart variant="small"/>
              Pequenas
            </OptionChart>
            <OptionChart>
              <BallChart variant="medium"/>
              Médias
            </OptionChart>
            <OptionChart>
              <BallChart variant="large"/>
              Grandes
            </OptionChart>
          </CollumnChart>
          <CollumnChart>
            <TitleInfo>Quantidade</TitleInfo>
            <OptionChart>
              <BallChart variant="small"/>
              {infoCharts.data[0].value} entregas
            </OptionChart>
            <OptionChart>
              <BallChart variant="medium"/>
              {infoCharts.data[1].value} entregas
            </OptionChart>
            <OptionChart>
              <BallChart variant="large"/>
              {infoCharts.data[2].value} entregas
            </OptionChart>
          </CollumnChart>
          <PieChart width={200} height={200}>
            <Pie
              data={infoCharts.data}
              cx={100}
              cy={100}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {infoCharts.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ContentChart>
        <ContentAverage>
          <p> Média de Preços </p>
          {priceFormatter.format(infoCharts.average)}
        </ContentAverage>  
      </Content>
    </Dialog.Portal>      
  );
}
