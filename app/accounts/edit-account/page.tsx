'use client'
import {useIDContext} from "@/app/context/customerIdProvider";
import Accounts from "@/app/_Components/accounts/accounts";

export default function EditAccountPage() {
    const { selectedId } = useIDContext(); // Access the selected ID from context


    if (!selectedId) return <div className="loader"></div>; // Wait until ID is available

    return <Accounts mode="edit" selectedId={selectedId} />;
}
