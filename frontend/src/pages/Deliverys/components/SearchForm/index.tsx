import { SearchFormContainer } from "./styles";
import {MagnifyingGlass} from "phosphor-react";

export function SearchForm(){
    return(
        <SearchFormContainer>
            <input type="text" placeholder= "Pesquisar Entregas"/>
            <button type="submit">
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SearchFormContainer>
    )
}