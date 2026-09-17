"use server"

import { db } from "@/db/index";
import { account} from "@/src/db/schema";

export async function contactUsAction(formData: FormData) {
    await db.insert(account).values(formData);

}