import React from 'react'

import { TextField, Checkbox, Button, Grid, FormControlLabel } from '@material-ui/core'


export default function AddUser(props) {
    const [username, setUsername] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [otherNames, setOtherNames] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);


    function addUser() {

    }

    return <form onSubmit={addUser}>
        <Grid container spacing={5} direction="row">
            <Grid item xs={12} sm={6}>
                <TextField
                    value={firstName}
                    onChange={(value) => setFirstName(value)}
                    size='large'
                    fullwidth={true}
                    variant='outlined'
                    placeholder={'First Name'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={otherNames}
                    onChange={(value) => setOtherNames(value)}
                    size='large'
                    fullwidth={true}
                    variant='outlined'
                    placeholder={'other Names'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={username}
                    onChange={(value) => setUsername(value)}
                    size='large'
                    fullwidth={true}
                    variant='outlined'
                    placeholder={'Username'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={password}
                    onChange={(value) => setPassword(value)}
                    size='large'
                    type='password'
                    fullwidth={true}
                    variant='outlined'
                    placeholder={'Password'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isAdmin}
                            onChange={() => setIsAdmin(!isAdmin)}
                            color='primary'
                        />
                    }
                    label='This is an admin user'
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                    type='submit'
                    variant='contianed'
                    color='primary'
                    fullwidth
                />
            </Grid>
        </Grid>
    </form>
}