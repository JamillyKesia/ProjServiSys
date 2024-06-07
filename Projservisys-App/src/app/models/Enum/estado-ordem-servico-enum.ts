export enum EstadoOrdemServicoEnum {
  EmAnalise = "EmAnálise",
  Aprovada = "Aprovada",
  NaoAprovada = "NãoAprovada",
  Concluida = "Concluída",
  EmAndamento = "EmAndamento",
  ItemParaCompra = "ItemParaCompra"
}

// ordem-servico.ts
export interface OrdemServico {
  id: number;
  primeiroNome: string;
  descricaoProblema: string;
  estadoOrdemServico: EstadoOrdemServicoEnum;
}
