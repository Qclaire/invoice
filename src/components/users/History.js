import { Dialog, DialogContent } from '@material-ui/core';
import PDFViewer from './New Invoice/PDFViewer';
import React from 'react'
import GenericTable from '../Generic/Table';



const columns = [
    { id: 'name', label: 'Client name or description', minWidth: 170, align: 'left', },
    { id: 'date', label: 'Date', minWidth: 50, align: 'center', },
    { id: 'time', label: 'Time', minWidth: 50, align: 'center', },
    { id: 'items', label: 'Number of items', minWidth: 20, align: 'center', },
    { id: 'cost', label: 'Total Cost', minWidth: 50, align: 'center', },
];

export default function History(props) {
    const [history, setHistory] = React.useState(null);
    const [selected, setSelected] = React.useState(null);
    const [data, setData] = React.useState(null);


    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem('history'));
        if (typeof data === 'object') {
            const filtered = data.map((item, index) => {

                return {
                    name: item?.client?.clientName,
                    date: item?.invoice?.date.split('T')[0],
                    time: item?.invoice?.date.split('T')[1]?.split('.')[0],
                    items: item?.invoice?.items?.length,
                    cost: `GHS ${item?.invoice?.totalAmount}`
                }
            })
            setHistory(filtered)
            setData(data)
        }
    }, [])

    function PreviewItem(id) {
        const item = data.filter(item => item.id === id)[0]
        item['invoice']['date'] = new Date(item.invoice.date);
        setSelected(item)
    }


    return <div>
        {!history && <h5>No invoice data available</h5>}

        {
            history &&
            <GenericTable
                columns={columns}
                rows={history}
                selectorFunction={PreviewItem}
                cellSize={history && history.length > 10 && 'small'}
            />
        }

        <Dialog fullScreen minWidth='lg' fullWidth open={!!selected} onClose={() => setSelected(null)}>
            <DialogContent >
                {selected && <PDFViewer
                    data={selected}
                />}
            </DialogContent>
        </Dialog>
    </div>
}