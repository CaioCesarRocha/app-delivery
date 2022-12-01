import { Input } from "../Input";
import { TextInputProps } from "react-native";
import { Control, Controller} from "react-hook-form";

import { Container, Error } from "./styles";

interface Props extends TextInputProps{
    control: Control<any, object>;
    name: "username" | "password";
    error?: any;
    typePassword?: boolean;
}

export function InputForm({
    control,
    name,
    error,
    typePassword,
    ...rest
}: Props){

    return(
        <Container>
            <Controller
                defaultValue={''}
                control={control}
                render={({field: {onChange, value,}}) =>(
                    <Input
                        secureTextEntry={typePassword}
                        onChangeText={onChange}
                        value={value as string}
                        {...rest}
                    />
                )}
                name={name}
            /> 
            {error && <Error> {error} </Error>}
        </Container>
    )
}