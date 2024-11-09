'use client'

import AddLeads from "@/app/_Components/leads/leads";
import {useIDContext} from "@/app/context/customerIdProvider";

export default function EditLeadPage() {
    const { selectedId } = useIDContext(); // Access the selected ID from context


    if (!selectedId) return <div className="loader"></div>; // Wait until ID is available

    return <AddLeads mode="edit" selectedId={selectedId} />;
}
