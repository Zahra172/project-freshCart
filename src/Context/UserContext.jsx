import { createContext } from "react";

export let UserContext =  createContext(0);

export default function UserContextProvider(props){
    let userData = null;
    return <UserContext.Provider value={{userData}}>
        {props.children}
    </UserContext.Provider>
}