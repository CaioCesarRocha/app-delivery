import { AuthenticateOptions } from "../AuthenticateOptions";
import logo_appdelivery from "../../../../../assets/logo_appdelivery.png";
import { 
    Container,
    TitleWrapper,
    Title,
    Logo,
} from "./styles";

interface HeaderProps{
    screen: 'login' | 'register';
    setScreenRegister: () => void;
    setScreenLogin: () => void;
}

export function Header({
    screen,
    setScreenRegister,
    setScreenLogin
}: HeaderProps){
    
    return(
        <Container>
            <TitleWrapper>
                <Logo source={logo_appdelivery}/>
                <Title>
                    Controle suas {'\n'}
                    entregas de forma {'\n'}
                    muito mais simples {'\n'}
                </Title>
            </TitleWrapper> 
            { screen === 'login' ? 
                <AuthenticateOptions 
                    title="Faça seu login abaixo"
                    info="Ainda não cadastrou? Aqui."
                    onPress={setScreenRegister}
                />
            :
                <AuthenticateOptions 
                    title="Registre sua conta abaixo"
                    info="Fazer login."
                    onPress={setScreenLogin}
                />
            }         
        </Container>
    )
}