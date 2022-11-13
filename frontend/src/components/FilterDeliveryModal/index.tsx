import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { RotatingLines } from 'react-loader-spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  X,
  Jeep,
  Bicycle,
  Truck,
  DotsThree,
  XCircle,
  PlusCircle,
  Calendar,
  CheckCircle,
} from 'phosphor-react'
import {
  Overlay,
  Content,
  CloseButton,
  DeliveryType,
  DeliveryTypeButton,
  ContentSearchingDelivery,
} from './styles'
import useDeliverys from '../../hooks/useDeliverys'

const filterDeliverySchema = z.object({
  filter: z.string(),
})

type filterDeliveryFormInputs = z.infer<typeof filterDeliverySchema>

export function FilterDeliveryModal() {
  const [renderSearching, setRenderSearching] = useState<boolean>(false)
  const [finished, setFinished] = useState<boolean>(false)
  const { filterDeliverys } = useDeliverys()
  const {
    control, // qdo nao for html nativo(ex: input), precisa usar o control pra pegar os valores
    handleSubmit,
    formState: { isSubmitting }, // informa estado do form, podendo ser usado pra desabilitar o botao
  } = useForm<filterDeliveryFormInputs>({
    resolver: zodResolver(filterDeliverySchema),
  })

  async function handleFilterDeliverys(data: filterDeliveryFormInputs) {
    setFinished(false)
    setRenderSearching(true)
    const finished = await filterDeliverys(data.filter)
    if (finished) {
      setFinished(true)
    }
  }

  function renderOptionsSize() {
    return (
      <>
        <DeliveryTypeButton value="small">
          <Bicycle size={22} /> Pequena
        </DeliveryTypeButton>
        <DeliveryTypeButton value="medium">
          <Jeep size={22} /> Média
        </DeliveryTypeButton>
        <DeliveryTypeButton value="large">
          <Truck size={22} /> Grande
        </DeliveryTypeButton>
      </>
    )
  }

  function renderOptionStatus() {
    return (
      <>
        <DeliveryTypeButton value="open">
          <PlusCircle size={22} /> Disponíveis
        </DeliveryTypeButton>
        <DeliveryTypeButton value="inprogress">
          <DotsThree size={22} /> Em andamento
        </DeliveryTypeButton>
        <DeliveryTypeButton value="closed">
          <XCircle size={22} /> Encerradas
        </DeliveryTypeButton>
      </>
    )
  }

  function renderContentForm() {
    return (
      <>
        <Controller
          control={control}
          name="filter"
          render={({ field }) => {
            return (
              <>
                <Dialog.DialogDescription>
                  Tipo da entrega
                </Dialog.DialogDescription>
                <DeliveryType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {renderOptionsSize()}
                </DeliveryType>
                <Dialog.DialogDescription>
                  Status da entrega
                </Dialog.DialogDescription>
                <DeliveryType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {renderOptionStatus()}
                </DeliveryType>
                <Dialog.DialogDescription>Calendário</Dialog.DialogDescription>
                <DeliveryType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <DeliveryTypeButton value="date">
                    <Calendar size={23} /> Data atual
                  </DeliveryTypeButton>
                </DeliveryType>
              </>
            )
          }}
        />
      </>
    )
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <Dialog.Title>Selecione um dos campos abaixo para filtro</Dialog.Title>
        <form onSubmit={handleSubmit(handleFilterDeliverys)}>
          {renderContentForm()}
          {renderSearching ? (
            <ContentSearchingDelivery>
              <p> Buscando Entregas </p>
              {finished ? (
                <i>
                  {' '}
                  <CheckCircle size={30} />
                </i>
              ) : (
                <RotatingLines width="30" />
              )}
            </ContentSearchingDelivery>
          ) : null}
          <button type="submit" disabled={isSubmitting}>
            Buscar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
