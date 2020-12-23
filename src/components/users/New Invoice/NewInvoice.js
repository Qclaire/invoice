import { Button, Container } from '@material-ui/core'
import React from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import ClientDetails from './ClientDetails'
import ItemsSelect from './ItemsSelect'
import { v4 as uuidv4 } from 'uuid'
import PDFViewer from './PDFViewer'



export default function NewInvoice(props) {
    const [clientDetails, setClientDetails] = React.useState(null)
    const [items, setItems] = React.useState(null)
    const [stage, setStage] = React.useState(0)
    const [saved, setSaved] = React.useState(false)

    const { user } = React.useContext(AuthContext)

    let invoiceNumber = Math.random() * 1050 * Math.random() * 9249 * Math.random() * 1900;
    invoiceNumber = invoiceNumber.toString().replace('.', '').slice(0, 6);

    let op = JSON.parse(localStorage.getItem('operationalDetails')) || {};
    let comp = JSON.parse(localStorage.getItem('companyDetails')) || {};
    const company = { ...op, ...comp }

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

    function onSave() {
        const data = {
            id: uuidv4(),
            company,
            client: { ...clientDetails },
            invoiceNumber: { invoiceNumber },
            invoice: { ...items },
            user: { user },
        }
        let history = JSON.parse(localStorage.getItem('history')) || []
        localStorage.setItem('history', JSON.stringify([...history, data]))
        setSaved(true);
    }

    return (op && comp) ? <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>

        <div>

            {
                stage === 0 && <ClientDetails defaults={clientDetails} onDataChange={setClientDetails} />
            }
            {
                stage === 1 && <ItemsSelect items={items} onDataChange={setItems} />

            }
            {
                stage === 2 &&
                <PDFViewer
                    styles={{
                        height: '85vh',
                        top: '5vh',
                        margin: '0 auto',
                        position: 'absolute',
                        width: '85vw',
                    }}
                    data={{
                        company,
                        client: clientDetails,
                        invoice: { ...items, invoiceNumber },
                        user,

                    }}
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
            {stage === 2 && <Button variant="contained" color="primary" disabled={!!saved} onClick={onSave}>{`Save`}</Button>}


        </div>
    </div > :
        <Container>
            <h2>You have not configured your company information</h2>
            <h2>Please go the settings and inventory and configure your details</h2>
        </Container>
}