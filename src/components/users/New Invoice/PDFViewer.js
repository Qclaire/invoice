import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import PDFRender from './PDFRender'


export default function Viewer({ data, ...props }) {

    return <PDFViewer
        allowTransparency={true}
        style={{
            height: '97vh', top: '0',
            margin: '0 auto',
            position: 'absolute',
            width: '95vw',
            backgroundColor: 'black'
        }}>
        <PDFRender
            company={data.company}
            invoice={data.invoice}
            user={data.user}
            client={data.client}
        />
    </PDFViewer>

}

