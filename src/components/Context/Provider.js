import React, { createContext, useState } from 'react'

export const addData = createContext();
export const updateData = createContext();
export const dltdata = createContext();
export const addUserData = createContext();
export const addTask=createContext();


const ContextProvider = ({ children }) => {
    const [useradd, setUseradd] = useState("");
    const [useraddData, setUseraddData] = useState("");
    const [update, setUpdate] = useState("");
    const [deletedata, setDeletedata] = useState("");
    const [addtask, setAddTask] = useState("");

    return (
        <>
            <addData.Provider value={{ useradd, setUseradd }}>
                <addUserData.Provider value={{useraddData, setUseraddData}}>
            
            <updateData.Provider value={{ update, setUpdate }}>
                  
            <dltdata.Provider value={{deletedata, setDeletedata}}>
                <addTask.Provider value={{addtask, setAddTask}}>
                        {children}
                        </addTask.Provider>
                    </dltdata.Provider>
                
                </updateData.Provider>
                </addUserData.Provider>
            </addData.Provider>
        </>
    )
}

export default ContextProvider;