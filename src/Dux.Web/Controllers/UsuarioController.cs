using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Dux.Domain.Interfaces;
using Dux.Application;
using Dux.Domain;
using AutoMapper;
using Dux.Web.ViewModels;
using System.Net;

namespace Dux.Web.Controllers
{
    
    public class UsuarioController : Controller
    {
        private readonly IAuthService _authService;
        private readonly ICasaService _casaService;

        public UsuarioController(IAuthService authService, ICasaService casaService)
        {
            _authService = authService;
            _casaService = casaService;
        }
        [Authorize]        
        [HttpGet("api/usuario/getUsuarioLogado")]        
        public IActionResult GetUsuarioLogado()
        {
            var a = HttpContext.User.Identity;

            return Ok(new
            {
                nome = User.Identity.Name,
                foto = @"http://appstudio.windows.com/Content/img/temp/icon-user.png"
            });
        }

        [Authorize]
        [HttpGet("api/usuario/getUsuariosDist")]
        public IActionResult GetUsuariosDist()
        {
            int casaId = Util.GetCasaUsuario(User);

            List<Usuario> usuarios = _casaService.GetUsuariosDistCasa(casaId);

            List<UsuarioDistVM> usuariosVM = Mapper.Map<List<UsuarioDistVM>>(usuarios);

            return Ok(usuariosVM);
        }

        [Authorize]
        [HttpGet("api/usuario")]
        public IActionResult GetUsuarios()
        {
            int casaId = Util.GetCasaUsuario(User);

            List<Usuario> usuarios = _authService.GetUsuarios(casaId);

            List<UsuarioVM> usuariosVM = Mapper.Map<List<UsuarioVM>>(usuarios);

            foreach (var usuario in usuarios)
            {
                if (usuario.CasasUsuario.First(p => p.CasaId.Equals(casaId)).Bloqueado)
                {
                    usuariosVM.First(p => p.Id.Equals(usuario.Id)).Status = StatusUsuario.Bloqueado;
                }
            }

            return Ok(usuariosVM);
        }
        
        [Authorize]
        [HttpGet("api/usuario/{usuarioId}")]
        public IActionResult GetUsuario(string usuarioId)
        {
            int casaId = Util.GetCasaUsuario(User);

            Usuario u = _authService.GetUsuario(usuarioId, casaId);

            UsuarioVM uVM = Mapper.Map<UsuarioVM>(u);

            return Ok(uVM);
        }


        [Authorize(Policy = "AddUsuario")]
        [HttpPost("api/usuario")]
        public async Task<IActionResult> SalvaUsuario([FromBody]UsuarioCriarVM usuarioVM)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }            

            Usuario usuario = Mapper.Map<Usuario>(usuarioVM);

            if (usuarioVM.Casas == null | usuarioVM.Casas.Count == 0)
            {
                ModelState.AddModelError("", "Selecione ao menos uma casa para o usuário");
                return new BadRequestObjectResult(ModelState);
            }

            string usuarioId = Util.GetIdUsuario(User);

            await _authService.SalvaUsuario(usuario, usuarioVM.Casas, usuarioId);

            return Ok();
        }

        [Authorize(Policy = "Promoter")]
        [HttpPost("api/usuario/comissario/bloquear")]
        public async Task<IActionResult> BloquearComissario([FromBody] string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return new StatusCodeResult(400);
            }
            int casaId = Util.GetCasaUsuario(User);
            string promoterId = Util.GetIdUsuario(User);

            await _authService.BloqueiaComissarioAsync(promoterId, id, casaId);

            return Ok();
        }


        [Authorize(Policy = "Promoter")]
        [HttpPost("api/usuario/comissario/desbloquear")]
        public async Task<IActionResult> DesbloquearComissario([FromBody] string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return new StatusCodeResult(400);
            }
            int casaId = Util.GetCasaUsuario(User);
            string promoterId = Util.GetIdUsuario(User);

            await _authService.DesbloqueiaComissarioAsync(promoterId, id, casaId);

            return Ok();
        }

        [Authorize(Policy = "BloqUsuario")]
        [HttpPost("api/usuario/bloquear")]
        public async Task<IActionResult> Bloquear([FromBody] string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return new StatusCodeResult(400);
            }
            int casaId = Util.GetCasaUsuario(User);

            await _authService.BloqueiaUsuarioAsync(id, casaId);

            return Ok();
        }

        [Authorize(Policy = "BloqUsuario")]
        [HttpPost("api/usuario/desbloquear")]
        public async Task<IActionResult> Desbloquear([FromBody] string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest();
            }

            int casaId = Util.GetCasaUsuario(User);

            await _authService.DesbloqueiaUsuarioAsync(id, casaId);

            return Ok();
        }

        [HttpPost("api/usuario/resetaSenha")]
        public async Task<IActionResult> ResetaSenha([FromBody]ResetaSenhaVM model)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            List<string> erros = await _authService.ResetaSenha(model.Email, model.Senha, model.Code);

            if (erros.Count == 0)
            {
                return Ok();
            }            
            else
            {
                foreach (var erro in erros)
                {
                    ModelState.AddModelError(erro, erro);
                }
                return new BadRequestObjectResult(ModelState);
            }
        }



        [HttpPost("api/usuario/enviaSenha")]
        public async Task<IActionResult> EnviaSenha([FromBody]EnviaSenhaVM vm)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            await _authService.EnviaFormResetSenha(vm.Email);

            return Ok();
        }


        public IActionResult ResetSenha(string code = null)
        {
            ViewBag.Code = code;
            return code == null ? View("ErroSenha") : View();
        }

        [Authorize(Policy = "AcessoUsuario")]
        [HttpGet("api/usuario/todosAcessos")]
        public IActionResult TodosAcessos()
        {
            return Ok(_authService.GetTodosAcessos());
        }

        [Authorize(Policy = "AcessoUsuario")]
        [HttpGet("api/usuario/acessos/{userId}")]
        public async Task<IActionResult> Acessos(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return BadRequest();
            }

            int casaId = Util.GetCasaUsuario(User);

            List<Acessos> acessos = await _authService.GetAcessosUsuario(userId, casaId);

            return Ok(acessos);
        }

        [Authorize(Policy = "AcessoUsuario")]
        [HttpPost("api/usuario/defineAcessos")]
        public async Task<IActionResult> DefineAcessos([FromBody]DefineAcessosVM acessos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            int casaId = Util.GetCasaUsuario(User);

            await _authService.DefineAcessos(acessos.UsuarioId, casaId, acessos.Acessos);

            return Ok();
        }

        [Authorize(Policy = "Promoter")]
        [HttpGet("api/usuario/getcomissarios")]
        public IActionResult GetComissarios()
        {
            string usuarioId = Util.GetIdUsuario(User);
            int casaId = Util.GetCasaUsuario(User);

            List<Usuario> comissarios = _authService.GetComissarios(casaId, usuarioId);

            List<UsuarioVM> comissariosVM = Mapper.Map<List<UsuarioVM>>(comissarios);


            foreach (var comissario in comissarios)
            {
                if (comissario.CasasUsuario.First(p => p.CasaId == casaId).Bloqueado)
                {
                    comissariosVM.First(p => p.Id.Equals(comissario.Id)).Status = StatusUsuario.Bloqueado;
                }
            }

            return Ok(comissariosVM);
        }

        [Authorize(Policy = "Promoter")]
        [HttpPost("api/usuario/comissario")]
        public async Task<IActionResult> SalvaComissario([FromBody]UsuarioCriarVM usuarioVM)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            Usuario usuario = Mapper.Map<Usuario>(usuarioVM);

            if (usuarioVM.Casas == null | usuarioVM.Casas.Count == 0)
            {
                ModelState.AddModelError("", "Selecione ao menos uma casa para o usuário");
                return new BadRequestObjectResult(ModelState);
            }

            string usuarioId = Util.GetIdUsuario(User);

            await _authService.SalvaComissario(usuario, usuarioVM.Casas, usuarioId);

            return Ok();
        }


        [Authorize(Policy = "Promoter")]
        public IActionResult Comissarios()
        {
            return View();
        }

        [Authorize(Policy = "Promoter")]
        public IActionResult CriarComissario()
        {
            return View();
        }

        public IActionResult EsqueciSenha()
        {
            return View();
        }

        [Authorize(Policy = "AcessoUsuario")]
        public IActionResult Acessos()
        {
            return View();
        }

        [Authorize]
        public IActionResult SelecaoCasa()
        {
            return View();
        }

        [Authorize]
        public IActionResult Consulta()
        {
            return View();
        }

        [Authorize(Policy = "AddUsuario")]
        public IActionResult Criar()
        {
            return View();
        }

    }
}
