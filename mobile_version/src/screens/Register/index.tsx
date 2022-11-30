import { useState } from "react";
import { InputForm } from "../../components/Forms/Input";
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



export function Register(){
    const [ userType, setUserType] = useState('')

    function handleUserTypeSelect(type: 'client' | 'deliveryman'){
        setUserType(type)
    }

    return(
        <Container>
            <Header>
                <Title>Cadastrar Entrega</Title>
            </Header>
            <Form>
                <Fields>
                    <InputForm
                        placeholder="Descrição"
                    />
                    <InputForm
                        placeholder="Tipo da Entrega"
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
                />        
            </Form>
        </Container>
    )
}