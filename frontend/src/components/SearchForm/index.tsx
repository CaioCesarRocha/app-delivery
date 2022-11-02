import { SearchFormContent, FilterDeliveryButton, SearchFormContainer } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import {MagnifyingGlass, FadersHorizontal} from "phosphor-react";
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import useDeliverys from "../../hooks/useDeliverys";
import { FilterDeliveryModal } from "../FilterDeliveryModal";

const searchFormSchema = z.object({
    query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm(){
    const { searchDeliverys} = useDeliverys();
    const { 
        register,
        handleSubmit,
        formState: {isSubmitting} //informa estado do form, podendo ser usado pra desabilitar o botao
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    });
    
    async function handleSearchDeliverys(data: SearchFormInputs){
        await new Promise(resolve => setTimeout(resolve, 2000))
        await searchDeliverys(data.query)
    }

    return(
        <SearchFormContainer>
            <input 
                    type="text" 
                    placeholder= "Pesquisar Entregas"
                    {...register('query')}
                />
            <SearchFormContent onSubmit={handleSubmit(handleSearchDeliverys)}>
                
                <button type="submit" disabled={isSubmitting}>
                    <MagnifyingGlass size={20}/>
                    Buscar
                </button>
            </SearchFormContent>
            <SearchFormContent>
                <Dialog.Root>
                    <Dialog.Trigger asChild> 
                        <FilterDeliveryButton>
                            <FadersHorizontal size={20}/>
                            Filtrar                         
                        </FilterDeliveryButton>
                    </Dialog.Trigger> 
                    <FilterDeliveryModal/>
                </Dialog.Root> 
            </SearchFormContent>
        </SearchFormContainer>
    )
}