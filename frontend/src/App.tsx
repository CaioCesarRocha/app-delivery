import { ThemeProvider } from 'styled-components'
import { DeliveryProvider } from './contexts/DeliveryContext'
import { UserProvider } from './contexts/UserContext'
import AppRoutes from './app.routes'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { ResetCSS } from './services/resetCSS'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <UserProvider>
        <DeliveryProvider>
          <ResetCSS />
          <AppRoutes />
        </DeliveryProvider>
      </UserProvider>
    </ThemeProvider>
  )
}
