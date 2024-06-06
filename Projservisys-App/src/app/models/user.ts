import { OrdemServico } from "./ordem-servico";

export interface User {
    id: number;
    nomeLogin: string;
    nomeUsuario: string;
    cargo: CargoEnum;
    tipoUsuario: TipoUsuarioEnum;
    ordensDeServico?: OrdemServico[];
}

enum TipoUsuarioEnum {
    Solicitante = 'Solicitante',
    Coordenador_TI = 'CoordenadorTI',
    Tecnico = 'Tecnico',
    Administrador = 'Administrador'
}

enum CargoEnum {
    Diretor = 'Diretor',
    Coordenador = 'Coordenador',
    Professor = 'Professor',
    Secretario = 'Secretario',
    OrientadorEducacional = 'OrientadorEducacional',
    TecnicoInformatica = 'TecnicoInformatica',
    CoordenadorTI = 'CoordenadorTI'
}
