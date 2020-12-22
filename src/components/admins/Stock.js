import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TextField, Button, Grid } from '@material-ui/core'
import GenericTable from '../Generic/Table';


export default function Stock(props) {
    const [name, setName] = React.useState('');
    const [unitPrice, setUnitPrice] = React.useState('');
    const [refresh, setRefresh] = React.useState(0);
    const [stocks, setStocks] = React.useState(null);


    function SaveStock(event) {
        event.preventDefault();
        if (name && unitPrice) {
            const existing = JSON.parse(localStorage.getItem("stocks"))
            if (existing) {
                localStorage.setItem('stocks', JSON.stringify([...existing, { id: uuidv4(), name, unitPrice }]))
            }
            else {
                localStorage.setItem('stocks', JSON.stringify([{ id: uuidv4(), name, unitPrice }]))
            }
        }
        setName('')
        setUnitPrice('')
        setRefresh(Math.random())
    }

    const columns = [
        { id: 'name', label: 'Item description', minWidth: 200, align: 'left', },
        { id: 'unitPrice', label: 'Unit Price', minWidth: 50, align: 'center', },
    ];

    React.useEffect(() => {

        setStocks(JSON.parse(localStorage.getItem('stocks')))

    }, [refresh])

    function RemoveItem(id) {
        localStorage.setItem('stocks', JSON.stringify(stocks.filter(item => item.id !== id)))
        setRefresh(Math.random())
    }
    return <>
        <form onSubmit={SaveStock}>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} sm={8}>
                    <TextField
                        required
                        size='small'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder='Name of Product'
                        fullWidth={true}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        required
                        size='small'
                        value={unitPrice}
                        onChange={(event) => setUnitPrice(event.target.value)}
                        placeholder='Product unit price'
                        fullWidth={true}
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Button size='small' disabled={!unitPrice || !name} type="submit" variant="contained" color="primary" fullWidth>+ Add</Button>
                </Grid>
            </Grid>
        </form>
        {
            stocks && <div style={{ background: '#ccc', padding: '1px 5px', margin: '1px 0' }}>
                <h4>You have {stocks.length} items in your inventory</h4>
            </div>
        }
        {
            stocks && <GenericTable columns={columns}
                rows={stocks}
                deleteFunction={RemoveItem}
                cellSize={stocks && stocks.length > 10 && 'small'}
            />
        }
        {
            !stocks && <div style={{ hieght: '50%' }}>
                <p style={{
                    position: 'absolute', top: '50%',
                    left: '40%', fontSize: '20px',

                }}>
                    You have no items in inventory.
                </p>
            </div>
        }

    </>
}