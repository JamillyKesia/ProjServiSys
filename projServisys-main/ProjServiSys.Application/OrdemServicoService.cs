using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjServiSys.Application.Contratos;
using ProjServiSys.Application.Dto;
using ProjServiSys.Persistence.Contratos;
using ProjServiSys.Domain;
using ProjServiSys.Domain.Enum;

namespace ProjServiSys.Application
{
    public class OrdemServicoService : IOrdemServicoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IOrdemServicoPersist _ordemServiscoPersist;
        private readonly IMapper _mapper;

        public OrdemServicoService(IGeralPersist geralPersist, IOrdemServicoPersist ordemServicoPersist, IMapper mapper)
        {
            _geralPersist = geralPersist;
            _ordemServiscoPersist = ordemServicoPersist;
            _mapper = mapper;
        }
        public async Task<OrdemServicoDto> AddOrdensServico(int userId, OrdemServicoDto model)
        {
            try
            {
                var ordemServico = _mapper.Map<OrdemServico>(model);
                ordemServico.UserId = userId;

                _geralPersist.Add<OrdemServico>(ordemServico);
                if (await _geralPersist.SaveChangesAsync())
                {
                    var ordemRetorno = await _ordemServiscoPersist.GetOrdemServicoByIdAsync(userId, ordemServico.Id);
                    return _mapper.Map<OrdemServicoDto> (ordemRetorno);
                }

                return null;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<OrdemServicoDto> UpdateOrdemServico(int userId, int osId, OrdemServicoDto model)
        {
            try
            {
                var ordemServico = await _ordemServiscoPersist.GetOrdemServicoByIdAsync(userId, osId);
                if (ordemServico == null) return null;

                model.Id = ordemServico.Id;
                model.UserId = userId;

                _mapper.Map(model, ordemServico);

                _geralPersist.Update<OrdemServico>(ordemServico);
                if(await _geralPersist.SaveChangesAsync())
                {
                    var ordemRetorno = await _ordemServiscoPersist.GetOrdemServicoByIdAsync(userId, ordemServico.Id);
                    return _mapper.Map<OrdemServicoDto>(ordemRetorno);
                }

                return null;

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<OrdemServicoDto> UpdateMudarStatusOrdemServico(int userId, int osId, EstadoOrdemServicoEnum novoStatus)
        {
            try
            {
                var ordemServico = await _ordemServiscoPersist.GetOrdemServicoByIdAsync(userId, osId);
                if (ordemServico == null) return null;

                ordemServico.EstadoOrdemServico = novoStatus;

                _geralPersist.Update<OrdemServico>(ordemServico);
                if (await _geralPersist.SaveChangesAsync())
                {
                    var ordemRetorno = await _ordemServiscoPersist.GetOrdemServicoByIdAsync(userId, ordemServico.Id);
                    return _mapper.Map<OrdemServicoDto>(ordemRetorno);
                }

                return null;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<OrdemServicoDto> UpdateAprovadoOrdemServico(int userId, int osId)
        {
            try
            {
                var ordemServico = await _ordemServiscoPersist.GetOrdemServicoByIdAsync(userId, osId);
                if (ordemServico == null) return null;

                ordemServico.EstadoOrdemServico = EstadoOrdemServicoEnum.Aprovada;

                _geralPersist.Update<OrdemServico>(ordemServico);
                if (await _geralPersist.SaveChangesAsync())
                {
                    var ordemRetorno = await _ordemServiscoPersist.GetOrdemServicoByIdAsync(userId, ordemServico.Id);
                    return _mapper.Map<OrdemServicoDto>(ordemRetorno);
                }

                return null;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<OrdemServicoDto> UpdateRejeitadaOrdemServico(int userId, int osId)
        {
            try
            {
                var ordemServico = await _ordemServiscoPersist.GetOrdemServicoByIdAsync(userId, osId);
                if (ordemServico == null) return null;

                ordemServico.EstadoOrdemServico = EstadoOrdemServicoEnum.NãoAprovada;

                _geralPersist.Update<OrdemServico>(ordemServico);
                if (await _geralPersist.SaveChangesAsync())
                {
                    var ordemRetorno = await _ordemServiscoPersist.GetOrdemServicoByIdAsync(userId, ordemServico.Id);
                    return _mapper.Map<OrdemServicoDto>(ordemRetorno);
                }

                return null;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<OrdemServicoDto[]> GetAllOrdensServicoAsync()
        {
            try
            {
                var ordemServico = await _ordemServiscoPersist.GetAllOrdensServicoAsync();
                if (ordemServico == null) return null;

                var result = _mapper.Map<OrdemServicoDto[]>(ordemServico);

                return result;
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }


        public async Task<OrdemServicoDto[]> GetAllOrdensServicoByUsuarioAsync(int userId)
        {
            try
            {
                var ordemServico = await _ordemServiscoPersist.GetAllOrdensServicoByUsuarioAsync(userId);
                if (ordemServico == null) return null;

                var result = _mapper.Map<OrdemServicoDto[]>(ordemServico);

                return result;
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }

        public async Task<OrdemServicoDto> GetOrdemServicoByIdAsync(int userId, int OrdemServicoId)
        {
            try
            {
                var ordemServico = await _ordemServiscoPersist.GetOrdemServicoByIdAsync(userId, OrdemServicoId);
                if (ordemServico == null) return null;

                var result = _mapper.Map<OrdemServicoDto>(ordemServico);

                return result;
            }
            catch (Exception ex) { throw new Exception(ex.Message); };
        }
    }
}