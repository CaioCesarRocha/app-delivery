import styled, { css } from "styled-components";

export const DeliveryContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;
`

export const DeliveryTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    td{
        padding: 1.25rem 2rem;
  

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

export const StatusDelivery = styled.span<StatusDeliveryProps>`
    ${props => props.variant === 'open' && css` color: ${props.theme['green-300']}; `}
    ${props => props.variant === 'inprogress' && css` color: ${props.theme['gray-300']}; `}
    ${props => props.variant === 'closed' && css` color: ${props.theme['red-300']}; `}
`

export const TrSelectable = styled.tr`
    cursor: pointer;
    background-color: ${props => props.theme['gray-700']};
   
    &:hover{
            background: ${props => props.theme['gray-600']};
        }
`


