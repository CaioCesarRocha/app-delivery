import styled from "styled-components";
import * as RadioGroup from '@radix-ui/react-radio-group';

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
export const DeliveryType = styled(RadioGroup.Root)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 0.5rem;
`

export const DeliveryTypeButton = styled(RadioGroup.Item)`
    background: ${props => props.theme['gray-900']};
    padding: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 12px;
    border-radius: 6px;
    border: 0;
    color: ${props => props.theme['gray-300']};

    svg {
        color: ${props => props.theme["gray-300"]}
    }

    &[data-state='unchecked']:hover{
        background-color: ${props => props.theme['gray-600']}; 
    }

    &[data-state='checked']{
        color: ${props => props.theme.white};
        background-color: ${props => props.theme['green-300']};
        svg {
            color: ${props => props.theme.white}
        }
    }
`
