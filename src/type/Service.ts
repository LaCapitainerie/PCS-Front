export interface Service {
    id: string;
    idStripe: string;
    name: string;
    price: number;
    targetCustomer: "traveler" | "lessor";
    address: string;
    city: string;
    zipCode: string;
    country: string;
    lat: number;
    lon: number;
    rangeAction: number;
    description: string;
    providerId: string;
    type: "transport" | "nettoyage" | "chauffage" | "electricite" | "jardinage" | "peinture" | "reparation" | "conciergerie";
}

export interface ServiceDTO {
    id: Service["id"];
    idStripe: Service["idStripe"];
    name: Service["name"];
    price: Service["price"];
    targetCustomer: Service["targetCustomer"];
    address: Service["address"];
    city: Service["city"];
    zipCode: Service["zipCode"];
    country: Service["country"];
    lat: Service["lat"];
    lon: Service["lon"];
    rangeAction: Service["rangeAction"];
    description: Service["description"];
    providerId: Service["providerId"];
    type: Service["type"];

    
    userId: string;
    date: string;
};

export interface ServiceReturn {
    service: Service[]
}