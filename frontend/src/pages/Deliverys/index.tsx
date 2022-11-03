import { useNavigate } from 'react-router-dom';
import useDeliverys from '../../hooks/useDeliverys';
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "../../components/SearchForm";
import { StatusDelivery, DeliveryContainer, DeliveryTable, TrSelectable, DivResponsive} from "./styles";
import { dateFormatter, priceFormatter } from '../../services/utils/formatter';
import { ForceAuthentication } from '../../components/ForceAuthentication';


export function Delivery(){
    const { deliverys, } = useDeliverys();
    const navigate = useNavigate();

    async function handleSelectedDelivery(id: string){
        navigate(`/UpdateDelivery/${id}`)
    }

    return (
        <ForceAuthentication>
            <Header/>
            <Summary/>
            <SearchForm/>  
            <DeliveryContainer>               
                <DeliveryTable>
                    <tbody>                      
                        { deliverys.map((delivery, index) => {
                            return(
                                <TrSelectable 
                                    key={index}
                                    onClick={() => handleSelectedDelivery(delivery.id)}
                                >                                
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
                                </TrSelectable>                        
                            )
                        })}
                        { deliverys.length === 0 ?
                            <tr> 
                                <td>Nenhuma entrega encontrada.</td> 
                            </tr>
                        : null
                        }                 
                    </tbody>
                </DeliveryTable>
            </DeliveryContainer>
        </ForceAuthentication>
    )
}