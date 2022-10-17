import { useState } from 'react';
import {useForm} from 'react-hook-form';
import { z } from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import { User, LockKey } from 'phosphor-react';
import { ContainerInput, DeliveryContainer, DeliveryContent } from "./styles";

const newFormDeliverySchema = z.object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string()
    //startPosition: z.number(),
    //endPosition: z.number()
});

type NewDeliveryFormInputs = z.infer<typeof newFormDeliverySchema>

export function Login(){
    const [screen, setScreen] = useState<'Login'|'Register'>('Login');

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
                <h1> {screen === 'Login' ? 'Login' : 'Cadastrar Usuário'}</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <ContainerInput>
                        <i><User size={25}/></i>
                        <input type="p" placeholder='Nome do usuário' required {...register('username')}/>
                    </ContainerInput>
                    <ContainerInput>
                        <i><LockKey size={25}/></i>
                        <input type="password" placeholder='Senha' required {...register('password')}/>                       
                    </ContainerInput>
                    {screen === 'Login' ? null :
                        <ContainerInput>
                            <i><LockKey size={25}/></i>                            
                            <input 
                                type="password" 
                                placeholder='Confirme a Senha' 
                                required {...register('confirmPassword')}
                            />    
                        </ContainerInput>
                    }
                    {screen === 'Login' ?
                        <p> 
                            Ainda não possui Conta? 
                            <a href='#/' onClick={() => {setScreen('Register')}}> Cadastrar aqui. </a> 
                        </p>
                    :
                        <p> 
                            Já possui Conta? 
                            <a href='#/' onClick={() => {setScreen('Login')}}> Fazer login. </a> 
                        </p>
                    }
                        
                    <button type='submit' disabled={isSubmitting}>
                        {screen === 'Login' ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>
            </DeliveryContent>
        </DeliveryContainer>
    )
}