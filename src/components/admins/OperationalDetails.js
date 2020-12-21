import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'


export default function OperationalDetails(props) {
    const [vat, setVat] = React.useState('');
    const [NHIL, setNHIL] = React.useState('');
    const [getFund, setGetFund] = React.useState('');
    const [priceClause, setPriceClause] = React.useState('');
    const [refresh, setRefresh] = React.useState(null);

    function SaveDetails(event) {
        event.preventDefault();
        if (vat && NHIL && getFund && priceClause) {
            const data = { vat, NHIL, getFund, priceClause };
            localStorage.setItem('operationalDetails', JSON.stringify(data));
        }
        setRefresh((new Date()).getMilliseconds());
    }

    React.useEffect(() => {

        const { vat, NHIL, getFund, priceClause } = JSON.parse(localStorage.getItem('operationalDetails')) || {};
        vat && setVat(vat);
        NHIL && setNHIL(NHIL);
        getFund && setGetFund(getFund);
        priceClause && setPriceClause(priceClause);
    }, [refresh])

    return (
        <form onSubmit={SaveDetails}>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        value={vat}
                        type='number'
                        size='small'
                        onChange={(event) => setVat(event.target.value)}
                        placeholder="VAT Percentage"
                        helperText="VAT Percentage"
                        fullWidth={true}
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        value={NHIL}
                        type='number'
                        size='small'
                        onChange={(event) => setNHIL(event.target.value)}
                        placeholder="National Health Insurance Levy percentage"
                        helperText="National Health Insurance Levy percentage"
                        fullWidth={true}
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        type='number'
                        size='small'
                        value={getFund}
                        onChange={(event) => setGetFund(event.target.value)}
                        placeholder="GET FUND TAX"
                        fullWidth={true}
                        helperText="GET FUND LEVY percentage"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={priceClause}
                        multiline={true}
                        rows={3}
                        onChange={(event) => setPriceClause(event.target.value)}
                        placeholder='Price clauses'
                        fullWidth={true}
                        helperText='Price clauses: Begin each clause on a new line'
                        variant="outlined"
                        required

                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Button type="submit" variant="container" color="primary" fullWidth> Save Details</Button>
                </Grid>
            </Grid>
        </form>
    )
}