import React from 'react'


export const AuthContext = React.createContext();


export default function AuthContextProvider(props) {
    const [user, setUser] = React.useState(null)
    const [refresh, setRefresh] = React.useState(0)


    function ChangeUser(user) {
        if (user) {
            setUser(user)
        }
        else {
            setUser(null)
        }
    }

    function RefreshUser() {
        setRefresh(Math.random())
    }


    React.useEffect(() => {
        if (!!user) {
            const sesion = JSON.parse(sessionStorage.getItem('user'))
            if (sesion) {
                setUser(sesion)
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, ChangeUser, RefreshUser }}>
            { props.children}
        </AuthContext.Provider >
    )
}