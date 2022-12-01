import { useState } from "react";
import { useForm, Control, FieldValues } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import {
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'
import { InputForm } from "../../components/Forms/InputForm";
import { TextInput } from "react-native";
import { UserTypeButton } from "../../components/Forms/UserTypeButton";
import { ButtonForm } from "../../components/Forms/Button";
import { 
    Container,
    Header,
    Form,
    Title,
    Fields,
    UserTypes
 } from "./styles";


 const schema = Yup.object({
    username: Yup.string().required('Username é obrigatório'),
    password: Yup.string().required('Password é obrigatório')
 })

  interface FormData{
    [name: string]: any;
}

export function Register(){
    const [ userType, setUserType] = useState('')
    const [ newName, setNewName] = useState<string| undefined>(undefined)

    const {
        control,
        handleSubmit,
        formState: { errors}
    } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const formControl = control as unknown as Control<FieldValues, any>

    function handleUserTypeSelect(type: 'client' | 'deliveryman'){
        setUserType(type)
    }

    function handleRegister(form: FormData){
        if(!userType) {
            console.log('Error, selecione o tipo de usuário')
            return Alert.alert('Selecione o tipo de usuário');
        }          

        const data = {
            username: form.username,
            password: form.password,
            userType: userType
        }
        console.log('data', data)
    }

    return(
       // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastrar Entrega</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="username"
                            control={formControl}                     
                            placeholder="Usuário" 
                            error={errors.username && errors.username?.message}                    
                        />
                        <InputForm
                            name="password"
                            typePassword
                            control={formControl}                      
                            placeholder="Senha" 
                            error={errors.password && errors.password?.message}                     
                        />     
    
                        <UserTypes>
                            <UserTypeButton
                                title='Cliente'
                                type='client'
                                onPress={() => handleUserTypeSelect('client')}
                                isActive={userType === 'client'}
                            />
                            <UserTypeButton
                                title='Entregador'
                                type='deliveryman'
                                onPress={() => handleUserTypeSelect('deliveryman')}
                                isActive={userType === 'deliveryman'}
                            />
                        </UserTypes>
                    </Fields>
                    <ButtonForm
                        title={'Enviar'}
                        onPress={handleSubmit(handleRegister)}
                    />        
                </Form>           
            </Container>
        //</TouchableWithoutFeedback>
    )
}