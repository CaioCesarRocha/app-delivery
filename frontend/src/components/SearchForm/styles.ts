import styled from "styled-components";

export const SearchFormContainer = styled.main`
    display: flex;   
    gap: 1rem;
    width: 100%;

    input {
        flex: 1;
        border-radius: 6px;
        border: 0;
        background: ${props => props.theme['gray-900']};
        color: ${props => props.theme['gray-300']};
        padding: 1rem;

        &::placeholder{
            color: ${props => props.theme['gray-500']};
        }
    }
`

export const SearchFormContent = styled.form`  
    display: flex;
    gap: 1rem;
  
    button{
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border: 0;
        padding: 1rem;
        background: transparent;
        border: 1px solid ${props => props.theme['green-300']};
        color: ${props => props.theme['green-300']};
        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;

        &:disabled{
            opacity: 0.7;
            cursor: not-allowed
        }

        &:not(:disabled):hover{ //somente qdo nao tiver disabilitado
            background: ${props => props.theme['green-500']};
            border-color: 1px solid ${props => props.theme['green-500']};
            color: ${props => props.theme.white}; 
            transition: 
                background-color 0.2s, 
                color 0,2s, 
                border-color 0,2s ;
        }
    }
`

export const FilterDeliveryButton = styled.button`
     display: flex;
        align-items: center;
        gap: 0.75rem;
        border: 0;
        padding: 1rem;
        background: transparent;
        //border: 1px solid ${props => props.theme['green-300']};
        color: ${props => props.theme['red-300']};
        font-weight: bold;
        //border-radius: 6px;
        cursor: pointer;

        &:disabled{
            opacity: 0.7;
            cursor: not-allowed
        }

        &:not(:disabled):hover{ //somente qdo nao tiver disabilitado
            background: ${props => props.theme['green-500']};
            border-color: 1px solid ${props => props.theme['green-500']};
            color: ${props => props.theme.white}; 
            transition: 
                background-color 0.2s, 
                color 0,2s, 
        }
`