using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dux.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Dux.Domain;
using AutoMapper;
using Dux.Domain.Interfaces;
using Dux.Application;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Dux.Web.Controllers
{
    public class EventosController : Controller
    {
        private readonly IEventoService _eventoService;

        public EventosController(IEventoService eventoService)
        {
            _eventoService = eventoService;
        }

        [Authorize]
        [HttpGet("api/eventos/{id}")]
        public IActionResult GetEvento(int id)
        {
            int casaId = Util.GetCasaUsuario(User);
            Evento evento = _eventoService.GetEvento(id, casaId);

            EventoVM eventoVM = Mapper.Map<EventoVM>(evento);

            return Ok(eventoVM);
        }

        [Authorize(Policy = "Eventos")]
        [HttpPost("api/eventos")]
        public IActionResult SalvaEvento([FromBody]EventoVM eventoVM)
            {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }
            int casaId = Util.GetCasaUsuario(User);

            eventoVM.DtaInicio = new DateTime(eventoVM.DtaInicio.Year, eventoVM.DtaInicio.Month, eventoVM.DtaInicio.Day,
                                              Convert.ToInt32(eventoVM.horaEvento.Substring(0, 2)), 
                                              Convert.ToInt32(eventoVM.horaEvento.Substring(2, 2)), 0);

            Evento evento = Mapper.Map<Evento>(eventoVM);
            int perfilListaId = eventoVM.perfilListaId ?? 0;

            _eventoService.SalvaEvento(evento, casaId, perfilListaId);

            return Ok();
        }

        public class ParametrosCal
        {
            public DateTime inicio { get; set; }
            public DateTime final { get; set; }
        }

        [Authorize]
        [HttpPost("api/eventos/EventosCal")]
        public IActionResult EventosCal([FromBody]ParametrosCal datas)
        {
            int casaId = Util.GetCasaUsuario(User);
            string userId = Util.GetIdUsuario(User);

            List<Evento> eventos =  _eventoService.GetEventos(casaId, userId, datas.inicio, datas.final);

            List<EventoCalVM> eventosCal = EventoFormataCal(eventos);

            return Ok(eventosCal);
        }

        public List<EventoCalVM> EventoFormataCal(List<Evento> eventos)
        {
            List<EventoCalVM> eventosCal = new List<EventoCalVM>();

            foreach (var evento in eventos)
            {
                EventoCalVM eCal = new EventoCalVM
                {   
                    backgroundColor = evento.CorCalendario,                 
                    allDay = true,
                    id = evento.Id,
                    start = evento.DtaInicio.ToString("s"),
                    title = evento.NomeEvento
                };

                if (evento.CorCalendario == "yellow")
                {
                    eCal.textColor = "black";
                }                                
                else
                {
                    eCal.textColor = "white";
                }

                eventosCal.Add(eCal);
            }

            return eventosCal;
        }

        [Authorize]
        public IActionResult Agenda()
        {
            return View();
        }

        [Authorize(Policy = "Eventos")]
        public IActionResult Criar()
        {
            return View();
        }
    }
}
