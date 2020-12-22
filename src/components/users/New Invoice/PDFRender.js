import { View, Text, Page, Document, StyleSheet, Font } from '@react-pdf/renderer';
import React from 'react'
import Langar from '../../Fonts/Langar/Langar-Regular.ttf'
import Roboto from '../../Fonts/Roboto/Roboto-Regular.ttf'
import RobotoBold from '../../Fonts/Roboto/Roboto-Bold.ttf'




Font.register({
    family: 'Langar',
    src: Langar,
    fontStyle: 'normal',
    fontWeight: 'heavy',
});

Font.register({
    family: 'Roboto',
    src: Roboto,
    fontStyle: 'normal',
    fontWeight: 900

});
Font.register({
    family: 'RobotoBold',
    src: RobotoBold,
    fontStyle: 'normal',
    fontWeight: 900

});

Font.register({
    family: 'Roboto',
    src: Roboto,
    fontStyle: 'normal',
    fontWeight: 'normal',
})
const styles = StyleSheet.create({
    document: {
        fontFamily: 'Roboto',
        background: '#fff',

    },
    page: {
        paddingTop: '35pt',
        paddingBottom: '35pt',
        paddingRight: '35pt',
        paddingLeft: '35pt',
        fontFamily: 'Roboto',
    },
    section: {
        color: 'white',
        textAlign: 'center',
        margin: 30,
    },
    companyName: {
        fontFamily: 'Langar',
        fontSize: 20,
        fontWeight: 900,
        padding: 0,
        margin: 0,
    },
    invoiceText: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 600,
        paddingBottom: 0,
        marginBottom: 0,
    },
    spaceEvenly: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        margin: '10 0',
    },
    stack: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },
    smallLabel: {
        fontFamily: 'RobotoBold',
        fontWeight: 'heavy',
        fontSize: 12,
        color: '#000',

    },
    smallText: {
        fontFamily: 'Roboto',
        fontSize: 10,
        minHeight: 10,
    },
    table: {
        backgroundColor: '#eee',
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 5,
        paddingLeft: 5,
    },
    br: {
        backgroundColor: '#ddd',
        height: 1,
        width: 530,
    },
    space: {
        height: 10,
        width: 500,
    },
    total: {
        fontFamily: 'RobotoBold',
        fontSize: 14,

    }
});

export default function PDFRender({ company, client, invoice, user, ...props }) {

    const { name, suburb, city, phone, email, street, vat, NHIL, getFund, priceClause } = company || {}
    const { clientName, clientAddress, clientPhoneNumber } = client || {}
    const { items, sum, totalAmount, invoiceNHIL, subTotal, invoiceVAT, invoiceGetFund, invoiceNumber } = invoice || {};

    let date = invoice.date;
    date = date ? `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` : '';



    return <Document style={{ backgroundColor: 'transparent', width: "100vw" }}>
        <Page size='A4' style={styles.page}>
            <View>
                {/* Top Row */}
                <View style={styles.flexContainer}>
                    {/* Company name stack */}
                    <View>
                        <Text style={styles.companyName}>{name}</Text>
                        <Text style={styles.invoiceText}>{'Invoice'}</Text>
                    </View>

                    <View style={{ ...styles.stack }}>
                        {street && <Text style={styles.smallText}>{street}</Text>}
                        {suburb && <Text style={styles.smallText}>{suburb}</Text>}
                        {city && <Text style={styles.smallText}>{city}</Text>}
                        {phone && <Text style={styles.smallText}>{phone}</Text>}
                        {email && <Text style={styles.smallText}>{email}</Text>}
                    </View>
                </View>
                <View style={styles.br} />

                <View style={{ ...styles.spaceEvenly, paddingBottom: 10, paddingTop: 10 }}>
                    <View style={{ ...styles.stack, textAlign: 'left', }}>
                        <Text style={styles.smallLabel}>Billed To</Text>
                        <Text style={styles.smallText}>{clientName}</Text>
                        <Text style={styles.smallText}>{clientAddress}</Text>
                        <Text style={styles.smallText}>{clientPhoneNumber}</Text>
                    </View>

                    <View style={styles.stack}>
                        <Text style={styles.smallLabel}>Date of issue</Text>
                        {invoice.date && <Text style={styles.smallText}>{date}</Text>}
                        {invoice.date && <Text style={styles.smallText}>{' '}</Text>}
                        {invoice.date && <Text style={styles.smallText}>{' '}</Text>}
                    </View>
                    <View style={styles.stack}>
                        <Text style={styles.smallLabel}>Invoice No.</Text>
                        {invoiceNumber && <Text style={styles.smallText}>{invoiceNumber}</Text>}
                        {invoiceNumber && <Text style={styles.smallText}>{' '}</Text>}
                        {invoiceNumber && <Text style={styles.smallText}>{' '}</Text>}
                    </View>
                    <View style={styles.stack}>
                        <Text style={styles.smallLabel}>Total Amount due</Text>
                        <Text style={styles.smallText}>GHS {totalAmount}</Text>
                        <Text style={styles.smallText}>{' '}</Text>
                        <Text style={styles.smallText}>{' '}</Text>
                    </View>
                </View>
                <View style={styles.br} />

                <View style={styles.table}>
                    <View style={styles.flexContainer}>
                        <Text style={styles.smallLabel}>Item description</Text>
                        <Text style={styles.smallLabel}>Lenght</Text>
                        <Text style={styles.smallLabel}>Quantity</Text>
                        <Text style={styles.smallLabel}>Total Price</Text>
                    </View>

                    <View>
                        {items && items.map((item, index) => (
                            <View key={item.id} style={{ background: index % 2 === 0 ? '#eee' : '#ddd', ...styles.flexContainer }}>
                                <Text style={styles.invoiceText} align='left'>{item.name}</Text>
                                <Text style={styles.invoiceText}>{item.length}</Text>
                                <Text style={styles.invoiceText}>{item.quantity}</Text>
                                <Text style={styles.invoiceText}>{item.totalAmount}</Text>
                            </View>
                        ))}
                    </View>

                </View>
                <View style={styles.flexContainer}>
                    <Text style={styles.smallLabel}>Sum</Text>
                    <Text style={styles.smallLabel}>GHS {sum}</Text>
                </View>
                <View style={styles.flexContainer}>
                    <Text style={styles.invoiceText}>NHIL ({NHIL}% of sum)</Text>
                    <Text style={styles.invoiceText}>GHS {invoiceNHIL}</Text>
                </View>
                <View style={styles.flexContainer}>
                    <Text style={styles.invoiceText}>Get Fund levy ({getFund}% of sum)</Text>
                    <Text style={styles.invoiceText}>GHS {invoiceGetFund}</Text>
                </View>
                <View style={styles.br} />
                <View style={styles.flexContainer}>
                    <Text style={styles.smallLabel}>SubTotal</Text>
                    <Text style={styles.smallLabel}>GHS {subTotal}</Text>
                </View>
                <View style={styles.flexContainer}>
                    <Text style={styles.invoiceText}>VAT ({vat}% of subtotal)</Text>
                    <Text style={styles.invoiceText}>GHS {invoiceVAT}</Text>
                </View>
                <View style={styles.br} />
                <View style={styles.flexContainer}>
                    <Text style={styles.total}>Total</Text>
                    <Text style={styles.total}>GHS {totalAmount}</Text>
                </View>
                <View style={styles.space} />
                <View style={styles.space} />
                <View style={styles.space} />
                <View style={styles.flexContainer}>
                    <View>
                        <Text style={styles.invoiceText}>{'.'.repeat(50)}</Text>
                        <Text style={styles.smallLabel}>Issued By: {`${user.firstName || ""} ${user.otherNames || ''}`}</Text>
                    </View>

                    <View>
                        {
                            priceClause && priceClause.split('\n').map((price, index) => (<Text style={styles.invoiceText}>{index + 1}. {price}</Text>))
                        }
                    </View>
                </View>
            </View>
        </Page>
    </Document>
}