﻿using Microsoft.AspNetCore.Mvc;


namespace Dux.Web.Controllers
{
    public class AppController : Controller
    {        
        public IActionResult Index()
        {
            return View();
        }
    }
}
