import { SearchFormContainer } from "./styles";
import {MagnifyingGlass} from "phosphor-react";
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

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
        </SearchFormContainer>
    )
}