import { useState, useEffect, } from 'react';  
import { useNavigate } from 'react-router-dom';
import useDeliverys from '../../hooks/useDeliverys';
import useAuth from '../../hooks/useAuth';
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { StatusDelivery, DeliveryContainer, DeliveryTable} from "./styles";
import { dateFormatter, priceFormatter } from '../../services/utils/formatter';
import { ForceAuthentication } from '../../components/ForceAuthentication';

export function Delivery(){
   // const [deliverys, setDeliverys] = useState<IDelivery[]>([]);
    const { deliverys} = useDeliverys();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() =>{
        //if(user.username === '') navigate('/AuthenticateUser');
        console.log('user', user)
    }, [user]);

    return (
        <ForceAuthentication>
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
        </ForceAuthentication>
    )
}