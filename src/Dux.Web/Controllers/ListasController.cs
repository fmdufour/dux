using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dux.Domain.Interfaces;
using Dux.Domain;
using Dux.Application;
using AutoMapper;
using Dux.Web.ViewModels;


namespace Dux.Web.Controllers
{
    public class ListasController : Controller
    {
        private readonly IListaService _listaService;

        public ListasController(IListaService listaService)
        {
            _listaService = listaService;
        }

        [Authorize(Policy = "ListasOuPromoter")]
        [HttpGet("api/listas/{listaId}")]
        public IActionResult GetLista(int listaId)
        {
            if (listaId == 0)
            {
                return BadRequest();
            }

            int casaId = Util.GetCasaUsuario(User);
            string usuarioId = Util.GetIdUsuario(User);

            Lista lista = _listaService.GetLista(listaId, casaId, usuarioId);
            ListaVM listaVM = Mapper.Map<ListaVM>(lista);

            return Ok(listaVM);
        }


        [Authorize(Policy = "Listas")]
        [HttpPost("api/listas")]
        public IActionResult SalvaLista([FromBody]ListaVM listaVM)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            int casaId = Util.GetCasaUsuario(User);
            Lista lista = Mapper.Map<Lista>(listaVM);

            if (listaVM.Id > 0)
            {
                _listaService.EditaLista(lista, casaId);
            }
            else
            {
                _listaService.CriaLista(lista, casaId, listaVM.PerfilDistribuicaoId);
            }

            return Ok();
        }

        [Authorize(Policy = "ListasOuPromoter")]
        [HttpGet("api/listas/getListasEvento/{eventoId}")]
        public IActionResult GetListasEvento(int eventoId)
        {
            if (eventoId == 0)
            {
                return BadRequest();
            }

            int casaId = Util.GetCasaUsuario(User);
            string usuarioId = Util.GetIdUsuario(User);

            List<Lista> listas = _listaService.GetListasEvento(eventoId, casaId, usuarioId);

            List<ListaVM> listasVM = Mapper.Map<List<ListaVM>>(listas);

            return Ok(listasVM);
        }

        [Authorize(Policy = "Promoter")]
        [HttpGet("api/listas/getlistaspromoter/{eventoId}")]
        public IActionResult GetListasPromoter(int eventoId)
        {
            string usuarioId = Util.GetIdUsuario(User);
            int casaId = Util.GetCasaUsuario(User);

            List<ListaPromoter> listas = _listaService.GetListasPromoter(eventoId, usuarioId, casaId);

            return Ok(listas);
        }


        [Authorize(Policy = "ListasOuPromoter")]
        public IActionResult Consulta()
        {
            return View();
        }

        [Authorize(Policy = "Listas")]
        public IActionResult Criar()
        {
            return View();
        }

    }
}
