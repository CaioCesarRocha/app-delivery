import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { z } from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import {DeliveryContainer, DeliveryContent, ContainerInput, ButtonForm} from './styles';
import { IDelivery } from '../../services/utils/interfaces/delivery';
import useDeliverys from '../../hooks/useDeliverys';
import useAuth from '../../hooks/useAuth';
import { dateFormatter, priceFormatter, sizeFormatter } from '../../services/utils/formatter';


const UpdateFormDeliverySchema = z.object({
    name_item: z.string(),
    size_item: z.enum(['Pequena' , 'Média', 'Grande']),
    price: z.string(),
    created_at: z.string(),
});

type UpdateDeliveryFormInputs = z.infer<typeof UpdateFormDeliverySchema>

export function UpdateDelivery(){
    const [delivery, setDelivery] = useState<IDelivery>({   
        id: "", id_client: "", id_deliveryman: "", name_item: "",
        size_item: "small",           
        status: 'open' || 'inprogress' || 'closed',
        startPosition: [0, 0], endPosition: [0, 0],
        price: 0, created_at: new Date(), end_at: new Date()
    })
    const params = useParams();
    const {getOneDelivery, deleteDelivery, updateDelivery} = useDeliverys();
    const { user } = useAuth()

    useEffect(() =>{
        const id = params.id || '';
        async function getDelivery(){
            const dataDelivery = await getOneDelivery(id)
            setDelivery(dataDelivery);
        }
        getDelivery();
        console.log('delivery', delivery)
    }, [params.id])


    async function handleUpdateDelivery(data: UpdateDeliveryFormInputs){
        console.log('data', data)
        if(user?.typeUser === 'client') {
            await deleteDelivery(delivery.id);
            
        }

        await updateDelivery(delivery.id, delivery)
    }
 
    const { 
        register,       
        handleSubmit,
        formState: {isSubmitting} //informa estado do form, podendo ser usado pra desabilitar o botao
    } = useForm<UpdateDeliveryFormInputs>({
        resolver: zodResolver(UpdateFormDeliverySchema)
    });

    return(
        <DeliveryContainer>
            <DeliveryContent>
                <h1> Entrega </h1>
                <form onSubmit={handleSubmit(handleUpdateDelivery)}>
                    <ContainerInput> 
                        <p>Produto</p>             
                        <input 
                            type="text" required {...register('name_item')} readOnly
                            value={delivery.name_item}
                        />
                    </ContainerInput>
                    <ContainerInput>    
                        <p>Tamanho</p>          
                        <input 
                            type="text" required {...register('size_item')} readOnly
                            value={sizeFormatter(delivery.size_item)}
                        />
                    </ContainerInput>
                    <ContainerInput>  
                        <p>Preço</p>             
                        <input 
                            type="text" required {...register('price')} readOnly
                            value={priceFormatter.format(delivery.price)}
                        />
                    </ContainerInput>
                    <ContainerInput>
                        <p>Data de Criação</p>              
                        <input 
                            type="text" required {...register('created_at')} readOnly
                            value={dateFormatter.format(new Date(delivery.created_at))}
                        />
                    </ContainerInput>                    
                
                    { user?.typeUser === 'client' ?
                        <ButtonForm type='submit' disabled={isSubmitting}>
                            Excluir
                        </ButtonForm>              
                    :   
                        <ButtonForm type='submit' disabled={isSubmitting}>
                            Selecionar
                        </ButtonForm>   
                    }
                </form>
            </DeliveryContent>
        </DeliveryContainer>
    )
}