using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjServiSys.Application.Contratos;
using ProjServiSys.Application.Dto;
using ProjServiSys.Domain.Enum;
using ProjServiSysApi.Extensions;

namespace ProjServiSysApi.Controller
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdemServicoController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IOrdemServicoService _osIService;

        public OrdemServicoController(IOrdemServicoService osIService, IAccountService accountService)
        {
            _osIService = osIService;
            _accountService = accountService;
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<OrdemServicoDto[]>> GetOrdemServico()
        {
            try
            {
                var ordensServico = await _osIService.GetAllOrdensServicoAsync();
                if (ordensServico == null) return NoContent();

                return Ok(ordensServico);

            } catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar burcar ordens. Erro: {ex.Message}");
            }
        }

       
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<OrdemServicoDto>> GetOrdemServicoById(int id)
        {
            try
            {
                var ordemServico = await _osIService.GetOrdemServicoByIdAsync(User.GetUserId(), id);
                if (ordemServico == null) return NoContent();

                return Ok(ordemServico);

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar buscar ordem. Erro: {ex.Message}");
            }
        }

        [HttpGet("usuario/{idUsuario}")]
        [AllowAnonymous]
        public async Task<ActionResult<OrdemServicoDto>> GetOrdemServicoByUsuario()
        {
            try
            {
                var ordemServico = await _osIService.GetAllOrdensServicoByUsuarioAsync(User.GetUserId());
                if (ordemServico == null) return NoContent();

                return Ok(ordemServico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar buscar ordem. Erro: {ex.Message}");
            }
            
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<OrdemServicoDto>> PostOrdemServico(OrdemServicoDto model)
        {
            try
            {
                var ordemServico = await _osIService.AddOrdensServico(User.GetUserId(), model);
                if (ordemServico == null) return NoContent();

                return Ok(ordemServico);
            }
            catch(Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar criar ordem. Erro: {ex.Message}");
            }
        }

        [HttpPatch("MudarStatus/{OrdemServicoId}")]
        public async Task<ActionResult<OrdemServicoDto>> PatchMudarStatusOrdemServico(int OrdemServicoId, EstadoOrdemServicoEnum novoStatus)
        {
            try
            {
                var ordemServico = await _osIService.UpdateMudarStatusOrdemServico(User.GetUserId(), OrdemServicoId, novoStatus);
                if (ordemServico == null) return NoContent();

                return Ok(ordemServico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar alterar ordem. Erro: {ex.Message}");
            }
        }

        [HttpPatch("Aprovado/{id}")]
        public async Task<ActionResult<OrdemServicoDto>> PatchAprovadoOrdemServico(int id)
        {
            try
            {
                var ordemServico = await _osIService.UpdateAprovadoOrdemServico(User.GetUserId(),id);
                if (ordemServico == null) return NoContent();

                return Ok(ordemServico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar alterar ordem. Erro: {ex.Message}");
            }
        }

         [HttpPatch("Rejeitado/{id}")]
        public async Task<ActionResult<OrdemServicoDto>> PatchRejeitadoOrdemServico(int id)
        {
            try
            {
                var ordemServico = await _osIService.UpdateRejeitadaOrdemServico(User.GetUserId(),id);
                if (ordemServico == null) return NoContent();

                return Ok(ordemServico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar alterar ordem. Erro: {ex.Message}");
            }
        }
    }
}