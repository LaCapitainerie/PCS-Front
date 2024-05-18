export interface User {
    id: string;
    type: "traveler" | "provider" | "lessor" | "admin";
    mail: string;
    password: string;
    registerdate: string;
    lastConnectionDate: string;
    avatar: string;
    description: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    token: string;
};

export interface UserReturnDTO {
    error: any;
    user: UserDTO;
}

export interface TokenDTO {
    token: User["token"];
}

export interface Token {
    idUser: User["id"];
    exp: number;
}

export interface UserDTO {
    id: User["id"];
    type: User["type"];
    mail: User["mail"];
    registerdate: User["registerdate"];
    lastConnectionDate: User["lastConnectionDate"];
    avatar: User["avatar"];
    description: User["description"];
    firstName: User["firstName"];
    lastName: User["lastName"];
    phoneNumber: User["phoneNumber"];
    token: User["token"];
};
