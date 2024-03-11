import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [Token, setToken] = useState(localStorage.getItem("token"));
    const [Data, setUserData] = useState()
    const [service,setService] = useState("")


    const storeToken = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    let isLoggedin = !!Token;
    console.log(isLoggedin);

    const logOutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    const userAuthentication = async () => {

        try {
            const response = await fetch("http://localhost:8000/api/auth/userData", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            if (response.ok) {
                const res_data = await response.json()
                console.log(res_data.userData)
                setUserData(res_data.userData)
            }

        } catch (error) {
            console.log("fetch errpr")
        }

    }

    const getServices = async() => {
        try {
            const response =await fetch("http://localhost:8000/api/auth/service", {
                method: "GET"
            })
            if (response.ok) {
                const serviceData = await response.json()
                setService(serviceData.msg)
                console.log(serviceData.msg)
            }


        } catch (error) {
            console.log("not fetch data of service", error)
        }
    }

    useEffect(() => {
        getServices()
        userAuthentication()

    }, [])



    return (
        <AuthContext.Provider value={{ storeToken, logOutUser, isLoggedin, Data,service }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if (!authContextValue) {
        throw new Error("errororoororororo")
    }
    return authContextValue;
}