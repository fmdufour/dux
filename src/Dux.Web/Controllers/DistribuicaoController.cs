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

	public class DistribuicaoController : Controller
    {
        private readonly IDistribuicaoService _distService;
        private readonly IAuthService _authService;
        
        public DistribuicaoController(IDistribuicaoService distService, IAuthService authService)
        {
            _distService = distService;
            _authService = authService;
        }

        [Authorize(Policy = "Distribuicao")]
		[HttpPost("api/distribuicao")]
        public IActionResult SalvaDist([FromBody]DistribuicaoVM distVM)
        {
            if (distVM == null || distVM.Distribuicoes == null || distVM.Distribuicoes.Count == 0)
            {
                return BadRequest();
            }

            int casaId = Util.GetCasaUsuario(User);

            List<Distribuicao> distribuicoes = Mapper.Map<List<Distribuicao>>(distVM.Distribuicoes);

            _distService.SalvaDist(distVM.listaId, casaId, distribuicoes);

            return Ok();
        }

        [Authorize(Policy = "Distribuicao")]
		[HttpGet("api/distribuicao/{listaId}")]
		public IActionResult GetDist(int listaId)
        {
            if (listaId <= 0)
            {
                return BadRequest();
            }

            int casaId = Util.GetCasaUsuario(User);

            List<Distribuicao> distribuicoes = _distService.GetDist(casaId, listaId);

            List<LayoutDistribuicaoVM> layDist = Mapper.Map<List<LayoutDistribuicaoVM>>(distribuicoes);

            List<Usuario> usuarios = _authService.GetUsuarios(casaId);

            foreach (var dist in layDist)
            {
                dist.nome = usuarios.First(p => p.Id == dist.UsuarioId).Nome;
            }

            return Ok(layDist);
        }

        [Authorize(Policy = "Promoter")]
        [HttpGet("api/distribuicao/getqtdnomes/{listaId}")]
        public IActionResult GetQtdNomes(int listaId)
        {
            string usuarioId = Util.GetIdUsuario(User);
            Distribuicao dist = _distService.GetDistribuicao(listaId, usuarioId);

            return Ok(new
            {
                qtdNomesM = dist.qtdNomesM,
                qtdNomesF = dist.qtdNomesF
            });
        }


        [Authorize(Policy = "Distribuicao")]
		public IActionResult Criar()
        {
            return View();
        }
				
    }
}