import React, {createContext, useState} from 'react'
export const  CustomerContext = createContext(true)


const CustomerContextProvider = (props :any

) => {

    const [customer ,setCustomer] =useState(true);
    const [editCustomer,setEditCustomer]=useState(true);
     return (

        <CustomerContext.Provider value={{customer,setCustomer,editCustomer,setEditCustomer}}>

            {props.children}

        </CustomerContext.Provider>
    )
}
export default CustomerContextProvider
