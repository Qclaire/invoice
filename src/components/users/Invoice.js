import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react'
import { A4Sheet, CompanyName, FlexContainer, InvoiceText, RegularText, SmallLabel, SmallText, SpaceEvenly, Stack, TotalText } from './components';


export default function Invoice({ company, client, invoiceNumber, invoice, user, ...props }) {

    const { name, suburb, city, phone, email, street, vat, NHIL, getFund, priceClause } = company || {}
    const { clientName, clientAddress, clientPhoneNumber } = client || {}
    const { items, sum, totalAmount, invoiceNHIL, subTotal, invoiceVAT, invoiceGetFund } = invoice || {};

    let date = invoice.date;
    date = date ? `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` : '';


    return <A4Sheet >


        {/* Top Row */}
        <FlexContainer>
            {/* Company name stack */}
            <Stack>
                <CompanyName>{name}</CompanyName>
                <InvoiceText>{'Invoice'}</InvoiceText>
            </Stack>

            <Stack>
                {street && <SmallText>{street}</SmallText>}
                {suburb && <SmallText>{suburb}</SmallText>}
                {city && <SmallText>{city}</SmallText>}
                {phone && <SmallText>{phone}</SmallText>}
                {email && <SmallText>{email}</SmallText>}
            </Stack>
        </FlexContainer>

        <SpaceEvenly>
            <Stack>
                <SmallLabel>Billed To</SmallLabel>
                <SmallText>{clientName}</SmallText>
                <SmallText>{clientAddress}</SmallText>
                <SmallText>{clientPhoneNumber}</SmallText>
            </Stack>
            <Stack>
                <SmallLabel>Date of issue</SmallLabel>
                {invoice.date && <SmallText>{date}</SmallText>}
            </Stack>
            <Stack>
                <SmallLabel>Invoice No.</SmallLabel>
                {invoiceNumber && <SmallText>{invoiceNumber}</SmallText>}
            </Stack>
            <Stack>
                <SmallLabel>Total Amount due</SmallLabel>
                <TotalText> GHS {totalAmount}</TotalText>
            </Stack>
        </SpaceEvenly>

        <TableContainer style={{ width: '100%', border: '0.5px solid #ccc', borderRadius: '10px', background: '#aaa' }}>
            <Table size="small" style={{ minWidth: '100%' }}>
                <TableHead>
                    <TableRow style={{ width: '100%' }}>
                        <TableCell>Item description</TableCell>
                        <TableCell align='center'>Lenght</TableCell>
                        <TableCell align='center'>Quantity</TableCell>
                        <TableCell align='center'>Total Price</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {items && items.map((item, index) => (
                        <TableRow key={item.id} style={{ background: index % 2 === 0 ? '#fff' : '#ddd', }}>
                            <TableCell align='left'>{item.name}</TableCell>
                            <TableCell align='center'>{item.length}</TableCell>
                            <TableCell align='center'>{item.quantity}</TableCell>
                            <TableCell align='center'>{item.totalAmount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <FlexContainer>
            <SmallLabel>Sum</SmallLabel>
            <SmallLabel>GHS {sum}</SmallLabel>
        </FlexContainer>
        <FlexContainer>
            <SmallText>NHIL ({NHIL}% of sum)</SmallText>
            <SmallText>GHS {invoiceNHIL}</SmallText>
        </FlexContainer>
        <FlexContainer>
            <SmallText>Get Fund levy ({getFund}% of sum)</SmallText>
            <SmallText>GHS {invoiceGetFund}</SmallText>
        </FlexContainer>
        <hr />
        <FlexContainer>
            <SmallLabel>SubTotal</SmallLabel>
            <SmallLabel>GHS {subTotal}</SmallLabel>
        </FlexContainer>
        <FlexContainer>
            <SmallText>VAT ({vat}% of subtotal)</SmallText>
            <SmallText>GHS {invoiceVAT}</SmallText>
        </FlexContainer>
        <hr />
        <FlexContainer>
            <TotalText>Total</TotalText>
            <TotalText>GHS {totalAmount}</TotalText>
        </FlexContainer>

        <FlexContainer>
            <Stack>
                <span>...............................</span>
                <RegularText>{`${user?.firstName} ${user?.otherNames}`}</RegularText>
            </Stack>

            <Stack>
                <SmallLabel>Price Clause</SmallLabel>
                {
                    priceClause && priceClause.split('\n').map((price, index) => (<SmallText>{index + 1}. {price}</SmallText>))
                }
            </Stack>
        </FlexContainer>


    </A4Sheet>
}