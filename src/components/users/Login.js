import React from 'react'
import Hash from 'hash-sum'
import { AuthContext } from '../Contexts/AuthContext'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'

export default function Login(props) {
    const [username, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

    const { ChangeUser } = React.useContext(AuthContext)


    function LogUserIn(event) {
        event.preventDefault()

        const users = JSON.parse(localStorage.getItem("authUsers"))
        const user = users && users[Hash(username.trim().toLowerCase())]

        if (!user) return setError(
            'Invalid Credentials!'
        )

        if (user.password === Hash(password)) {
            ChangeUser(user)
        }
        else {
            setError('Wrong Password! Please try again');
            return setPassword('')
        }
    }

    return <form onSubmit={LogUserIn}>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField
                    onChange={event => setUserName(event.target.value)}
                    variant='outlined'
                    value={username}
                    helperText='Please enter your username'
                    size='small'
                    margin='normal'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={event => setPassword(event.target.value)}
                    variant='outlined'
                    value={password}
                    helperText='Please enter your password'
                    size='small'
                    margin='normal'
                    type='password'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography
                    color='secondary'
                >
                    {error}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary"
                    fullWidth={true}
                    type='submit'
                    disabled={!username || !password}
                >Login</Button>
            </Grid>
        </Grid>

    </form>
}