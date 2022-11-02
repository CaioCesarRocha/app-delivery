import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import {  z } from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate, useParams } from 'react-router-dom';
import { toast} from 'react-toastify';
import {DeliveryContainer, DeliveryContent, ContainerInput, ButtonForm} from './styles';
import Alert from '../../components/Alert';
import { IDelivery } from '../../services/utils/interfaces/delivery';
import useDeliverys from '../../hooks/useDeliverys';
import useAuth from '../../hooks/useAuth';
import { dateFormatter, priceFormatter, sizeFormatter } from '../../services/utils/formatter';
import { ArrowLeft } from 'phosphor-react';


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
        size_item: "small", status: 'open',   price: 0,            
        startPosition: [0, 0], endPosition: [0, 0],
        created_at: new Date(), end_at: new Date()
    })
    const params = useParams();
    const {getOneDelivery, deleteDelivery, updateDelivery} = useDeliverys();
    const { user } = useAuth()
    const navigate = useNavigate();

    useEffect(() =>{
        const id = params.id || '';
        async function getDelivery(){
            const dataDelivery = await getOneDelivery(id);
            if(dataDelivery.name_item.length === 0) { 
                toast.info('Produto não encontrado');
                await new Promise(resolve => setTimeout(resolve, 4000))// importante usar pra simular delay          
                navigate(-1);
            }          
            else setDelivery(dataDelivery);
        }
        getDelivery();
    }, [params.id])


    async function handleUpdateDelivery(data: UpdateDeliveryFormInputs){
        if(user?.typeUser === 'client') {
            if(delivery.status === 'inprogress') { 
                toast.info('Entrega já foi selecionada. Necessário ser finalizada pelo Entregador.');                
                return;
            }
            await deleteDelivery(delivery.id); 
            toast.success(`Produto excluído com sucesso!`);       
        }else{
            await updateDelivery(delivery.id, delivery); 
            toast.success(`Status da entrega alterado com sucesso!`);
        } 
        await new Promise(resolve => setTimeout(resolve, 4000))// importante usar pra simular delay
        navigate(-1);    
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
            <Alert theme='colored'/>         
            <i onClick={() => navigate(-1)}> <ArrowLeft/> </i> 

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
                        <ButtonForm type='submit' disabled={isSubmitting}> Excluir </ButtonForm>              
                    :   
                        null 
                    }
                    { user?.typeUser === 'deliveryman' && delivery.status === 'open' ?
                        <ButtonForm type='submit' disabled={isSubmitting} variant='green'> 
                            Selecionar 
                        </ButtonForm>              
                    :  
                        null 
                    }
                    { user?.typeUser === 'deliveryman' && delivery.status === 'inprogress' ?
                        <ButtonForm type='submit' disabled={isSubmitting} variant='green'> 
                            Encerrar 
                        </ButtonForm>
                    : 
                        null
                    }
                </form>
            </DeliveryContent>
        </DeliveryContainer>
    )
}