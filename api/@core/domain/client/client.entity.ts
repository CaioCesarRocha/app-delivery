import crypto from 'crypto';

export type ClientProps={
    username: string;
    password: string;
}

export class Client {
    public readonly id: string;//criado id pra identificar o client, apenas para leitura, n deve ser alterado;
    public props: Required<ClientProps>

    private constructor(props: ClientProps, id?: string){
        this.id = id || crypto.randomUUID();

        this.props ={
            ...props
        }
    }

    static create(props: ClientProps, id?:string){
        return new Client(props, id)
    }

    updateUsername(username: string){
        this.props.username = username;
    }

    updatePassword(password: string){
        this.props.password = password;
    }

    private set username(value: string){
        this.props.username = value;
    }

    get username(){
        return this.props.username
    }

    private set password(value: string){
        this.props.password = value;
    }

    get password(){
        return this.props.password
    }

    toJSON(){
        return {
            id: this.id,
            ...this.props
        }
    }
}