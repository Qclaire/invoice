import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
    TextField, Checkbox, Button, Grid, FormControlLabel
} from '@material-ui/core'

import Hash from 'hash-sum';


export default function AddUser({ refreshFunction, isFirstUse, ...props }) {
    const [username, setUsername] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [otherNames, setOtherNames] = React.useState('')
    const [password, setPassword] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(isFirstUse === true);


    function addUser(event) {
        event.preventDefault();
        if (username && password && firstName && otherNames) {
            const id = uuidv4();
            const userObj = { id, username, password: Hash(password), firstName, otherNames, isAdmin };

            let users = localStorage.getItem('users')
            if (!users) {
                localStorage.setItem('users', JSON.stringify([userObj]));
            }
            else {
                users = [...JSON.parse(users), userObj];
                localStorage.setItem('users', JSON.stringify(users));
            }
            let auths = JSON.parse(localStorage.getItem("authUsers")) | {}
            const usernameHash = Hash(username.toLocaleLowerCase());

            auths = { ...auths, [usernameHash]: userObj };
            localStorage.setItem("authUsers", JSON.stringify(auths))


        }
        setFirstName('')
        setOtherNames('')
        setUsername('')
        setPassword('')
        setIsAdmin(false);

        typeof refreshFunction === 'function' && refreshFunction(Math.random());


    }

    const isValid = username && password && firstName && otherNames;

    return <form onSubmit={addUser}>
        <Grid container spacing={3} direction="row">
            <Grid item xs={12} sm={6}>
                <TextField
                    required={true}
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    size='small'
                    fullWidth={true}
                    variant='outlined'
                    placeholder={'First Name'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required={true}
                    value={otherNames}
                    onChange={(event) => setOtherNames(event.target.value)}
                    size='small'
                    fullWidth={true}
                    variant='outlined'
                    placeholder={'other Names'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    size='small'
                    fullWidth={true}
                    variant='outlined'
                    placeholder={'Username'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    size='small'
                    type='password'
                    fullWidth={true}
                    variant='outlined'
                    placeholder={'Password'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                {isFirstUse && <p>You will become an admin</p>}
                {!isFirstUse && <FormControlLabel
                    labelPlacement='right'
                    control={
                        <Checkbox
                            checked={isAdmin}
                            onChange={() => setIsAdmin(!isAdmin)}
                            color='primary'
                        />
                    }

                    label='This is an admin user'
                />
                }
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                    disabled={!isValid}
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                >Add User</Button>
            </Grid>
        </Grid>
    </form>
}