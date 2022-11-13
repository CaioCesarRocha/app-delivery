import { useContext } from 'react'
import { DeliverysContext } from '../contexts/DeliveryContext'

const useDeliverys = () => useContext(DeliverysContext)

export default useDeliverys
