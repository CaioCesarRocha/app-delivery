import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent, NewDeliveryButton, LogoutButton, SecundaryHeaderContent } from "./styles";
import logo from '../../assets/logo_appdelivery.png';
import { NewDeliveryModal } from '../NewDeliveryModal';
import { } from 'phosphor-react';
import useAuth from '../../hooks/useAuth';


//o modal teria um botao proprio, usando asChild tem apenas o botao passado evitando conflito entre os 2.
export function Header(){
    const { user, logout} = useAuth();

    async function handleListMyDeliverys(){

    }

    async function handleLogout(){
        await logout();
    }

    return ( 
        <HeaderContainer>
            <HeaderContent>
                <img  src={logo} alt =""/>
               
                { user.typeUser === 'client' ? 
                    <Dialog.Root>
                        <Dialog.Trigger asChild> 
                            <NewDeliveryButton>Nova entrega</NewDeliveryButton>                 
                        </Dialog.Trigger> 
                        <NewDeliveryModal/>              
                    </Dialog.Root>                           
                :
                    <NewDeliveryButton onClick={() => handleListMyDeliverys()}>
                        Minhas entregas
                    </NewDeliveryButton>
                }                           
            </HeaderContent>
            <SecundaryHeaderContent>
                <LogoutButton onClick={() => handleLogout()}>
                    Deslogar
                </LogoutButton>
            </SecundaryHeaderContent>
           
        </HeaderContainer>    
    )
}