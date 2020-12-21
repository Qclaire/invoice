import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'


export default function CompanyDetails(props) {
    const [name, setName] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [suburb, setSuburb] = React.useState('');
    const [city, setCity] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [refresh, setRefresh] = React.useState(null);


    function SaveDetails(event) {
        event.preventDefault();
        if (name && street && suburb && city && phone) {
            const data = { name, street, suburb, city, phone, email };
            localStorage.setItem('companyDetails', JSON.stringify(data));
        }
        setRefresh((new Date()).getMilliseconds());

    }

    React.useEffect(() => {
        const { name, street, suburb, city, phone, email } = JSON.parse(localStorage.getItem('companyDetails')) || {};
        name && setName(name);
        street && setStreet(street);
        suburb && setSuburb(suburb);
        city && setCity(city);
        phone && setPhone(phone);
        email && setEmail(email);
    }, [refresh])

    return (
        <form onSubmit={SaveDetails}>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField

                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Name of Company"
                        helperText='Company Name'
                        size='small'
                        fullWidth={true}
                        variant="outlined"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={phone}
                        type='tel'
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="Company phone number"
                        helperText='Company phone number'
                        size='small'
                        fullWidth={true}
                        variant="outlined"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Company Email Address"
                        helperText="Company Email Address"
                        size='small'
                        type='email'
                        fullWidth={true}
                        variant="outlined"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={street}
                        onChange={(event) => setStreet(event.target.value)}
                        placeholder="Street address"
                        helperText="Street address"
                        size='small'
                        fullWidth={true}
                        variant="outlined"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={suburb}
                        onChange={(event) => setSuburb(event.target.value)}
                        placeholder="Suburb or Neighborhood name/description"
                        helperText="Suburb or Neighborhood name/description"
                        size='small'
                        fullWidth={true}
                        variant="outlined"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        placeholder="City or town"
                        helperText="City or town"
                        size='small'
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