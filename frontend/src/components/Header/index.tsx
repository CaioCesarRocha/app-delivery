import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent, NewDeliveryButton } from "./styles";
import logo from '../../assets/logo_appdelivery.png';
import { NewDeliveryModal } from '../NewDeliveryModal';

//o modal teria um botao proprio, usando asChild tem apenas o botao passado evitando conflito entre os 2.
export function Header(){
    return ( 
        <HeaderContainer>
            <HeaderContent>
                <img  src={logo} alt =""/>
                <Dialog.Root>
                    <Dialog.Trigger asChild> 
                        <NewDeliveryButton>Nova entrega</NewDeliveryButton>
                    </Dialog.Trigger> 
                    <NewDeliveryModal/>
                    
                </Dialog.Root>              
            </HeaderContent>
        </HeaderContainer>    
    )
}