import { Container, Grid, TextField, } from '@material-ui/core'
import React from 'react'
import './styles.css'

export default function ClientDetails({ onDataChange, defaults, ...props }) {
    const [data, setData] = React.useState({ clientName: '', clientPhoneNumber: '', clientAddress: '' })

    function saveClientDetails() {

    }
    function handleChange(event) {
        setData({ ...data, [event.target.id]: event.target.value })
    }

    React.useEffect(() => {
        onDataChange(data);
    }, [data, onDataChange])

    React.useEffect(() => {
        const { clientPhoneNumber, clientName, clientAddress } = defaults || {};
        if (clientPhoneNumber || clientName || clientAddress) {
            setData(defaults);
        }
    }, [defaults])

    const { clientName, clientPhoneNumber, clientAddress, } = data;

    return <Container fixed style={{ minHeight: "100vh" }}>

        <h2>Client Details</h2>
        <p />

        <form onSubmit={saveClientDetails}>

            <Grid container spacing={5} direction="row">
                <Grid item xs={12} sm={6}>
                    <label><h5>Client Name</h5></label>
                    <TextField
                        size='small'
                        id="clientName"
                        value={clientName}
                        onChange={handleChange}
                        placeholder='Client Name or description'
                        helperText={clientName && 'Client Name/Description'}
                        variant='outlined'
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <label><h5>Client Phone Number</h5></label>
                    <TextField
                        id='clientPhoneNumber'
                        size='small'
                        value={clientPhoneNumber}
                        onChange={handleChange}
                        placeholder="Client's phone number"
                        helperText={clientPhoneNumber && "Client's phone number"}
                        variant='outlined'
                        fullWidth
                        type='tel'
                    />

                </Grid>
                <Grid item xs={12}>
                    <label><h5>Client's Address</h5></label>
                    <TextField
                        id='clientAddress'
                        value={clientAddress}
                        onChange={handleChange}
                        size='small'
                        placeholder='Clients Address or location'
                        helperText={clientAddress && 'Clients Address or location'}
                        variant='outlined'
                        fullWidth
                    />
                </Grid>

            </Grid>
        </form>
    </Container>

}