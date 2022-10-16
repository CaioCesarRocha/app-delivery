import { useState, useEffect, useContext } from 'react';  
import { IDelivery, DeliverysContext } from '../../contexts/DeliveryContext';
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { StatusDelivery, DeliveryContainer, DeliveryTable} from "./styles";
import { dateFormatter, priceFormatter } from '../../services/utils/formatter';


export function Delivery(){
   // const [deliverys, setDeliverys] = useState<IDelivery[]>([]);

    const { deliverys} = useContext(DeliverysContext);

    return (
        <div>
            <Header/>
            <Summary/>

            <DeliveryContainer>
                <SearchForm/>        
                <DeliveryTable>
                    <tbody>
                        { deliverys.map((delivery, index) => {
                            return(
                                <tr key={index}>
                                    <td width="50%"> {delivery.name_item} </td>
                                    <td> {priceFormatter.format(delivery.price)} </td>
                                    <td>
                                        <StatusDelivery variant={delivery.status}>
                                            {delivery.status === 'open' ? 'Aberta...': null}
                                            {delivery.status === 'inprogress' ? 'Em andamento...': null}
                                            {delivery.status === 'closed' ? 'Encerrada...': null}
                                        </StatusDelivery>
                                    </td>  
                                    <td> {dateFormatter.format(new Date(delivery.created_at))} </td>
                                </tr>
                            )
                        })}                 
                    </tbody>
                </DeliveryTable>
            </DeliveryContainer>
        </div>
    )
}