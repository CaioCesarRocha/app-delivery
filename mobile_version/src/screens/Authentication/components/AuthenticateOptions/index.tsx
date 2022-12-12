import { 
    Container,
    SignInTitle, 
    SignInButtonInfo, 
    SignInButtonText
} from "./styles"

interface AuthenticateOptionsProps{
    title: string,
    info: string,
    onPress: () => void;
}

export function AuthenticateOptions({
    title,
    info,
    onPress
}: AuthenticateOptionsProps){
    return(
        <Container>
            <SignInTitle> 
                {title}
            </SignInTitle>
            <SignInButtonInfo onPress={onPress}>
                <SignInButtonText>
                    {info}
                </SignInButtonText>
            </SignInButtonInfo>
        </Container>
    )
}