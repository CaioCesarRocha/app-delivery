import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useCharts } from "../../hooks/useCharts";
import * as Dialog from '@radix-ui/react-dialog'
import { Overlay, Content, CloseButton, Title, ContentChart , OptionChart, BallChart, CollumnChart} 
  from './styles';
import { X } from 'phosphor-react';

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const COLORS = ["#08f7cb", "#0088FE", "#1d0366"];

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
                    <OptionChart>
                      <BallChart variant="small"/>
                      Entregas pequenas
                    </OptionChart>
                    <OptionChart>
                      <BallChart variant="medium"/>
                      Entregas médias
                    </OptionChart>
                    <OptionChart>
                      <BallChart variant="large">aaaaaaaa</BallChart>
                      Entregas grandes
                    </OptionChart>
                  </CollumnChart>
                  <PieChart width={500} height={500}>
                      <Pie
                          data={infoCharts}
                          cx={200}
                          cy={200}
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                      >
                          {infoCharts.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                      </Pie>
                  </PieChart>
                </ContentChart>
                </Content>
        </Dialog.Portal>
        
    );
}
