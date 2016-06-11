using Microsoft.AspNetCore.Mvc;
using System;
using Dux.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Dux.Domain;
using Microsoft.AspNetCore.Authorization;

namespace Dux.Web.Controllers
{
    [Authorize]
    public class PartialsController : Controller
    {
        public ActionResult TopNavbar()
        {
            return PartialView();
        }
        public ActionResult Sidebar()
        {
            return PartialView();
        }
        public ActionResult Offsidebar()
        {
            return PartialView();
        }
        public ActionResult Footer()
        {
            return PartialView();
        }
        public ActionResult OffsidebarTab1()
        {
            return PartialView();
        }
        public ActionResult OffsidebarTab2()
        {
            return PartialView();
        }
    }
}