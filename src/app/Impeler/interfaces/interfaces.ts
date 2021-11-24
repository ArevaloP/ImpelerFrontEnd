export interface Departamento{
    region: string,
    c_digo_dane_del_departamento: string,
    departamento: string,
    c_digo_dane_del_municipio: string,
    municipio: string
}


export interface ServiceResponse{
    ok: boolean,
    msg?: string,
    Nid?: string
}