import * as Dialog from '@radix-ui/react-dialog';
import {Controller, useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { X, Jeep, Bicycle, Truck, DotsThree, XCircle, PlusCircle, Calendar } from 'phosphor-react';
import { Overlay, Content, CloseButton, DeliveryType, DeliveryTypeButton } from './styles';

const filterDeliverySchema = z.object({
    filter: z.string(),
});

type filterDeliveryFormInputs = z.infer<typeof filterDeliverySchema>

export function FilterDeliveryModal(){
    const { 
        control, // qdo nao for html nativo(ex: input), precisa usar o control pra pegar os valores
        register,
        handleSubmit,
        formState: {isSubmitting} //informa estado do form, podendo ser usado pra desabilitar o botao
    } = useForm<filterDeliveryFormInputs>({
        resolver: zodResolver(filterDeliverySchema)
    });

    async function handleFilterDeliverys(data: filterDeliveryFormInputs){
        await new Promise(resolve => setTimeout(resolve, 2000))// importante usar pra simular delay
        
        console.log('data', data)
    }

    return(
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <Dialog.Title>Selecione um dos campos abaixo para filtro</Dialog.Title>
                <form onSubmit={handleSubmit(handleFilterDeliverys)}>
                    <Controller
                        control={control}
                        name="filter"
                        render={({field}) =>{
                            return(
                                <>
                                    <Dialog.DialogDescription>Tipo da entrega</Dialog.DialogDescription>
                                    <DeliveryType 
                                        numberOptions={3}
                                        onValueChange={field.onChange} 
                                        value={field.value}
                                    >
                                        <DeliveryTypeButton value="small">
                                            <Bicycle size={24}/> Pequena
                                        </DeliveryTypeButton>
                                        <DeliveryTypeButton value="medium">
                                            <Jeep size={24}/> Média
                                        </DeliveryTypeButton>
                                        <DeliveryTypeButton value="large">
                                            <Truck size={24}/> Grande
                                        </DeliveryTypeButton>
                                    </DeliveryType>
                                    <Dialog.DialogDescription>Status da entrega</Dialog.DialogDescription>
                                    <DeliveryType 
                                        numberOptions={3}
                                        onValueChange={field.onChange} 
                                        value={field.value}
                                    >                      
                                        <DeliveryTypeButton value="open">
                                            <PlusCircle size={24}/> Disponível
                                        </DeliveryTypeButton>
                                        <DeliveryTypeButton value="inprogress">
                                            <DotsThree size={24}/> Em andamento
                                        </DeliveryTypeButton>
                                        <DeliveryTypeButton value="closed">
                                            <XCircle size={24}/> Fechada
                                        </DeliveryTypeButton>
                                    </DeliveryType>
                                    <Dialog.DialogDescription>Calendário</Dialog.DialogDescription>
                                    <DeliveryType 
                                        numberOptions={1}
                                        onValueChange={field.onChange} 
                                        value={field.value}
                                    >                                   
                                        <DeliveryTypeButton value="date">
                                                <Calendar size={26}/> Data atual
                                        </DeliveryTypeButton> 
                                    </DeliveryType>                     
                                </>
                            )
                        }}                 
                    /> 
                    <button type='submit' disabled={isSubmitting}>
                        Buscar
                    </button>     
                </form>
            </Content>
        </Dialog.Portal>
    )
}