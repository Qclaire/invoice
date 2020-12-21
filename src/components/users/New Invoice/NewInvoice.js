import { Button } from '@material-ui/core'
import React from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import Invoice from '../Invoice'
import ClientDetails from './ClientDetails'
import ItemsSelect from './ItemsSelect'
import ReactPDF, { Document, Text, PDFDownloadLink, PDFViewer, Page, Link } from '@react-pdf/renderer';



export default function NewInvoice(props) {
    const [clientDetails, setClientDetails] = React.useState(null)
    const [items, setItems] = React.useState(null)
    const [stage, setStage] = React.useState(0)

    const { user } = React.useContext(AuthContext)

    let invoiceNumber = Math.random() * 1050 * Math.random() * 9249 * Math.random() * 1900;
    invoiceNumber = invoiceNumber.toString().replace('.', '').slice(0, 6);

    let op = JSON.parse(localStorage.getItem('operationalDetails')) || {};
    let comp = JSON.parse(localStorage.getItem('companyDetails')) || {};

    function onBack() {
        if (stage === 0) return;
        setStage(stage - 1);
    }

    function onNext() {

        if (stage === 2) return;

        const { clientName, clientPhoneNumber, clientAddress } = clientDetails;
        if (clientName && (clientPhoneNumber || clientAddress)) setStage(stage + 1);
        return;

    }

    function onPrint() {


    }
    function onSave() {
        const data = {
            company: { ...op, ...comp },
            client: { ...clientDetails },
            invoiceNumber: { invoiceNumber },
            invoice: { ...items },
            user: { user },
        }
        let history = JSON.parse(localStorage.getItem('history'))
        if (history) {
            localStorage.setItem('history', JSON.stringify([...history, data]))
            return;
        }
        else {
            localStorage.setItem('data', JSON.stringify([data]))
            return;
        }


    }

    function onPRintAndSave() {
        onSave();
        onPrint();
    }

    console.log(items)


    return <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div>

            {
                stage === 0 && <ClientDetails defaults={clientDetails} onDataChange={setClientDetails} />
            }
            {
                stage === 1 && <ItemsSelect items={items} onDataChange={setItems} />

            }
            {
                stage === 2 &&

                <Invoice
                    company={{ ...op, ...comp }}
                    client={clientDetails}
                    invoice={items}
                    invoiceNumber={invoiceNumber}
                    user={user}
                />

            }
        </div>

        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px',
            position: 'fixed',
            width: '90%',
            bottom: '0px',
            background: '#fff'
        }}>
            {stage > 0 && <Button onClick={onBack}>{`< Back`}</Button>}
            {stage < 2 && <Button onClick={onNext}>{`Continue >`}</Button>}
            {stage === 2 && <Button variant="contained" color="primary" >
                {/* <PDFDownloadLink
                    document={
                        <Invoice
                            company={{ ...op, ...comp }}
                            client={clientDetails}
                            invoice={items}
                            invoiceNumber={invoiceNumber}
                            user={user}
                        />
                    }

                    fileName="somename.pdf">
                    {({ blob, url, loading, error }) => {
                        console.log(url, blob, error, loading)
                        return (loading ? 'Loading...' : 'Download now!');
                    }}
                </PDFDownloadLink> */}
            </Button>}
            {stage === 2 && <Button variant="contained" color="primary" onClick={onPRintAndSave}>{`Save and Print`}</Button>}
            {stage === 2 && <Button variant="contained" color="primary" onClick={onSave}>{`Save Only`}</Button>}


        </div>
    </div>
}