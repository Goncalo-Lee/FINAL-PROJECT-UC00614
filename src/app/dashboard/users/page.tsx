import React from 'react';
import {DataTableUsers} from "@/components/data-table-users";
import { getUsers} from '@/server/users'

export default async function Users() {
    const users = await getUsers();

    // PASSING THE OBJECT TO AN ARRAY
    const usersList = users.data ?? []; // ou response.users ?? []

    return (

        <div>
            <h1 className="text-3xl text-center">Users table</h1>
            <DataTableUsers users={usersList}/>
        </div>
    );
}

