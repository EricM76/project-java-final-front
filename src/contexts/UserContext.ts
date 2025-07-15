import {createContext} from 'react';

export interface User {
    logged : boolean,
    name : string | null,
    rolId : number | null,
    token : string | null
}

export const UserContext = createContext<User>({
    logged: false,
    name: null,
    rolId: null,
    token: null
});