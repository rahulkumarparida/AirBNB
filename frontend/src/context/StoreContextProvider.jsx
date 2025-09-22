import { StoreContext } from './StoreContext.js'
import data from '../Dummy/DummyData.json'
import { useEffect, useRef } from 'react'

const StoreContextProvider = ({ children }) => {
    const hotels = structuredClone(data)
    const userData = useRef({
        destination: "",
        checkIn: "",
        checkOut: "",
        adult: 0,
        children: 0,
        infant: 0
    })

    const bookingDetails = useRef({
        ...userData.current,
        cost: 0,
        tax: 0,
        totalcost: 0,
        cancleBy: ""
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

    useEffect(() => {
        const savedData = localStorage.getItem("bookingDetails");
        if (savedData && savedData !== "undefined" && savedData !== "null") {
            try {
                bookingDetails.current = JSON.parse(savedData);
            } catch (e) {
                console.error("Failed to parse userData:", e);
                localStorage.removeItem("bookingDetails");
            }
        }
    }, []);


    // Function to update data and save in storage
    const updateUserData = (newData) => {
        userData.current = newData;
        localStorage.setItem("userData", JSON.stringify(newData));
    };
    const updateBookingdetails = (newData) => {
        bookingDetails.current = newData;
        localStorage.setItem("bookingDetails", JSON.stringify(newData));
    };


    const value = { hotels, userData, updateUserData, bookingDetails, updateBookingdetails }
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider