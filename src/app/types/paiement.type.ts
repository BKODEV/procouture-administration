// Définition du type Paiement
export type Paiement = {
    id: number;
    transaction_id: string;
    amount: number;
    currency: string;
    description: string;
    formule: string;
    customer_name: string;
    customer_surname: string;
    customer_phone_number: string;
    customer_address: string;
    customer_city: string;
    customer_country: string;
    customer_state: string;
    customer_zip_code: string;
    status: boolean;
};

export type ResponseHttpPaiement = {
    message: string;
    data: {
        paiements : Paiement[]
    };
}