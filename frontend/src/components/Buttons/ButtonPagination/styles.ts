import styled, { css } from "styled-components";

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
