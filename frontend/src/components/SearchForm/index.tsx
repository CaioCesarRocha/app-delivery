import { RotatingLines } from 'react-loader-spinner'
import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlass, FadersHorizontal } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  SearchFormContent,
  FilterDeliveryButton,
  SearchFormContainer,
  ResponsiveSearchDiv,
  MsgLoading,
} from './styles'
import useDeliverys from '../../hooks/useDeliverys'
import { FilterDeliveryModal } from '../FilterDeliveryModal'
import { useState } from 'react'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const [loadingMsg, setLoadingMsg] = useState<boolean>(false)
  const { searchDeliverys } = useDeliverys()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }, // informa estado do form, podendo ser usado pra desabilitar o botao
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchDeliverys(data: SearchFormInputs) {
    setLoadingMsg(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const deliverys = await searchDeliverys(data.query)
    if (deliverys) setLoadingMsg(false)
  }

  return (
    <>
      <SearchFormContainer>
        <input
          type="text"
          placeholder="Pesquisar Entregas"
          {...register('query')}
        />
        <ResponsiveSearchDiv>
          <SearchFormContent onSubmit={handleSubmit(handleSearchDeliverys)}>
            <button type="submit" disabled={isSubmitting}>
              <MagnifyingGlass size={20} />
              Buscar
            </button>
          </SearchFormContent>
          <SearchFormContent>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <FilterDeliveryButton>
                  <FadersHorizontal size={20} />
                  Filtrar
                </FilterDeliveryButton>
              </Dialog.Trigger>
              <FilterDeliveryModal />
            </Dialog.Root>
          </SearchFormContent>
        </ResponsiveSearchDiv>
      </SearchFormContainer>
      {loadingMsg ? (
        <MsgLoading>
          Pesquisando entregas...
          <RotatingLines width="30" />
        </MsgLoading>
      ) : null}
    </>
  )
}
