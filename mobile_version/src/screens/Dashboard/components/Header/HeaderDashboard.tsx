import { useAuth } from '../../../../hooks/auth';
import { useDelivery } from '../../../../hooks/delivery';
import logo_appdelivery from "../../../../../assets/logo_appdelivery.png";
import { 
    Container,
    UserWrapper,
    UserInfo,
    Logo, 
    User,
    UserGreeting,
    UserName,
    LogoutIcon,
    LogoutButton,
 } from "./styles"

export function Header(){
    const {Logout, user } = useAuth();
    const {CleanDeliverys} = useDelivery();

    async function handleLogout(){
        await Logout();
        await CleanDeliverys();
    }

    return(
        <Container>
             <UserWrapper>
                    <UserInfo>
                        <Logo source={logo_appdelivery}/>
                         <User>
                            <UserGreeting> Olá, </UserGreeting>
                             <UserName>{user.username} </UserName>
                        </User>
                    </UserInfo>
                </UserWrapper>
                <LogoutButton onPress={() => handleLogout()}>
                    <LogoutIcon />
                </LogoutButton>
        </Container>
    )
}