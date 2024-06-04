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
    nickname: string;
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
    user: User;
};
