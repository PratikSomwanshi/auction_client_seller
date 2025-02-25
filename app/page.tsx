import Home from "@/components/home";
import { getSession } from "@/utils/actions";
import { redirect } from "next/navigation";
import React from "react";

async function LandingPage() {
    const session = await getSession();

    if (!session.isLoggedIn) {
        redirect("/login");
    }

    return (
        <div>
            <Home username={session.username} />
        </div>
    );
}

export default LandingPage;
