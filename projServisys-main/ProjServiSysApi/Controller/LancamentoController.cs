using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjServiSys.Application.Contratos;
using ProjServiSys.Application.Dto;

namespace ProjServiSysApi.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class LancamentoController : ControllerBase
    {
        private readonly ILancamentoService _lancamentoService;
        public LancamentoController(ILancamentoService lancamentoService)
        {
            _lancamentoService = lancamentoService;
        }

        [HttpGet("{ordemServicoId}")]
        public async Task<ActionResult> GetOrdemServico(int ordemServicoId)
        {
            try
            {
                var lancamentos = await _lancamentoService.GetLancamentoByOrdemServicoIdAsync(ordemServicoId);
                if (lancamentos == null) return NoContent();

                return Ok(lancamentos);

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar burcar lançamentos. Erro: {ex.Message}");
            }
        }

        [HttpPut("{ordemServicoId}")]
        public async Task<ActionResult> SaveLancamento(int ordemServicoId, LancamentoDto[] modelLancamento)
        {
            try
            {
                var lancamentos = await _lancamentoService.SaveLancamentos(ordemServicoId, modelLancamento);
                if (lancamentos == null) return NoContent();

                return Ok(lancamentos);

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar salvar lancamento. Erro: {ex.Message}");
            }
        }
    }
}