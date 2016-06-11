using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dux.Web.ViewModels;
using Dux.Application;
using Dux.Domain.Interfaces;
using Dux.Domain;
using System.Collections.Generic;
using AutoMapper;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.Controllers{

	public class NomeListaController : Controller
    {
        private readonly INomeListaService _nomeListaService;

        public NomeListaController(INomeListaService nomeListaService)
        {
            _nomeListaService = nomeListaService;
        }

        [Authorize(Policy = "Promoter")]
        [HttpGet("api/nomelista/promoter/{listaId}")]
        public IActionResult GetNomesPromoter (int listaId)
        {
            string usuarioId = Util.GetIdUsuario(User);

            List<NomeLista> nomes = _nomeListaService.GetNomesPromoter(listaId, usuarioId);

            List<NomeVM> nomesVM = Mapper.Map<List<NomeVM>>(nomes);

            return Ok(nomesVM);
        }



        [Authorize(Policy = "VerLista")]
        [HttpGet("api/nomelista/getnomes/{listaId}")]
        public async Task<IActionResult> GetNomesLista(int listaId)
        {
            string usuarioId = Util.GetIdUsuario(User);
            int casaId = Util.GetCasaUsuario(User);

            List<NomeLista> nomes = await _nomeListaService.GetNomesLista(listaId, casaId, usuarioId);

            List<NomeListaVM> nomesVM = Mapper.Map<List<NomeListaVM>>(nomes);

            return Ok(nomesVM);
        }

        [Authorize(Policy = "VerLista")]
        [HttpGet("api/nomelista/getnomesevento/{eventoId}")]
        public async Task<IActionResult> GetNomesEvento(int eventoId)
        {
            string usuarioId = Util.GetIdUsuario(User);
            int casaId = Util.GetCasaUsuario(User);

            List<NomeListaGeral> nomes = await _nomeListaService.GetNomesEvento(eventoId, casaId, usuarioId);            

            return Ok(nomes);
        }


        public class ParamPresenca{
            public int listaId { get; set; }
            public int nomeId { get; set; }
        }


        [Authorize(Policy = "ConfPresenca")]
        [HttpPost("api/nomelista/confpresenca")]
        public IActionResult ConfPresenca([FromBody]ParamPresenca param)
        {            
            int casaId = Util.GetCasaUsuario(User);
            string usuarioId = Util.GetIdUsuario(User);

            _nomeListaService.ConfirmaPresenca(param.nomeId, param.listaId, casaId, usuarioId);

            return Ok();
        }

    }
    
}