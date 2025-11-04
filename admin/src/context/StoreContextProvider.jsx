import { StoreContext } from "./StoreContext"
import axiosInstance, { saveCredentials } from "../components/utils/axiosInstance"
import { useEffect, useState } from "react";

export const StoreContextProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [totalUser, setTotalUser] = useState(0)
    const [userLoading, setUserLoading] = useState(false)
    const [loginError, setLoginError] = useState()

    // User infinite scroll states
    const [userNextPage, setUserNextPage] = useState(null);
    const [isLoadingMoreUsers, setIsLoadingMoreUsers] = useState(false);
    const [hasMoreUsers, setHasMoreUsers] = useState(true);

    const [listings, setListings] = useState([])
    const [totalListings, setTotalListings] = useState(0)

    // Listing infinite scroll states
    const [nextPage, setNextPage] = useState(null);
    const [isLoadingMoreListings, setIsLoadingMoreListings] = useState(false);
    const [hasMoreListings, setHasMoreListings] = useState(true);

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
            let res = await axiosInstance.get("/api/admin/users/?limit=10&offset=0")
            if (!res.data.results) {
                setUserLoading(false)
                throw new Error("Users data not found");
            }
            setUsers(res.data.results)
            setTotalUser(res.data.count)
            setUserNextPage(res.data.next);
            setHasMoreUsers(!!res.data.next);
            setUserLoading(false)
        } catch (error) {
            console.log("error: ", error);
            setUserLoading(false)
        }
    }

    // Fetch more users when user scrolls to bottom
    const fetchMoreUsers = async () => {
        if (!userNextPage || isLoadingMoreUsers || !hasMoreUsers) return;

        try {
            setIsLoadingMoreUsers(true);
            let res = await axiosInstance.get(userNextPage);
            console.log("More users: ", res);

            setUsers(prev => [...prev, ...res.data.results]);
            setUserNextPage(res.data.next);
            setHasMoreUsers(!!res.data.next);
        } catch (error) {
            console.log("error fetching more users: ", error);
        } finally {
            setIsLoadingMoreUsers(false);
        }
    }



    const deleteUser = async (userId) => {
        try {
            console.log("Delete user inititated");
            await axiosInstance.delete(`/api/admin/users/${userId}`)
        } catch (error) {
            console.log("error deleting user: ", error);
        }
    }

    const fetchListings = async () => {
        try {
            setIsLoadingMoreListings(true);
            let res = await axiosInstance.get('/api/admin/listings/?&limit=10&offset=0');
            console.log("res: ", res);
            setTotalListings(res.data.count)
            setListings(res.data.results);
            setNextPage(res.data.next);
            setHasMoreListings(!!res.data.next);
        } catch (error) {
            console.log("error: ", error);
        } finally {
            setIsLoadingMoreListings(false);
        }
    }

    // Fetch more listings when user scrolls to bottom
    const fetchMoreListings = async () => {
        if (!nextPage || isLoadingMoreListings || !hasMoreListings) return;

        try {
            setIsLoadingMoreListings(true);
            let res = await axiosInstance.get(nextPage);
            console.log("More listings: ", res);

            setListings(prev => [...prev, ...res.data.results]);
            setNextPage(res.data.next);
            setHasMoreListings(!!res.data.next);
        } catch (error) {
            console.log("error fetching more: ", error);
        } finally {
            setIsLoadingMoreListings(false);
        }
    }

    useEffect(() => {
        fetchUsers()
        fetchListings()
    }, [])

    const value = {
        login,
        loginError,
        users,
        setUsers,
        userLoading,
        deleteUser,
        totalUser,

        // User infinite scroll
        fetchMoreUsers, // Use dummy for now, replace with fetchMoreUsers when API supports it
        hasMoreUsers,
        isLoadingMoreUsers,

        // Listings
        listings,
        setListings,
        setTotalListings,
        totalListings,

        // Listing infinite scroll
        fetchMoreListings,
        hasMoreListings,
        isLoadingMoreListings

    }
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}