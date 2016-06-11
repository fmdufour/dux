using Dux.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class UsuarioVM
    {
        public string Id { get; set; }

        public string Nome { get; set; }

        public string Sobrenome { get; set; }

        public string Email { get; set; }

        public string ImgPerfil { get; set; }        

        public DateTime dtaCriacao { get; set; }
        public DateTime dtaEdicao { get; set; }

        public DateTime ultimoAcesso { get; set; }

        public StatusUsuario Status { get; set; }        

    }
}
