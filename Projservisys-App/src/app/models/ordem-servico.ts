import { EstadoOrdemServicoEnum } from "./Enum/estado-ordem-servico-enum";
import { User } from "./user";

export interface OrdemServico {
    cadastrarOrdem(arg0: { id: number; dataOrdemServico: Date; descricaoProblema: string; aprovada: boolean; localEquipamento: string; tipoEquipamento: string; serialEquipamento: string; estadoOrdemServico: EstadoOrdemServicoEnum | undefined; userId: number; user: User | undefined; }): unknown;
    id: number;
    dataOrdemServico: Date;
    descricaoProblema: string;
    aprovada: boolean;
    localEquipamento: string;
    tipoEquipamento: string;
    serialEquipamento: string;
    posicaoEquipamento: string
    estadoOrdemServico: EstadoOrdemServicoEnum;
    userId: number;
    user: User;

}