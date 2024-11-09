'use client'
import { useEffect, useState } from 'react';
import ApiService from "@/app/services/api.service";

const App = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const response = await ApiService.getCustomers();
        console.log(response.data);
        if (response && response.data) {
            setData(response.data);}
    };
        useEffect(() => {
        fetchData();

    }, []);

    return (
        <div>
            <h1>API Data</h1>
    {error && <p>Error: {error}</p>}
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
    };

    export default App;