import styled from "styled-components";

export const DeliveryContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;
`

export const DeliveryContent = styled.div`
    min-width: 16rem;
    max-height: 80%;
    overflow: auto;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: ${props => props.theme['gray-700']}; 
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    h1{
        font-size: 25px;
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

    button[type="submit"]{
        height: 58px;
        border: 0;
        background: ${props => props.theme['green-500']};
        color: ${props => props.theme.white};
        font-weight: bold;
        padding: 0 1.25rem;
        border-radius: 6px;
        margin-top: 1.0rem;
        cursor: pointer;

        &:disabled{
            opacity: 0.7;
            cursor: not-allowed
        }

        &:not(:disabled):hover{
            background: ${props => props.theme['green-700']}; 
            transition: background-color 0.2s;
        }
    }
`

export const ContainerInput = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    

   i{
        padding-top: 12px;
    }
`