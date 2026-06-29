import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const EndpointTable = () => {
    const datas = [
        {
            method: "GET",
            path: "/users",
            created: "22-02-2022"
        }
    ]
    return (
        <Table>
            <TableCaption>Endpoints({datas.length})</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Method
                    </TableHead>
                    <TableHead>
                        Path
                    </TableHead>
                    <TableHead>
                        Created On
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    datas.map((data,index) => (
                        <TableRow key={index}>
                            <TableCell>{data.method}</TableCell>
                            <TableCell>{data.path}</TableCell>
                            <TableCell>{data.created}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default EndpointTable;