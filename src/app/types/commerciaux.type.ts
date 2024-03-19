export interface Commercial {
    id: number;
    nom: string;
    email: string | null;
    status: boolean;
    phone: string | null;
    adresse: string | null;
    code_commercial: string;
}

export interface CommercialRequest {
    nom: string;
    email: string | null;
    phone: string | null;
    adresse: string | null;
}

export interface CommercialHttpResponse {
    status: string;
    status_code: number;
    message: string;
    data: {
        commerciaux: Commercial[];
    };
}