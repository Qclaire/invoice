import React from 'react'
import { PDFViewer as PDF } from '@react-pdf/renderer'
import PDFRender from './PDFRender'


export default function PDFViewer({ data, styles, ...props }) {

    const { company, client, invoice, user } = data;

    return data && <PDF

        style={{
            height: '90vh',
            top: '7vh',
            margin: '0 auto',
            position: 'absolute',
            width: '95vw',
            ...styles
        }}>
        <PDFRender
            company={company}
            invoice={invoice}
            user={user}
            client={client}
        />
    </PDF>

}

