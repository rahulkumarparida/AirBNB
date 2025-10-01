import { StoreContext } from './StoreContext.js'
import data from '../Dummy/DummyData.json'
import { useEffect, useRef, useState } from 'react'
import axiosInstance from '../components/utils/axiosInstance.js'

const StoreContextProvider = ({ children }) => {
    const hotels = structuredClone(data)
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [loader, setLoader] = useState(false);
    const [authError, setAuthError] = useState(null)
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

    const signup = async (formData) => {
        const credential = {
            username: formData.firstName,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword
        }
        try {
            setLoader(true)
            setAuthError(null)
            let res = await axiosInstance.post('/api/auth/register/', credential)
            setLoader(false)
            console.log(res.data);
        } catch (error) {
            setLoader(false)
            const errMsg =
                error?.response?.data?.detail ||
                error?.response?.data?.message ||
                error?.response?.data?.non_field_errors?.[0] ||
                // For Django REST Framework field errors (object): {email: ["..."], password: ["..."]}
                (error?.response?.data && typeof error.response.data === "object"
                    ? Object.values(error.response.data).flat().join(" ")
                    : null) ||
                error?.message ||
                "Something went wrong. Please try again.";

            setAuthError(errMsg);
            console.log("Signup error: ", errMsg);

        }

    }

    const login = async (formData) => {
        const credential = {
            email: formData.email,
            password: formData.password
        }
        try {
            setLoader(true)
            let res = await axiosInstance.post("/api/auth/login/", credential)

            const { access, refresh } = res.data; // destructure response

            // update state
            setAccessToken(access);
            setRefreshToken(refresh);

            // save immediately using response values (not state)
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);
            setLoader(false)
            setAuthError(null)
            console.log("Login successful:", res.data);

        } catch (error) {
            setLoader(false)
            const errMsg =
                error?.response?.data?.detail ||
                error?.response?.data?.message ||
                error?.response?.data?.non_field_errors?.[0] ||
                (error?.response?.data && typeof error.response.data === "object"
                    ? Object.values(error.response.data).flat().join(" ")
                    : null) ||
                error?.message ||
                "Invalid credentials. Please try again.";

            setAuthError(errMsg);
            console.log("Login error: ", errMsg);

        }
    }

    const logout = () => {
        setAccessToken("");
        setRefreshToken("");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        console.log("User logged out");
    };


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

    useEffect(() => {
        const storedAccess = localStorage.getItem("access");
        const storedRefresh = localStorage.getItem("refresh");
        if (storedAccess) setAccessToken(storedAccess);
        if (storedRefresh) setRefreshToken(storedRefresh);
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



    const value = { hotels, userData, updateUserData, bookingDetails, updateBookingdetails, accessToken, setAccessToken, refreshToken, setRefreshToken, login, signup, logout, loader, authError, setAuthError }
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider