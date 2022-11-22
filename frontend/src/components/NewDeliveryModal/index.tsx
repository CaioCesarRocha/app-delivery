import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TileLayer, Marker, MapContainer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { toast } from 'react-toastify'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { X, Bicycle, Truck, Jeep, CheckCircle } from 'phosphor-react'
import { RotatingLines } from 'react-loader-spinner'
import Alert from '../Alert'
import {
  Overlay,
  Content,
  CloseButton,
  DeliveryType,
  DeliveryTypeButton,
  ContentSearchingDelivery,
} from './styles'
import { useContextSelector } from 'use-context-selector'
import { DeliverysContext } from '../../contexts/DeliveryContext'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})
L.Marker.prototype.options.icon = DefaultIcon

const newFormDeliverySchema = z.object({
  name_item: z.string(),
  size_item: z.enum(['small', 'medium', 'large']),
})

type NewDeliveryFormInputs = z.infer<typeof newFormDeliverySchema>

export function NewDeliveryModal() {
  const [startPosition, setStartPosition] = useState<[number, number]>([0, 0])
  const [endPosition, setEndPosition] = useState<[number, number]>([0, 0])
  const noOnePosition = 0
  const [renderCreating, setRenderCreating] = useState<boolean>(false)
  const [finished, setFinished] = useState<boolean>(false)
  const createDelivery = useContextSelector(DeliverysContext, (context) =>{
    return context.createDelivery
  })

  const {
    control, // qdo nao for html nativo(ex: input), precisa usar o control pra pegar os valores
    register,
    handleSubmit,
    formState: { isSubmitting }, // informa estado do form, podendo ser usado pra desabilitar o botao
    reset,
  } = useForm<NewDeliveryFormInputs>({
    resolver: zodResolver(newFormDeliverySchema),
  })

  useEffect(() => {
    setRenderCreating(false)
  }, [])

  function LocationMarkerStart() {
    useMapEvents({
      click: (event) => {
        setStartPosition([event.latlng.lat, event.latlng.lng])
      },
    })
    return null
  }

  function LocationMarkerEnd() {
    useMapEvents({
      click: (event) => {
        setEndPosition([event.latlng.lat, event.latlng.lng])
      },
    })
    return null
  }

  async function handleSendDeliverys(data: NewDeliveryFormInputs) {
    if (
      startPosition[0] === noOnePosition ||
      endPosition[0] === noOnePosition
    ) {
      toast.warning('Selecione corretamente posições.')
      return
    }
    setRenderCreating(true)
    const dataDelivery = {
      ...data,
      startPosition,
      endPosition,
    }
    const createdDelivery = await createDelivery(dataDelivery)
    if (createdDelivery) {
      setFinished(true)
    }
    reset()
  }

  function renderSizeOptions() {
    return (
      <>
        <DeliveryTypeButton value="small">
          <Bicycle size={24} />
          Pequena
        </DeliveryTypeButton>
        <DeliveryTypeButton value="medium">
          <Jeep size={24} />
          Média
        </DeliveryTypeButton>
        <DeliveryTypeButton value="large">
          <Truck size={24} />
          Grande
        </DeliveryTypeButton>
      </>
    )
  }

  function renderMapOptions() {
    return (
      <>
        <Dialog.DialogDescription>
          Selecione o local da partida
        </Dialog.DialogDescription>
        <MapContainer center={[-18.5913406, -46.5258909]} zoom={15}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarkerStart />
          <Marker position={startPosition} />
        </MapContainer>
        <Dialog.DialogDescription>
          Selecione o local da entrega
        </Dialog.DialogDescription>
        <MapContainer center={[-18.5913406, -46.5258909]} zoom={15}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarkerEnd />
          <Marker position={endPosition} />
        </MapContainer>
      </>
    )
  }

  return (
    <Dialog.Portal>
      <Alert theme="colored" />
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <Dialog.Title>Nova Entrega</Dialog.Title>
        <form onSubmit={handleSubmit(handleSendDeliverys)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('name_item')}
          />
          <Controller
            control={control}
            name="size_item"
            render={({ field }) => {
              return (
                <DeliveryType
                  onValueChange={field.onChange}
                  value={field.value}
                  required
                >
                  {renderSizeOptions()}
                </DeliveryType>
              )
            }}
          />
          {renderMapOptions()}
          {renderCreating ? (
            <ContentSearchingDelivery>
              {finished ? (
                <>
                  <p> Entrega criada com sucesso!</p>{' '}
                  <i>
                    <CheckCircle size={30} />
                  </i>
                </>
              ) : (
                <>
                  {' '}
                  <p> Criando Entrega... </p> <RotatingLines width="30" />{' '}
                </>
              )}
            </ContentSearchingDelivery>
          ) : null}
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
