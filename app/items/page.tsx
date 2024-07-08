import ItemAcceptanceForm from "@/components/itemsCreatePage";
import { getSession } from "@/utils/actions";
import { redirect } from "next/navigation";
import React from "react";

async function ItemsAddPage() {
    const session = await getSession();

    if (!session.isLoggedIn) {
        redirect("/login");
    }

    return (
        <div>
            <ItemAcceptanceForm
                seller={session.username}
                token={session.token}
            />
        </div>
    );
}

export default ItemsAddPage;
