// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import ApiService from '@/app/services/api.service';
// import {useIDContext} from "@/app/context/customerIdProvider"; // Your API service file
//
// interface DataContextType {
//     data: any;
//     loading: boolean;
// }
//
// const DataContext = createContext<DataContextType | undefined>(undefined);
//
// export const DataProvider = ({ children }: { children: ReactNode }) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const {selectedId}=useIDContext()
//
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await ApiService.getCustomerById(selectedId);
//             setData(response.data.data);
//             setLoading(false);
//         };
//         fetchData()
//     }, [selectedId]);
//
//     return (
//         <DataContext.Provider value={{ data, loading }}>
//             {children}
//         </DataContext.Provider>
//     );
// };
//
// export const useDataContext = () => {
//     const context = useContext(DataContext);
//     if (context === undefined) {
//         throw new Error('useDataContext must be used within a DataProvider');
//     }
//     return context;
// };
