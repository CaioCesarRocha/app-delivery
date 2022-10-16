import {useForm} from 'react-hook-form';
import { z } from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import { User, LockKey } from 'phosphor-react';
import { ContainerInput, DeliveryContainer, DeliveryContent } from "./styles";

const newFormDeliverySchema = z.object({
    username: z.string(),
    password: z.string(),
    //startPosition: z.number(),
    //endPosition: z.number()
});

type NewDeliveryFormInputs = z.infer<typeof newFormDeliverySchema>

export function Login(){

    const { 
        register,
        handleSubmit,
        formState: {isSubmitting} //informa estado do form, podendo ser usado pra desabilitar o botao
    } = useForm<NewDeliveryFormInputs>({
        resolver: zodResolver(newFormDeliverySchema)
    });

    async function handleLogin(data: NewDeliveryFormInputs){
        await new Promise(resolve => setTimeout(resolve, 2000))// importante usar pra simular delay
          
        console.log('data', data)
    }

    return(
        <DeliveryContainer>
            <DeliveryContent>
                <h1> Login </h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <ContainerInput>
                        <i><User size={25}/></i>
                        <input type="text" placeholder='Username' required {...register('username')}/>
                    </ContainerInput>
                    <ContainerInput>
                        <i><LockKey size={25}/></i>
                        <input type="password" placeholder='Password' required {...register('password')}/>
                        
                    </ContainerInput>
                        
                    <button type='submit' disabled={isSubmitting}>
                        Entrar
                    </button>
                </form>
            </DeliveryContent>
        </DeliveryContainer>
    )
}