import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, ListItemText, Button, Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@material-ui/core'
import AddUser from './AddUser'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Delete } from '@material-ui/icons'
import CompanyDetails from './CompanyDetails'
import OperationalDetails from './OperationalDetails'

export default function Admin(props) {
    const [users, setUsers] = React.useState(null)
    const [show, setShow] = React.useState(false)
    const [refresh, setRefresh] = React.useState(false)

    function deleteUser(userId) {
        if (userId) {
            let users = JSON.parse(localStorage.getItem('users'))
            users = users.filter(user => user.id !== userId)
            localStorage.setItem('users', JSON.stringify(users))
        }
        setRefresh(!refresh);
    }
    function makeAdmin(userId) {

    }

    React.useEffect(() => {
        // get users here
        setUsers(JSON.parse(localStorage.getItem("users")))
    }, [show, refresh])

    return <>


        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <h3 style={{ flexBasis: '40%' }}>Users</h3>
                <p>Manage users of this application</p>

            </AccordionSummary>
            <AccordionDetails>

                <List style={{ width: '100%' }}>
                    {users && users.map((user, index) => (
                        <ListItem key={user.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    {user.username[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.username}
                                secondary={user.isAdmin ? 'Admin User' : 'Regular User'}
                            />

                            <ListItemSecondaryAction>
                                <IconButton onChange={() => deleteUser(user.id)}>
                                    <Delete />
                                </IconButton>

                            </ListItemSecondaryAction>

                        </ListItem>
                    ))}
                </List>

            </AccordionDetails>
            <Button variant="contained" color="primary" onClick={() => setShow(!show)}>
                Create User
                </Button>
        </Accordion>


        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <h4 style={{ flexBasis: '40%' }}>Company Details</h4>
                <p>Update the company's contact details</p>
            </AccordionSummary>

            <AccordionDetails>
                <CompanyDetails />
            </AccordionDetails>
        </Accordion>

        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{ display: 'flex' }}
            >
                <h4 style={{ flexBasis: '40%' }}>Taxes and Operational information</h4>
                <p>Indicate your operational info here</p>
            </AccordionSummary>

            <AccordionDetails>
                <OperationalDetails />
            </AccordionDetails>
        </Accordion>


        <Dialog open={show} onClose={() => setShow(!show)}>
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
                <AddUser />
            </DialogContent>
        </Dialog>
    </>
}