using Microsoft.AspNetCore.Mvc;
using System;
using Dux.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Dux.Domain;


namespace Dux.Web.Controllers
{
    public class LoginController : Controller
    {        
        public IActionResult Index()
        {
            return View();
        }
    }
}