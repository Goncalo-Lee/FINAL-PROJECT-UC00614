import React from 'react';
import {DataTableUsers} from "@/components/data-table-users";
import { getUsers} from '@/server/users'

export default async function Users() {
    const users = await getUsers();

    // PASSING THE OBJECT TO AN ARRAY
    const usersList = users.data ?? []; // ou response.users ?? []

    return (

        <div>
            Tabela de Users
            <DataTableUsers users={usersList}/>
        </div>
    );
}

