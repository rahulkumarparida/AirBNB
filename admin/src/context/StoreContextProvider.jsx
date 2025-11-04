import { StoreContext } from "./StoreContext"
import axiosInstance, { saveCredentials } from "../components/utils/axiosInstance"
import { useEffect, useState } from "react";

export const StoreContextProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [userLoading, setUserLoading] = useState(false)
    const [loginError, setLoginError] = useState()

    const login = (email, password) => {
        console.log("password: ", password);
        console.log("email: ", email);
        if (email === "rroxx460@gmail.com" && password === "zebra@qwerty") {
            saveCredentials(email, password);
            return true
        }
        console.error("Invalid credentials")
        setLoginError("Invalid credentials")
        return false;
    }

    const fetchUsers = async () => {
        try {
            setUserLoading(true)
            let res = await axiosInstance.get("/api/admin/users")
            if (!res.data.results) {
                setUserLoading(false)
                throw new Error("Users data not found");
            }
            setUsers(res.data.results)
            setUserLoading(false)
        } catch (error) {
            console.log("error: ", error);
            setUserLoading(false)
        }
    }

    // const fetchUsersById = async (userId) => {
    //     try {

    //         let res = await axiosInstance.get(`//api/admin/users/${userId}`)
    //         if (!res.data.results) {
    //             throw new Error("Users data not found");
    //         }
    //         setUsers(res.data.results)
    //     } catch (error) {
    //         console.log("error: ", error);
    //     }
    // }

    const deleteUser = async (userId) => {
        try {
            console.log("Delete user inititated");
            await axiosInstance.delete(`/api/admin/users/${userId}`)
            fetchUsers()
        } catch (error) {
            console.log("error deleting user: ", error);

        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])


    const value = {
        login,
        loginError,
        users,
        setUsers,
        userLoading,
        deleteUser

    }
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}
