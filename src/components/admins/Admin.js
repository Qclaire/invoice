import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, ListItemText, Button } from '@material-ui/core'
import AddUser from './AddUser'

export default function Admin(props) {
    const [users, setUsers] = React.useState([])
    const [show, setShow] = React.useState(false)

    function deleteUser(userId) {

    }
    function makeAdmin(userId) {

    }

    React.useEffect(() => {
        // get users here
        setUsers()
    }, [])

    return <>
        {
            (!users && !show) && <h5>There are no users currently</h5>
        }
        {
            show && <AddUser />
        }
        {
            (users && !show) && <Accordion>
                <AccordionSummary>
                    <h2>Users</h2>
                </AccordionSummary>
                <AccordionDetails>

                    <List>
                        {users && users.map((user, index) => (
                            <ListItem key={user.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        user.username[0]
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.username}
                                    secondary={user.isAdmin ? 'Admin User' : 'Regular User'}
                                />
                                <ListItemSecondaryAction>
                                    <Button onChange={() => deleteUser(user.id)}>
                                        Delete
                                </Button>
                                    <Button onChange={() => makeAdmin(user.id)}>
                                        Make Admin
                                </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={() => setShow(!show)}>
                        Create User
                </Button>
                </AccordionDetails>
            </Accordion>
        }
    </>
}