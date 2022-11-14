import {  useContext,useContextSelector } from 'use-context-selector'
import { DeliverysContext } from '../contexts/DeliveryContext'


const useDeliverys = () => useContext(DeliverysContext)

//USE CONTEXT SELECTOR PERMITE VC SELECIONAR OS CAMPOS QUE DEVEM SER OBSERVADOS
// ASSIM EM CASO DE MUDANÇAS NO CONTEXT SÓ VAI RENDERIZAR NOVAMENTE SE OS CAMPOS OBSERVADOS MUDAREM.
/*export const useDeliverys  = useContextSelector(DeliverysContext, (context) => {
    return context.deliverys
})*/

export default useDeliverys
