import { SearchFormContainer, FilterDeliveryButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import {MagnifyingGlass, FadersHorizontal} from "phosphor-react";
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { FilterDeliveryModal } from "../../../../components/FilterDeliveryModal";

const searchFormSchema = z.object({
    query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>


export function SearchForm(){
    const { 
        register,
        handleSubmit,
        formState: {isSubmitting} //informa estado do form, podendo ser usado pra desabilitar o botao
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    });

    async function handleSearchDeliverys(data: SearchFormInputs){
        await new Promise(resolve => setTimeout(resolve, 2000))
    }

    return(
        <SearchFormContainer onSubmit={handleSubmit(handleSearchDeliverys)}>
            <input 
                type="text" 
                placeholder= "Pesquisar Entregas"
                {...register('query')}
            />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                Buscar
            </button>

            <Dialog.Root>
                <Dialog.Trigger asChild> 
                    <FilterDeliveryButton>
                        <FadersHorizontal size={20}/>
                        Filtrar
                    </FilterDeliveryButton>
                </Dialog.Trigger> 
                <FilterDeliveryModal/>
            </Dialog.Root> 
        </SearchFormContainer>
    )
}