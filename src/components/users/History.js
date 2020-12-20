import React from 'react'
import { historyData } from '../../dummies'
import GenericTable from '../Generic/Table';
import { AuthContext } from '../Contexts/AuthContext';


const columns = [
    { id: 'name', label: 'Client name or description', minWidth: 170, align: 'left', },
    { id: 'date', label: 'Date', minWidth: 50, align: 'center', },
    { id: 'time', label: 'Time', minWidth: 50, align: 'center', },
    { id: 'items', label: 'Number of items', minWidth: 20, align: 'center', },
    { id: 'cost', label: 'Total Cost', minWidth: 50, align: 'center', },
];

export default function History(props) {
    const [history, setHistory] = React.useState(null);

    const { changeScreen } = React.useContext(AuthContext)

    React.useEffect(() => {
        setHistory(historyData);
    }, [])

    return <>
        {!history && <h5>No invoice data available</h5>}

        {
            history &&
            <GenericTable
                columns={columns}
                rows={history}
                cellSize='small'
            />
        }
    </>
}