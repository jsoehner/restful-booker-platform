export interface Branding {
    name: string;
    map: {
        latitude: number;
        longitude: number;
    };
    logoUrl: string;
    description: string;
    contact: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
}