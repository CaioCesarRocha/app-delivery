import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Puff } from 'react-loader-spinner'

import useAuth from '../../hooks/useAuth'
import { Container, ContentLoading } from './styles'

export function ForceAuthentication(props: any) {
  const { loading, user } = useAuth()
  const navigate = useNavigate()
  const [renderContent, setRenderContent] = useState<boolean>(false)

  useEffect(() => {
    // se nao tiver carregando e usuário setado entao verifica autenticação
    if (!loading && user?.username) setRenderContent(true)
    // se tiver só carregando entao libera o gif Loading...
    else if (loading) setRenderContent(false)
    // Se nao tiver carregando e sem user setado então força autenticação
    else navigate('/authenticateUser')
  }, [loading, user, navigate])

  return (
    <Container>
      {renderContent ? (
        <>
          <script
            // id="handleLogin"
            // strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              // para rodar um html aqui
              __html: `
                                if(!document.cookie?.includes("app-delivery-cod3r-auth")){
                                    window.location.href = "/authenticateUser"
                                }
                            `,
            }}
          />
          {props.children}
        </>
      ) : (
        <ContentLoading>
          <Puff height="150" width="150" color="#f9fafc" />
        </ContentLoading>
      )}
    </Container>
  )
}
