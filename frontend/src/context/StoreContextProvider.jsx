import { StoreContext } from './StoreContext.js'
import data from '../Dummy/DummyData.json'
import { useEffect, useRef } from 'react'

const StoreContextProvider = ({ children }) => {
    const hotels = structuredClone(data)
    const userData = useRef({
        destination: "",
        checkIn: "",
        checkOut: "",
        guests: {
            adult: 0,
            children: 0,
            infant: 0
        }
    })

    useEffect(() => {
        const savedData = localStorage.getItem("userData");
        if (savedData && savedData !== "undefined" && savedData !== "null") {
            try {
                userData.current = JSON.parse(savedData);
            } catch (e) {
                console.error("Failed to parse userData:", e);
                localStorage.removeItem("userData"); 
            }
        }
    }, []);


    // Function to update data and save in storage
    const updateUserData = (newData) => {
        userData.current = newData;
        localStorage.setItem("userData", JSON.stringify(newData));
    };


    const value = { hotels, userData, updateUserData }
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider