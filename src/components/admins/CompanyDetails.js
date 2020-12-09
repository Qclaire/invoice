import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'


export default function CompananyDetails(props) {
    const [name, setName] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [suburb, setSuburb] = React.useState('');
    const [city, setCity] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');


    function SaveDetails() {
        const data = { name, street, suburb, city, phone, email };
        if (data);
    }

    return (
        <form onSubmit={SaveDetails}>
            <Grid container direction="row">
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={(value) => setName(value)}
                        placeholder="Name of Company"
                        fullWidth={true}
                        variant="outlined"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={(value) => setPhone(value)}
                        placeholder="Company phone number"
                        fullWidth={true}
                        variant="outlined"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={(value) => setEmail(value)}
                        placeholder="Company Email Address"
                        fullWidth={true}
                        variant="outlined"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={(value) => setStreet(value)}
                        placeholder="Street address"
                        fullWidth={true}
                        variant="outlined"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={(value) => setSuburb(value)}
                        placeholder="Suburb or Neighborhood name/description"
                        fullWidth={true}
                        variant="outlined"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={(value) => setCity(value)}
                        placeholder="City or town"
                        fullWidth={true}
                        variant="outlined"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button type="submit" variant="container" color="primary" fullWidth> Save Details</Button>
                </Grid>
            </Grid>
        </form>
    )
}