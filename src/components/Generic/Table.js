import React from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

export default function GenericTable({ columns, rows, cellSize, deleteFunction, selectorFunction }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    return <>
        {
            columns &&
            <Paper>
                <TableContainer >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, fontSize: '16px', fontWeight: '700' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {
                            rows &&
                            <TableBody>
                                {
                                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {


                                            return (
                                                <TableRow onClick={() => selectorFunction && selectorFunction(row.id)} hover key={row.id}>

                                                    {columns.map((column, index) => {

                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align} size={cellSize && cellSize}>
                                                                {deleteFunction && index === 0 && <IconButton onClick={() => deleteFunction(row.id)}>
                                                                    <Delete />
                                                                </IconButton>}
                                                                {value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })
                                }
                            </TableBody>
                        }
                    </Table>
                </TableContainer>
                {
                    rows && <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                }
            </Paper>
        }
    </>
}