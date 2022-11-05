import styled, { css } from "styled-components";

export const DeliveryContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 1rem auto 0;
    padding: 0 1.5rem;
    overflow-x: auto; 
`

export const DeliveryTable = styled.table`
    width: 100%;
    //width: 50px;
    border-collapse: separate;
    border-spacing: 0 0.5rem;

    td{
        padding: 1.25rem 2rem;
        min-width: 10px;

        &:first-child{
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child{
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
`

interface StatusDeliveryProps{
    variant?: 'open' | 'inprogress' | 'closed'
}

export const StatusDelivery: any = styled.span<StatusDeliveryProps>`
    ${props => props.variant === 'open' && css` color: ${props.theme['green-300']}; `}
    ${props => props.variant === 'inprogress' && css` color: ${props.theme['gray-300']}; `}
    ${props => props.variant === 'closed' && css` color: ${props.theme['red-300']}; `}
`

export const TrSelectable = styled.tr`  
    margin-top: 5px;
    cursor: pointer;
    border-radius: 6px;
      
    background-color: ${props => props.theme['gray-700']};
   
    &:hover{
        background: ${props => props.theme['gray-600']};
    }
`

interface ButtonPageProps{
    variant: 'right' | 'left'
}

export const ButtonPage = styled.button<ButtonPageProps>`
    color: ${props => props.theme['gray-500']};
   float: ${props => props.variant};
   
   &:hover{
       color: ${props => props.theme['gray-300']};
   }
`



