using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dux.Domain.Interfaces;
using Dux.Application;
using Dux.Web.ViewModels;
using AutoMapper;
using Dux.Domain;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Dux.Web.Controllers
{
    [Route("api/[controller]")]
    public class CasaController : Controller
    {
        private readonly ICasaService _casaService;

        public CasaController(ICasaService casaService)
        {
            _casaService = casaService;
        }
         
        [Authorize]
        [HttpGet("GetCasas")]
        public IActionResult GetCasas()
        {
            string id = Util.GetIdUsuario(HttpContext.User);

            List<Casa> casas = _casaService.GetCasasUsuario(id);
            List<CasaVM> casasVM = Mapper.Map<List<CasaVM>>(casas);

            return Ok(casasVM);
        }

        [Authorize]
        [HttpGet("GetCasaSelec")]
        public IActionResult GetCasaSelec()
        {
            int casaId = Util.GetCasaUsuario(HttpContext.User);

            Casa casa = _casaService.GetCasa(casaId);

            CasaVM casaVM = Mapper.Map<CasaVM>(casa);

            return Ok(casaVM);
        }

        [Authorize]
        [HttpPost("SelecionaCasa")]
        public IActionResult SelecionaCasa([FromBody]CasaVM casa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            string usuarioId = Util.GetIdUsuario(HttpContext.User);

            Casa casaSelecionada = _casaService.SelecionaCasa(usuarioId, casa.Id);

            CasaVM casaSelVM = Mapper.Map<CasaVM>(casaSelecionada);

            return Ok(casaSelVM);
        }

    }
}
