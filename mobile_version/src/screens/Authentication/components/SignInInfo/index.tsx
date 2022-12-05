import { 
    Container,
    SignInTitle, 
    SignInButtonInfo, 
    SignInButtonText
} from "./styles"

interface SignInProps{
    title: string,
    info: string,
    onPress: () => void;
}

export function SignInInfo({
    title,
    info,
    onPress
}: SignInProps){
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