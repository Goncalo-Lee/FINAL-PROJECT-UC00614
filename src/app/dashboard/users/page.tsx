import React from 'react';
import {DataTable} from "@/components/data-table";
import data from "@/app/dashboard/data.json";

function Users() {
    return (
        <div>
            Aqui podes colocar a tabela para os Users com CRUD
            <DataTable data={data} />


        </div>

    );
}

export default Users;