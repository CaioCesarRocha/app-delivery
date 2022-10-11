import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { Overlay, Content, CloseButton } from './styles';

export function NewDeliveryModal(){
    return(
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <Dialog.Title>Nova Entrega</Dialog.Title>

                <form action=''>
                    <input type="text" placeholder='descrição' required/>
                    <input type="text" placeholder='descrição' required/>
                    <input type="text" placeholder='descrição' required/>
                    <button type='submit'>
                        Cadastrar
                    </button>
                </form>                
            </Content>
        </Dialog.Portal> 
    )
}