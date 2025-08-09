import { useState } from "react"

export const SearchPokemon = ({onChangeInput}) => {
       
    const [inputValue, setInputValue] = useState('')
    const onInputChanged=({target})=>{
        setInputValue(target.value)
    }
    const onSubmitInput=(event)=>{
        event.preventDefault();
        if (inputValue.trim().length<=0) return;
       
        onChangeInput(inputValue);
        setInputValue('')
    }
    return (
        <form onSubmit={onSubmitInput}>
            <input type="text" value={inputValue} placeholder='Buscar pokemon' onChange={onInputChanged} />
        </form>)
}
