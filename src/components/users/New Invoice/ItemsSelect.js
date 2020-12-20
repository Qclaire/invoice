import React from 'react'
import {
    Button, Container, Grid, TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import styled from 'styled-components'
import GenericTable from '../../Generic/Table'

const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
`

const BigText = styled.p`
padding: 0;
font-size: 20px;
font-weight: 600;
margin: 0;
`

const SmallLabel = styled.small`
    font-size='10px'
    margin: 0;
    font-weight: 300;
`
const UnitPrice = styled.p`
    font-size: 16px;
    margin: 0;
`
const columns = [
    { id: 'name', label: 'Item description', minWidth: 200, align: 'left', },
    { id: 'quantity', label: 'Quantity', minWidth: 50, align: 'center', },
    { id: 'length', label: 'Length', minWidth: 20, align: 'center', },
    { id: 'unitPrice', label: 'Unit Price', minWidth: 50, align: 'center', },
    { id: 'totalAmount', label: 'Amount', minWidth: 50, align: 'center', },
];


export default function ItemsSelect({ onDataChange, ...props }) {
    const [stock, setStock] = React.useState(null)
    const [selected, setSelected] = React.useState({ length: 0, quantity: 0 })
    const [items, setItems] = React.useState(null)
    const [sum, setSum] = React.useState(0)

    function handleChange(event) {

        setSelected({ ...selected, [event.target.id]: event.target.value })
    }

    function onSelected(event, value, reason) {
        if (reason === 'select-option') {
            setSelected({ ...value, length: 1, quantity: 1 });
        }
    }


    function AddItem(event) {
        event.preventDefault();

        const { name, unitPrice, quantity, length, id } = selected;

        if (name && unitPrice && quantity && length) {
            const tAmount = unitPrice * quantity * length;
            if (!!items) {
                const exists = items.filter(i => i.id === id)
                if (exists[0]) {
                    const old = exists[0]
                    const newObject = { id, name, unitPrice, quantity: Number(quantity || 0) + Number(old?.quantity || 0), totalAmount: (+tAmount + (+old.totalAmount)).toString(), length: (Number(length) + Number(old.length)).toString() };
                    setSelected(null)
                    setItems([...items.filter(item => item.id !== id), newObject])
                }
            }
            !items && setItems([{ id, name, unitPrice, quantity, totalAmount: tAmount, length }])
            items && setItems([...items, { id, name, unitPrice, quantity, totalAmount: tAmount, length }])
            setSelected(null)
        }


    }
    React.useEffect(() => {
        setStock(JSON.parse(localStorage.getItem('stocks')))
    }, [])



    React.useEffect(() => {
        let tot = items ? items.map(i => Number(i.totalAmount) || 0).reduce((f, s) => (f + s), 0) : 0;
        setSum(tot)
    }, [items])

    React.useEffect(() => {

        console.log(items);
        const taxes = JSON.parse(localStorage.getItem('operationalDetails'))

        const invoiceGetFund = Math.round((Number(taxes.getFund) * sum / 100) * 100) / 100;

        const invoiceNHIL = Math.round(((Number(taxes.NHIL) * sum / 100) * 100)) / 100;

        let subTotal = Math.round((invoiceGetFund + invoiceNHIL + sum) * 100) / 100;

        const invoiceVAT = Math.round((Number(taxes.vat) * subTotal / 100) * 100) / 100;

        const totalAmount = Math.round((invoiceVAT + subTotal) * 100) / 100;

        onDataChange({
            items,
            subTotal,
            totalAmount,
            invoiceVAT,
            invoiceNHIL,
            sum,
            invoiceGetFund,
            date: new Date(),
        })
    }, [sum, onDataChange, items])



    return (
        <Container maxWidth='lg' style={{ padding: '20px' }}>

            <form onSubmit={AddItem}>
                <Grid container align='center' direction='row' spacing={2}>
                    <Grid item xs={12} sm={6} md={5}>
                        <Autocomplete
                            value={selected}
                            size='small'
                            id="items-selector"
                            options={stock || []}
                            getOptionLabel={(option) => option.name}
                            onChange={onSelected}
                            renderInput={(params) => <TextField size='small' {...params} label='Search for an item or click to select' variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={6} sm={1} >
                        <TextField size='small'
                            id='length'
                            value={selected?.length}
                            onChange={handleChange}
                            helperText='Length'
                            placeholder='Length needed'
                            variant='outlined'
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={6} sm={1}>
                        <TextField size='small'
                            id='quantity'
                            helperText='Quantity'
                            value={selected?.quantity}
                            onChange={handleChange}
                            placeholder='Quantity Needed'
                            variant='outlined'
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={6} sm={1}>

                        <TextBlock>
                            <UnitPrice>{selected?.unitPrice || '0'}</UnitPrice>
                            <SmallLabel>unit price</SmallLabel>
                        </TextBlock>

                    </Grid>

                    <Grid item xs={6} sm={2}>
                        <TextBlock>
                            <BigText>
                                {((selected?.unitPrice * (selected?.length || 1) * (selected?.quantity || 1)) || '0')}
                            </BigText>
                            <SmallLabel>Total Amount</SmallLabel>
                        </TextBlock>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Button
                            disabled={!selected?.name}
                            type='submit'
                            color='primary'
                            fullWidth
                            variant='contained'
                        >Add</Button>
                    </Grid>
                </Grid>
            </form>

            {
                items && <div style={{ display: 'flex', justifyContent: 'space-around', background: '#ccc' }}>
                    <h4>{`Selected Items: ${items.length || 0}`}</h4>

                    <h4>{`Total Amount: GHS ${sum}`}</h4>

                </div>
            }
            { items && <GenericTable columns={columns} rows={items} cellSize='small' />}
        </Container >
    )

}