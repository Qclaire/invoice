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

    }, [refresh,])

    return (
        <AuthContext.Provider value={{ user, ChangeUser }}>
            { props.children}
        </AuthContext.Provider >
    )
}