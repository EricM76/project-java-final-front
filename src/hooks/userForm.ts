import { useState } from 'react';

export const UseForm = (initialState = {}) => {
    const [state, setState] = useState(initialState);
    
    const reset = (newState = initialState) => {
        setState(newState)
    }

    const handleInputChange = ({target}: {target: HTMLInputElement}) => {

        setState({
            ...state,
            [target.name] : target.value
        })
    }

    return [state, handleInputChange, reset]

}
