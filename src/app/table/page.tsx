import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getUsers} from "@/server/users";

export default async function Tabela() {
    const users = await getUsers();
    return (
            <Table>
            <TableCaption>Names of the users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead className="w-[100px]">Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key = {user.id}>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell className="font-medium">{user.email}</TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    )
}