import {  ReactNode, useState, useEffect, useCallback} from 'react';
import { createContext } from 'use-context-selector';
import useAuth from '../hooks/useAuth'
import { IError } from '../services/utils/interfaces/error_interface'
import api from '../services/connection/api'
import {IInputCreateDelivery, IDelivery } from '../services/utils/interfaces/delivery';

interface DeliveryContextType {
  allDeliverys: IDelivery[]
  cleanDeliverys: () => Promise<void>
  createDelivery: (data: IInputCreateDelivery, token: string) => Promise<boolean>
  deleteDelivery: (id: string) => Promise<boolean>
  deliverys: IDelivery[]
  error: IError
  filterDeliverys: (filter: string) => Promise<boolean>
  handlePagination: (
    numberPage: number,
    type: 'client' | 'deliveryman',
  ) => Promise<void>
  getDeliverymanDeliverys: () => Promise<void>
  getOneDelivery: (id: string) => Promise<IDelivery>
  page: number
  searchDeliverys: (search: string) => Promise<boolean>
  updateDelivery: (id: string, delivery: IDelivery) => Promise<boolean>
}

interface DeliveryProviderProps {
  children: ReactNode
}

export const DeliverysContext = createContext({} as DeliveryContextType)

export function DeliveryProvider({ children }: DeliveryProviderProps) {
  const [deliverys, setDeliverys] = useState<IDelivery[]>([])
  const [allDeliverys, setAllDeliverys] = useState<IDelivery[]>([])
  //const [ ,setAvailableDeliverys] = useState<IDelivery[]>([])
  const [emptyDelivery, ] = useState<IDelivery>({} as IDelivery)
  const [deliverymanDeliverys, setDeliverymanDeliverys] = useState<boolean>(false)
  const [error, setError] = useState<IError>({ msg: '', active: false })
  const [page, setPage] = useState<number>(0)
  const { user } = useAuth()
  const url_localhost = 'http://localhost:3000/delivery'
  const maxNumberPerPage = 5

  function setBearerToken(token?: string) {
    if(token){
      const config = {
        headers: { Authorization: 'Bearer ' + token },
      }
      return config
    }
    const config = {
      headers: { Authorization: 'Bearer ' + user?.token },
    }
    return config
  }

  async function getOneDelivery(id: string): Promise<IDelivery> {
    try {
      const delivery = await api.get(`${url_localhost}/${id}`)
      return delivery.data;
    } catch (err) {
      if (err instanceof Error) setError({ msg: err.message, active: true })
      return emptyDelivery
    }
  }

  async function getDeliverymanDeliverys() {
    setDeliverymanDeliverys(true)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // importante usar pra simular delay
    try {
      const config = setBearerToken()
      const deliverys = await api.get(`${url_localhost}/deliveryman`, config)
      setAllDeliverys(deliverys.data)
      const showDeliverys: IDelivery[] = deliverys.data.slice(
        0,
        maxNumberPerPage,
      )
      setDeliverys(showDeliverys)
    } catch (err) {
      if (err instanceof Error) setError({ msg: err.message, active: true })
    }
  }

  async function searchDeliverys(search: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    try {
      const config = setBearerToken()
      const deliverysSearched = await api.get(
        `${url_localhost}/search/${search}`,
        config,
      )
      setDeliverys(deliverysSearched.data.filter((delivery: IDelivery) => 
        delivery.id_client === user.id || 
        delivery.id_deliveryman === user.id
      ))
      return true
    } catch (err) {
      if (err instanceof Error) setError({ msg: err.message, active: true })
      return false
    }
  }

  async function filterDeliverys(filter: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    try {
      const config = setBearerToken()
      const deliverysFiltered = await api.get(
        `${url_localhost}/filter/${filter}`,
        config,
      )
      setDeliverys(deliverysFiltered.data.filter((delivery: IDelivery) => 
        delivery.id_client === user.id || 
        delivery.id_deliveryman === user.id
      ))
      return true
    } catch (err) {
      if (err instanceof Error) setError({ msg: err.message, active: true })
      return false
    }
  }

  const createDelivery = useCallback(
    async(data: IInputCreateDelivery, token: string): Promise<boolean> =>{
      await new Promise((resolve) => setTimeout(resolve, 2000)) // importante usar pra simular delay
      const { name_item, size_item, startPosition, endPosition } = data;
      const config = setBearerToken(token);
      console.log('config', config)
      try {
        const createdDelivery = await api.post(
          "http://localhost:3000/delivery",
          { 
            name_item,
            size_item,
            endPosition,
            startPosition,
          },
          config,
        )
        setDeliverys((state) => [createdDelivery.data, ...state])
        return true
      } catch (err) {
        if (err instanceof Error) setError({ msg: err.message, active: true })
        return false
      }
    }, 
    [],
  )

  async function updateDelivery(
    id: string,
    delivery: IDelivery,
  ): Promise<boolean> {
    const config = setBearerToken()
    if (delivery.status === 'inprogress') delivery.status = 'closed'
    if (delivery.status === 'open') delivery.status = 'inprogress'
    delivery.id_deliveryman = user?.id || ''
   
    try {
      const updatedDelivery = await api.put(
        `${url_localhost}/${id}`,
        delivery,
        config,
      )
      if (updatedDelivery) {
        const listDeliverys = deliverys.filter(delivery => delivery.id !== id);
        const newListDeliverys: IDelivery[] = [...listDeliverys, delivery];
        setDeliverys(newListDeliverys)
        return true
      }
      return false
    } catch (err) {
      if (err instanceof Error) setError({ msg: err.message, active: true })
      return false
    }
  }

  async function deleteDelivery(id: string): Promise<boolean> {
    const config = setBearerToken()
    try {
      await api.delete(`${url_localhost}/${id}`, config)
      setDeliverys(prevState => prevState.filter(delivery => delivery.id !== id))
      return true
    } catch (err) {
      if (err instanceof Error) setError({ msg: err.message, active: true })
      return false
    }
  }

  async function cleanDeliverys() {
    setAllDeliverys([])
    //setAvailableDeliverys([])
    setDeliverys([])
  }

  async function handlePagination(
    numberPage: number,
    type: 'client' | 'deliveryman',
  ): Promise<void> {
    const config = setBearerToken()
    const newPage = page + numberPage;
    setPage(newPage)
    if (type === 'deliveryman' && !deliverymanDeliverys) {
      const deliverys = await api.get(
        `${url_localhost}/available/${newPage}`,
        config,
      )
      setDeliverys(deliverys.data)
      //setAvailableDeliverys((state) => [...deliverys.data, state])
    } else {
      const showDeliverys: IDelivery[] = allDeliverys.slice(
        newPage,
        newPage + maxNumberPerPage,
      )
      setDeliverys(showDeliverys)
    }
  }

  useEffect(() => {
    console.log('passei useEffect get Delivery Default', user)
    async function getDefaultDeliverys(): Promise<void> {
      const config = setBearerToken()
      try {
        if (user.typeUser === 'client') {
          const deliverys = await api.get(`${url_localhost}/client`, config)
          await setAllDeliverys(deliverys.data)
          const showDeliverys: IDelivery[] = deliverys.data.slice(
            0,
            maxNumberPerPage,
          )
          setDeliverys(showDeliverys)
        }
        if (user.typeUser === 'deliveryman') {
          setDeliverymanDeliverys(false)
          await handlePagination(0, 'deliveryman')
        }
      } catch (err) {
        if (err instanceof Error) setError({ msg: err.message, active: true })
      }
    }
    getDefaultDeliverys()
  }, [user.typeUser])

  useEffect(() => {
    setPage(0)
  }, [allDeliverys.length])

  useEffect(() => {
    setDeliverymanDeliverys(false)
  }, [])

  return (
    <DeliverysContext.Provider
      value={{
        allDeliverys,
        cleanDeliverys,
        createDelivery,
        deleteDelivery,
        deliverys,
        error,
        filterDeliverys,
        getDeliverymanDeliverys,
        getOneDelivery,
        handlePagination,
        page,
        searchDeliverys,
        updateDelivery,
      }}
    >
      {children}
    </DeliverysContext.Provider>
  )
}
