export interface auth_request {
    email: string;
    password: string;
}

export interface auth_response {
    access_token: string;
    id: string;
    name: string;
    email: string;
    role: string;
};

export interface register_request {
    email: string;
    password: string;
    name: string;
    phone_number: string;
}

export interface register_response {
    status: string;
    data: {
        name: string;
        email: string;
        phone_number: string;
        updated_at: string;
        created_at: string;
        id: number;
    }
}