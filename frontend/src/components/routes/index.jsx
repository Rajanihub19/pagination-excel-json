import React from "react";
import { Route, Routes } from "react-router-dom";
import DragDrop from "../pages/dropdrag";
import Pagination from "../pages/manualtable";
import DataGridDemo from "../table/table";
export default function AllRoutes() {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/adduser" element={<DragDrop />} />
            <Route path="/" element={<DataGridDemo />} />
            <Route path="/table" element={<Pagination />} />
            {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
        </Routes>
    );
}