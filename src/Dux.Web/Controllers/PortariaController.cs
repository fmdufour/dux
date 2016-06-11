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

	public class PortariaController : Controller
    {
        private readonly INomeListaService _nomeListaService;

        public PortariaController(INomeListaService nomeListaService)
        {
            _nomeListaService = nomeListaService;
        }


        [Authorize(Policy = "VerLista")]
        public IActionResult Listas()
        {
            return View();
        }

        [Authorize(Policy = "VerLista")]
        public IActionResult Lista()
        {
            return View();
        }


        [Authorize(Policy = "VerLista")]
        public IActionResult ListaGeral()
        {
            return View();
        }

    }
}