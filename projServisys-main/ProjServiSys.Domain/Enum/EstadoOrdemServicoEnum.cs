using System.Text.Json.Serialization;

namespace ProjServiSys.Domain.Enum
{
    //[JsonConverter(typeof(JsonStringEnumConverter))]
    public enum EstadoOrdemServicoEnum
    {
        EmAnálise = 1,
        Aprovada,
        NãoAprovada,
        Concluída,
        EmAndamento,
        ItemParaCompra
    }
}
