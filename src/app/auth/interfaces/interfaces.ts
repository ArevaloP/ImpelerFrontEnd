export interface AuthResponse {
    ok: boolean;
    uid?: string;
    nombre?: string;
    token?: string;
    msg?: string;
    email?: string;
    img?: string;
    apellido?: string
}

export interface Usuario{
    uId: string;
    Nombre: string;
    Apellido?: string;
    email: string;
    img?: string;
    provedor?: string;
}