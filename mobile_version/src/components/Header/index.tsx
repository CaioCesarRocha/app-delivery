import { Container, Logo, BackButton, BackIcon } from "./styles";
import logo_appdelivery from '../../../assets/logo_appdelivery.png'

interface propsHeader{
    title: string;
    showBackButton?: boolean;
}

export function Header({title, showBackButton=false}: propsHeader) {
    return(
        <Container>
            { showBackButton &&
                <BackButton>
                    <BackIcon/>
                </BackButton>
            }          
            <Logo source={logo_appdelivery}/>
            <h2> {title}</h2>
        </Container>
    )
}