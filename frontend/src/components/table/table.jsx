import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getApiHandler } from '../apihandler';
import MainLayout from '../layout';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';
import 'jspdf-autotable'

import { jsPDF } from "jspdf";

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'First name',
        width: 150,
        editable: true,
    },

    {
        field: 'email',
        headerName: 'Emailid',
        type: 'string',
        width: 110,
        editable: true,
    },
    {
        field: 'contact',
        headerName: 'Contact',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,

    },
];

export default function DataGridDemo() {
    const [contact, setContact] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [size, setSize] = React.useState(5);
    const [rowCount, setRowCount] = React.useState(0)
    const getContact = async () => {

        const temp = await getApiHandler(`/get?page=${page * 5}&size=${size}`);
        console.log("data: ", temp);
        if (temp.status === 200) {
            setContact(temp.response);
            setRowCount(temp.length);

        }

    };
    const jsonPdf = (p) => {
        console.log("p", p)
        const doc = new jsPDF();

        doc.text('Student details', 20, 10);
        doc.autoTable({
            columns: [
                // { title: 'Name', field: "name", dataKey: 'name' },
                // { title: 'Email', field: "email", dataKey: 'email' },
                // { title: 'Contact', field: "contact", dataKey: 'contact' },
                { header: 'Name', dataKey: 'name' },
                { header: 'Email', dataKey: 'email' },
                { header: 'Contact', dataKey: 'contact' },
            ],


            body: p


        })
        doc.save("table1.pdf");

    }

    const excelConverter = (d) => {
        const workSheet = XLSX.utils.json_to_sheet((d))

        const workBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workBook, workSheet, "students")
        XLSX.writeFile(workBook, "studentsData.xlsx")
    }
    React.useEffect(() => {
        getContact(page);
    }, [page]);
    return (
        <MainLayout>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={contact}
                    columns={columns}

                    getRowId={(contact) => contact._id}
                    onPageChange={(newpage) => { setPage(newpage) }}
                    // onPaginationModelChange={(newpage) => { console.log("newpage", newpage); setPage(newpage) }}
                    onPageSizeChange={(newPageSize) => setSize(newPageSize)}
                    pageSizeOptions={[5]}
                    page={page}
                    pageSize={size}
                    // count={10}
                    checkboxSelection
                    disableRowSelectionOnClick
                    rowsPerPageOptions={[5]}
                    paginationMode="server"
                    pagination
                    rowCount={rowCount}
                />

            </Box>
            <Button onClick={() => excelConverter(contact)}>excel</Button>
            <Button onClick={() => jsonPdf(contact)}>pdf</Button>

        </MainLayout>
    );
}