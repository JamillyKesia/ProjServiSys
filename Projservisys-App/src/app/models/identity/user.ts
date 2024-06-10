import { OrdemServico } from "../ordem-servico";

export class User {
    id: number;
    userName: string;
    primeiroNome: string;
    ultimoNome: string;
    cargo: CargoEnum;
    tipoUsuario: TipoUsuarioEnum;
    email: string;
    password: string;
    token: string;
    ordensDeServico?: OrdemServico[];

    constructor(
        id: number,
        userName: string,
        primeiroNome: string,
        ultimoNome: string,
        cargo: CargoEnum,
        tipoUsuario: TipoUsuarioEnum,
        email: string,
        password: string,
        token: string,
        ordensDeServico?: OrdemServico[]
    ) {
        this.id = id;
        this.userName = userName;
        this.primeiroNome = primeiroNome;
        this.ultimoNome = ultimoNome;
        this.cargo = cargo;
        this.tipoUsuario = tipoUsuario;
        this.email = email;
        this.password = password;
        this.token = token;
        this.ordensDeServico = ordensDeServico;
    }
}


export enum TipoUsuarioEnum {
    Solicitante = 'Solicitante',
    Coordenador_TI = 'Coordenador_TI',
    Tecnico = 'Tecnico',
    Administrador = 'Administrador'
}

export enum CargoEnum {
    Diretor = 'Diretor',
    Coordenador = 'Coordenador',
    Professor = 'Professor',
    Secretario = 'Secretario',
    OrientadorEducacional = 'OrientadorEducacional',
    TecnicoInformatica = 'TecnicoInformatica',
    CoordenadorTI = 'Coordenador_TI'
}