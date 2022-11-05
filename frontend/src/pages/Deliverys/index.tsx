import { useNavigate } from 'react-router-dom';
import {CaretDoubleRight, CaretDoubleLeft} from "phosphor-react";
import useDeliverys from '../../hooks/useDeliverys';
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "../../components/SearchForm";
import { StatusDelivery, DeliveryContainer, DeliveryTable, TrSelectable, ButtonPage} from "./styles";
import { dateFormatter, priceFormatter } from '../../services/utils/formatter';
import { ForceAuthentication } from '../../components/ForceAuthentication';


export function Delivery(){
    const { deliverys, page, updatePage } = useDeliverys();
    const navigate = useNavigate();
    const numberMaxDelivery = 5;

    async function handleSelectedDelivery(id: string): Promise<void>{
        navigate(`/UpdateDelivery/${id}`)
    }

    async function handleLoadDeliverys(page: number):Promise<void> {
        await updatePage(page);
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
                { deliverys.length === numberMaxDelivery ?
                    <ButtonPage onClick={() => handleLoadDeliverys(5)} variant='right'>
                        <CaretDoubleRight size={35}/>
                    </ButtonPage>
                : 
                    null
                } 
                { page > 0 ?
                    <ButtonPage onClick={() => handleLoadDeliverys(-5)} variant='left'>
                        <CaretDoubleLeft size={35}/>
                    </ButtonPage>
                : 
                    null
                }   
            </DeliveryContainer>
        </ForceAuthentication>
    )
}