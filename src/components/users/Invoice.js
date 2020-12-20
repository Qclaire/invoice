import { View, Text, Page, Document, StyleSheet } from '@react-pdf/renderer';
import React from 'react'

const styles = StyleSheet.create({
    document: {
        width: '100%'
    },
    page: {
        backgroundColor: 'tomato',
        width: '600px',
    },
    section: {
        color: 'white',
        textAlign: 'center',
        margin: 30,
    },
    companyName: {
        fontSize: '20px',
        fontWeight: '70',
    },
    invoiceText: {
        fontsize: '20',
        fontWeight: '400',
    }
});

export default function Invoice({ company, client, invoiceNumber, invoice, user, ...props }) {

    const { name, suburb, city, phone, email, street, vat, NHIL, getFund, priceClause } = company || {}
    const { clientName, clientAddress, clientPhoneNumber } = client || {}
    const { items, sum, totalAmount, invoiceNHIL, subTotal, invoiceVAT, invoiceGetFund } = invoice || {};

    let date = invoice.date;
    date = date ? `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` : '';


    return <Document style={styles.document}>
        <Page size='A4' style={styles.page}>
            <View style={styles.page}>
                {/* Top Row */}
                <View style={styles.page}>
                    {/* Company name stack */}
                    <View style={styles.page}>
                        <Text style={styles.companyName}>{name}</Text>
                        <Text style={styles.invoiceText}>{'Invoice'}</Text>
                    </View>

                    <View style={styles.page}>
                        {street && <Text style={styles.page}>{street}</Text>}
                        {suburb && <Text style={styles.page}>{suburb}</Text>}
                        {city && <Text style={styles.page}>{city}</Text>}
                        {phone && <Text style={styles.page}>{phone}</Text>}
                        {email && <Text style={styles.page}>{email}</Text>}
                    </View>
                </View>

                <View style={styles.page}>
                    <View style={styles.page}>
                        <Text style={styles.page}>Billed To</Text>
                        <Text style={styles.page}>{clientName}</Text>
                        <Text style={styles.page}>{clientAddress}</Text>
                        <Text style={styles.page}>{clientPhoneNumber}</Text>
                    </View>
                    <View style={styles.page}>
                        <Text style={styles.page}>Date of issue</Text>
                        {invoice.date && <Text style={styles.page}>{date}</Text>}
                    </View>
                    <View style={styles.page}>
                        <Text style={styles.page}>Invoice No.</Text>
                        {invoiceNumber && <Text style={styles.page}>{invoiceNumber}</Text>}
                    </View>
                    <View style={styles.page}>
                        <Text style={styles.page}>Total Amount due</Text>
                        <Text style={styles.page}>{totalAmount}</Text>
                    </View>
                </View>

                <View style={styles.page}>


                    <View style={styles.page}>
                        <Text style={styles.page}>Item description</Text>
                        <Text style={styles.page}>Lenght</Text>
                        <Text style={styles.page}>Quantity</Text>
                        <Text style={styles.page}>Total Price</Text>
                    </View>

                    <View style={styles.page}>
                        {items && items.map((item, index) => (
                            <View key={item.id} style={{ background: index % 2 === 0 ? '#eee' : '#ddd', ...styles.page }}>
                                <Text align='left'>{item.name}</Text>
                                <Text style={styles.page}>{item.length}</Text>
                                <Text style={styles.page}>{item.quantity}</Text>
                                <Text style={styles.page}>{item.totalAmount}</Text>
                            </View>
                        ))}
                    </View>

                </View>
                <View style={styles.page}>
                    <Text style={styles.page}>Sum</Text>
                    <Text style={styles.page}>GHS {sum}</Text>
                </View>
                <View style={styles.page}>
                    <Text style={styles.page}>NHIL ({NHIL}% of sum)</Text>
                    <Text style={styles.page}>GHS {invoiceNHIL}</Text>
                </View>
                <View style={styles.page}>
                    <Text style={styles.page}>Get Fund levy ({getFund}% of sum)</Text>
                    <Text style={styles.page}>GHS {invoiceGetFund}</Text>
                </View>

                <View style={styles.page}>
                    <Text style={styles.page}>SubTotal</Text>
                    <Text style={styles.page}>GHS {subTotal}</Text>
                </View>
                <View style={styles.page}>
                    <Text style={styles.page}>VAT ({vat}% of subtotal)</Text>
                    <Text style={styles.page}>GHS {invoiceVAT}</Text>
                </View>

                <View style={styles.page}>
                    <Text style={styles.page}>Total</Text>
                    <Text style={styles.page}>GHS {totalAmount}</Text>
                </View>

                <View style={styles.page}>
                    <View style={styles.page}>
                        <Text style={styles.page}>...............................</Text>
                        <Text style={styles.page}>{user?.name}</Text>
                    </View>

                    <View style={styles.page}>
                        {
                            priceClause && priceClause.map((price, index) => (<Text style={styles.page}>{index + 1}. {price}</Text>))
                        }
                    </View>
                </View>
            </View>
        </Page>
    </Document>
}