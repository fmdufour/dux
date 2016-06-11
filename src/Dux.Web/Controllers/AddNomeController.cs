using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dux.Web.ViewModels;
using Dux.Application;
using Dux.Domain.Interfaces;
using Dux.Domain;
using System.Collections.Generic;
using AutoMapper;
using System.Linq;

namespace Dux.Web.Controllers{

	public class AddNomeController : Controller
    {
        private readonly INomeListaService _nomeListaService;

        public AddNomeController(INomeListaService nomeListaService)
        {
            _nomeListaService = nomeListaService;
        }


        [Authorize(Policy = "Promoter")]
        public IActionResult Listas()
        {
            return View();
        }

        [Authorize(Policy = "Promoter")]
        public IActionResult Add()
        {
            return View();
        }

        [Authorize(Policy = "Promoter")]
        [HttpPost("api/addnome")]
        public IActionResult AddNomes([FromBody]AddNomesVM lista)
        {
            int casaId = Util.GetCasaUsuario(User);
            string usuarioId = Util.GetIdUsuario(User);

            List<NomeLista> nomes = Mapper.Map<List<NomeLista>>(lista.Nomes);

            List<string> erros = _nomeListaService.AddNomes(nomes, lista.ListaId, casaId, usuarioId);

            if (erros.Count > 0)
            {
                foreach (var erro in erros)
                {
                    ModelState.AddModelError(erro, erro);
                }
                return new BadRequestObjectResult(ModelState);
            }            

            return Ok();
        }

    }
}