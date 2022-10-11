import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { StatusDelivery, TransactionContainer, TransactionTable } from "./styles";

export function Delivery(){
    return (
        <div>
            <Header/>
            <Summary/>

            <TransactionContainer>
                <SearchForm/>        
                <TransactionTable>
                    <tbody>
                        <tr>
                            <td width="50%"> Entrega Documentos</td>
                            <td> R$ 35,00 </td>
                            <td>
                                <StatusDelivery variant="inprogress">
                                    Em andamento... 
                                </StatusDelivery>
                            </td>  
                            <td> 10/10/2022 </td>
                        </tr>

                        <tr>
                            <td width="50%"> Mudança</td>
                            <td> R$ 250,00 </td>
                            <td>
                                <StatusDelivery variant="closed">
                                    Finalizada
                                </StatusDelivery> 
                            </td>                         
                            <td> 05/10/2022 </td>
                        </tr>

                        <tr>
                            <td width="50%"> Entrega lanche</td>
                            <td> R$ 11,00 </td>
                            <td>
                                <StatusDelivery variant="open">
                                    Aberta
                                </StatusDelivery>
                            </td>  
                            <td> 10/10/2022 </td>
                        </tr>
                    </tbody>
                </TransactionTable>
            </TransactionContainer>
        </div>
    )
}