import styled , {css} from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`

export const Title = styled(Dialog.Title)`
  font-size: 35px;

  @media (max-width: 481px) {
    font-size: 20px;
  }
`
export const Content = styled(Dialog.Content)`
  min-width: 35rem;
  max-height: 80%;
  overflow: auto;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 481px) {
    min-width: 20rem;
    padding: 2rem 1.1rem;
    justify-content: center;
    align-items: center;
  }
`

export const ContentChart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`
export const OptionChart = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  font-size: 16px;

  @media (max-width: 1200px) {
    font-size: 14px;
  }

  @media (max-width: 481px) {
    font-size: 10px;
    flex-direction: column;
  }
`

export const CollumnChart = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  font-size: 15px;
`

export const TitleInfo = styled.h2`
  font-size: 20px;
  text-align: center;
  @media (max-width: 481px) {
    font-size: 14px;
  }
`

interface ballChartProps {
  variant: 'small' | 'medium'|'large'
}

export const BallChart = styled.div<ballChartProps>`
  width: 30px;
  height: 10px;
  border-radius: 5px;
  margin-right: 5px;
  margin-top: 5px;

  @media (max-width: 481px) {
    width: 45px;
    height: 9px;
  }

  ${(props) => props.variant === 'small' && css` background-color: #08f7cb`};
  ${(props) => props.variant === 'medium' && css` background-color: #0088FE`};
  ${(props) => props.variant === 'large' && css` background-color: #1d0366`};
`;

export const ContentAverage = styled.div`
  display: flex;
  background-color: ${(props) => props.theme['gray-900']};
  padding: 0.5rem;
  border-radius: 5px;
  width: 50%;
  @media (max-width: 481px) {
    font-size: 12px;
  }

  p{
    color: ${(props) => props.theme['gray-400']};
    margin-right: 20px;
    font-weight: bold;
    @media (max-width: 481px) {
      font-size: 12px;
    }
  } 
`;


