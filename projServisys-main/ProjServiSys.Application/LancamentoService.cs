using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjServiSys.Application.Contratos;
using ProjServiSys.Persistence.Contratos;
using ProjServiSys.Application.Dto;
using AutoMapper;
using ProjServiSys.Domain;


namespace ProjServiSys.Application
{
    public class LancamentoService : ILancamentoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly ILancamentoPersist _lancamentoPersist;
        private readonly IMapper _mapper;


        public LancamentoService(IGeralPersist geralPersist, ILancamentoPersist lancamentoPersist, IMapper mapper)
        {
            _geralPersist = geralPersist;
            _lancamentoPersist = lancamentoPersist;
            _mapper = mapper;
        }


        public async Task AddLancamento(int ordemServicoId, LancamentoDto model)
        {
            try
            {
                var lancamento = _mapper.Map<Lancamento>(model);
                lancamento.OrdemServicoId = ordemServicoId;

                _geralPersist.Add<Lancamento>(lancamento);
                
                await _geralPersist.SaveChangesAsync();
                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task UpdateLancamento(int ordemServicoId, LancamentoDto model)
        {
            var lancamentos = await _lancamentoPersist.GetLancamentoByOrdemServicoIdAsync(ordemServicoId);
            try
            {
                var lancamento = lancamentos.FirstOrDefault(lanc => lanc.Id == model.Id);
                model.OrdemServicoId = ordemServicoId;

                _mapper.Map(model, lancamento);

                _geralPersist.Update<Lancamento>(lancamento);

                await _geralPersist.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<LancamentoDto[]> SaveLancamentos(int ordemServicoId, LancamentoDto[] modelLancamento)
        {
            try
            {
                var lancamentos = await _lancamentoPersist.GetLancamentoByOrdemServicoIdAsync(ordemServicoId);
                if (lancamentos == null) return null;

                foreach (var modelLanc in modelLancamento)
                {
                    if (modelLanc.Id == 0)
                    {
                        await AddLancamento(ordemServicoId, modelLanc);
                    }
                    else
                    {
                        await UpdateLancamento(ordemServicoId, modelLanc);
                    }
                }

                var lancamentoRetorno = await _lancamentoPersist.GetLancamentoByOrdemServicoIdAsync(ordemServicoId);

                return _mapper.Map<LancamentoDto[]>(lancamentoRetorno);


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LancamentoDto[]> GetLancamentoByOrdemServicoIdAsync(int ordemServicoId)
        {
            try
            {
                var lancamentos = await _lancamentoPersist.GetLancamentoByOrdemServicoIdAsync(ordemServicoId);
                if (lancamentos == null) return null;

                var lancamentosResult = _mapper.Map<LancamentoDto[]>(lancamentos);

                return lancamentosResult;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}