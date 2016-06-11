using Microsoft.AspNetCore.Mvc;
using System;
using Dux.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Dux.Domain;

namespace Dux.Web.Controllers
{
    public class AdminController : Controller
    {
        private readonly IGrupoService _grupoService;        

        public AdminController(IGrupoService GrupoService)
        {
            _grupoService = GrupoService;            
        }

        public ActionResult Index()
        {            
            return View();
        }

    }
}
