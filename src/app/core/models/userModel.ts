export interface UserModel {
    id?: string;
    name: string;
    lastName: string;
    imageUrl?: string;
    phone?: string;
    state?: string;
    city?: string;
    email?: string;
    birthDate?: string;  // yyyy-mm-dd
    password?: string;
    confirmPassword?: string;
    role?: string; // 'user' | 'admin'
    active?: boolean;
    shouldChangePassword?: boolean;
    emailValidated?: boolean;
    creationDate?: string;
    identification?: string;
    token?: string;
    cityName?: string;
    stateName?: string;
    regionName?: string;
    age?: number;
    actorTypeId?: string;
    establishment?: string;
    actorTypeName?: string;
}
