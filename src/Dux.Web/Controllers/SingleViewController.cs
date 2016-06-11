using Microsoft.AspNetCore.Mvc;
using System;
using Dux.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Dux.Domain;


namespace Dux.Web.Controllers
{
    public class SingleViewController : Controller
    {
        // GET: SingleView
        public IActionResult Index()
        {
            return View();
        }
        // GET: SingleView
        public IActionResult MenuView()
        {
            return View();
        }

        public IActionResult Eventos()
        {
            return View();
        }

        public IActionResult Agenda()
        {
            return View();
        }
        public IActionResult CriarEvento()
        {
            return View();
        }



    }
}