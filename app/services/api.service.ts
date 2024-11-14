import axios from 'axios';

class ApiService {
    private _basePath = 'https://crm-api-service-81hu.onrender.com/api/';





    async getCustomers() {
        return await axios.get(
            this._basePath + 'customers',
        );
    };

    async getCustomerById(id: number | null) {
        return await axios.get(
            this._basePath + 'customers/' + id,
        );
    };

    async postCustomers(value:string) {
        return await axios.post(
            this._basePath + 'customers',
            value,
        );
    };

    async editCustomer(id: number |null, values:string ) {
        try {
            const response = await axios.put(
                `${this._basePath}customers/${id}`,
                values
            );
            return response.data;
        } catch (error) {
            console.error('Error edit customer:', error);
            throw error;
        }
    }

    async addComment( values:string,id: number |null ) {
        try {
            const response = await axios.post(
                `${this._basePath}customers/${id}/comments`,
                {
                    "comment": values
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error edit customer:', error);
            throw error;
        }
    }

    async updateCustomerStatus(id: number | null, values: { status: string }) {
        try {
            const response = await axios.patch(
                `${this._basePath}customers/${id}`,
                values
            );
            return response.data;
        } catch (error) {
            console.error('Error edit customer:', error);
            throw error;
        }
    }async updateLeadStatus(id: number | null, values: { status: string }) {
        try {
            const response = await axios.patch(
                `${this._basePath}leads/${id}`,
                values
            );
            return response.data;
        } catch (error) {
            console.error('Error edit customer:', error);
            throw error;
        }
    }

    async deleteCustomer(id:number) {
        try {
            const response = await axios.delete(`${this._basePath}customers/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting customer:', error);
            throw error;
        }
    }



    async getLeads() {
        return await axios.get(
            this._basePath + 'leads',
        );
    };


    async getLeadById(id: number | null) {
        return await axios.get(
            this._basePath + 'leads/' + id,
        );

    };

    async postLeads(value:string) {
        return await axios.post(
            this._basePath + 'leads',
            value,
        );
    };

    // TODO
    async editLead(id: number |null, values:string ) {
        try {
            const response = await axios.put(
                `${this._basePath}leads/${id}`,
                values
            );
            return response.data;
        } catch (error) {
            console.error('Error edit customer:', error);
            throw error;
        }
    }

    async deleteLead(id:number) {
        try {
            const response = await axios.delete(`${this._basePath}leads/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting leads:', error);
            throw error;
        }
    }




    async getAccounts() {
        return await axios.get(
            this._basePath + 'accounts',
        );
    };

    async getAccountById(id: number | null) {
        return await axios.get(
            this._basePath + 'accounts/' + id,
        );
    };

    async postAccounts(value:string) {
        return await axios.post(
            this._basePath + 'accounts',
            value,
        );
    };

    async editAccount(id: number |null, values:string ) {
        try {
            const response = await axios.put(
                `${this._basePath}accounts/${id}`,
                values
            );
            return response.data;
        } catch (error) {
            console.error('Error edit accounts:', error);
            throw error;
        }
    }

    async deleteAccount(id:number) {
        try {
            const response = await axios.delete(`${this._basePath}accounts/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting customer:', error);
            throw error;
        }
    }

    async deleteAccountContact(id:number,cId:number) {
        try {
            const response = await axios.delete(`${this._basePath}accounts/${id}/contacts/${cId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting customer:', error);
            throw error;
        }
    }



}

const service = new ApiService();

export default service;
