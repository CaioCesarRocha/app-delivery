import styled, { css } from "styled-components";

export const DeliveryContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;

    i{
        font-size: 45px;
        cursor: pointer;
        float: right;
        &:hover{
            color: ${props => props.theme['gray-500']};
        }      
    }
`;


export const DeliveryContent = styled.div`
    min-width: 20rem;
    max-height: 80%;
    overflow: auto;
    border-radius: 6px;
    padding: 1.6rem 2.2rem;
    background: ${props => props.theme['gray-700']}; 
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    h1{
        font-size: 32px;
    }

    form{       
        margin-top: 2rem;
        display: flex;     
        flex-direction: column;
        gap: 1rem;   
    }

    input{
        width: 80%;
        border-radius: 6px;
        border: 0;
        background: ${props => props.theme['gray-900']};
        color: ${props => props.theme['gray-300']};
        padding: 1rem;
        
        &::placeholder{
            color: ${props => props.theme['gray-500']};  
        }
    }

    p{
        font-size: 12px;
        
        a{
            color: ${props => props.theme['green-300']};
            text-decoration: none;
            cursor: pointer;
            padding-left: 4px;

            &:hover{
                color: ${props => props.theme['green-500']};  
            }
        }
    }
`;

export const ContainerInput = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    vertical-align: baseline;
    text-align: center;
    
   p{   
        color: ${props => props.theme['gray-400']};
        width: 30%;
        padding-top: 10px;
        font-size: 18px;
    }
`;

interface ButtonFormProps {
    variant?: 'green' | 'red';
}

export const ButtonForm = styled.button<ButtonFormProps>`
    height: 40px;
    border: 0;
    background-color: ${props => props.theme['red-500']};
    color: ${props => props.theme.white};
    border-radius: 6px;
    cursor: pointer;

    ${props => props.variant === 'green' && css`
        background: ${props.theme['green-500']};
    `}

    &:hover{
        background: ${props => props.theme['red-700']};
        ${props => props.variant === 'green' && css`
            background: ${props.theme['green-700']};
        `}
    }
`

