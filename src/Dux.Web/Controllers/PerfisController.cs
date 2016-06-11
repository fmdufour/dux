using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dux.Application;
using Dux.Domain.Interfaces;
using Dux.Domain;
using Dux.Web.ViewModels;
using AutoMapper;

namespace Dux.Web.Controllers
{
    public class PerfisController : Controller
    {
        private readonly IPerfilDistribuicaoService _perfilDistService;
        private readonly ICasaService _casaService;
        private readonly IPerfilListaService _perfilListaService;

        public PerfisController(IPerfilDistribuicaoService perfilDistService, 
                                IPerfilListaService perfilListaService,
                                ICasaService casaService)
        {
            _perfilDistService = perfilDistService;
            _casaService = casaService;
            _perfilListaService = perfilListaService;
        }

        [Authorize]
        [HttpGet("api/perfis/GetPerfisDistribuicao")]
        public IActionResult GetPerfisDistribuicao()
        {
            int casaId = Util.GetCasaUsuario(HttpContext.User);

            List<PerfilDistribuicao> perfis = _perfilDistService.GetPerfis(casaId);

            List<PerfilDistVM> perfisVM = Mapper.Map<List<PerfilDistVM>>(perfis);

            return Ok(perfisVM);
        }

        [Authorize(Policy = "PerfilDist")]
        [HttpGet("api/perfis/GetEditarDist/{perfilId}")]
        public IActionResult GetEditarDist(int perfilId)
        {
            int casaId = Util.GetCasaUsuario(HttpContext.User);
            PerfilDistribuicao perfilDist = _perfilDistService.GetPerfilTodosUsuarios(perfilId, casaId);

            PerfilDistVM perfilDistVM = Mapper.Map<PerfilDistVM>(perfilDist);

            List<Usuario> usuarios = _casaService.GetUsuariosDistCasa(casaId);

            foreach (var usuario in usuarios)
            {
                perfilDistVM.LayoutsDistribuicao.First(p => p.UsuarioId.Equals(usuario.Id)).nome = usuario.Nome;             
            }

            return Json(perfilDistVM);
        }

        [Authorize(Policy = "PerfilDist")]
        [HttpPost("api/perfis/EditaPerfilDist")]
        public IActionResult EditaPerfilDist([FromBody]PerfilDistVM perfilDistVM)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);

            }
            int casaId = Util.GetCasaUsuario(HttpContext.User);

            PerfilDistribuicao perfilDist = Mapper.Map<PerfilDistribuicao>(perfilDistVM);

            perfilDist.CasaId = casaId;

            _perfilDistService.EditaPerfil(perfilDist, casaId);

            return Ok();
        }


        [Authorize(Policy = "PerfilDist")]
        [HttpPost("api/perfis/SalvaDist")]
        public IActionResult SalvaDist([FromBody]PerfilDistVM perfilDistVM)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            int casaId = Util.GetCasaUsuario(HttpContext.User);

            PerfilDistribuicao perfilDist = Mapper.Map<PerfilDistribuicao>(perfilDistVM);
            perfilDist.CasaId = casaId;

            _perfilDistService.CriaPerfil(perfilDist);

            return Ok();
        }

        [Authorize(Policy = "PerfilDist")]
        [HttpDelete("api/perfis/excluiPerfilDist/{perfilId}")]
        public IActionResult ExcluiPerfilDist(int perfilId)
        {
            int casaId = Util.GetCasaUsuario(HttpContext.User);

            _perfilDistService.ExcluiPerfil(perfilId, casaId);

            return Ok();
        }

        [Authorize]
        [HttpGet("api/perfis/getperfislista")]
        public IActionResult GetPerfisLista()
        {
            int casaId = Util.GetCasaUsuario(HttpContext.User);

            List<PerfilLista> perfis = _perfilListaService.GetPerfis(casaId);

            List<PerfilListaVM> perfisVM = Mapper.Map<List<PerfilListaVM>>(perfis);

            return Ok(perfisVM);
        }

        [Authorize]
        [HttpGet("api/perfis/getperfillista/{id}")]
        public IActionResult GetPerfilLista(int id)
        {
            int casaId = Util.GetCasaUsuario(User);

            PerfilLista perfilLista = _perfilListaService.GetPerfilIncl(id, casaId);

            PerfilListaVM perfilListaVM = Mapper.Map<PerfilListaVM>(perfilLista);

            return Ok(perfilListaVM);
        }

        [Authorize(Policy = "PerfilLista")]
        [HttpPost("api/perfis/salvaLista")]
        public IActionResult SalvaLista([FromBody]PerfilListaVM perfilListaVM)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            List<string> erros = new List<string>();

            int casaId = Util.GetCasaUsuario(User);

            PerfilLista perfilLista = Mapper.Map<PerfilLista>(perfilListaVM);
            perfilLista.CasaId = casaId;

            if (perfilLista.Id > 0)
            {
                erros = _perfilListaService.EditaPerfil(perfilLista, casaId);
            }
            else
            {
                erros = _perfilListaService.SalvaPerfil(perfilLista);
            }

            if (erros.Count > 0)
            {
                erros.ForEach(p => ModelState.AddModelError("", p));
                return new BadRequestObjectResult(ModelState);
            }

            return Ok();
        }

        public IActionResult Index()
        {
            return View();
        }

        [Authorize(Policy = "PerfilLista")]
        public IActionResult Listas()
        {
            return View();
        }

        [Authorize(Policy = "PerfilLista")]
        public IActionResult ListasCriar()
        {
            return View();
        }

        [Authorize(Policy = "PerfilLista")]
        public IActionResult ListasEditar()
        {
            return View();
        }

        [Authorize(Policy = "PerfilDist")]
        public IActionResult Distribuicao()
        {
            return View();
        }

        [Authorize(Policy = "PerfilDist")]
        public IActionResult DistribuicaoCriar()
        {
            return View();
        }

        [Authorize(Policy = "PerfilDist")]
        public IActionResult DistribuicaoEditar()
        {
            return View();
        }
    }
}
