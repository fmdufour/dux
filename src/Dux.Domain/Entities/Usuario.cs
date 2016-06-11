using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dux.Domain
{

    public enum StatusUsuario
    {
        Ativo = 0,
        Bloqueado = 1
    }
    public class Usuario : IdentityUser
    {
        public Usuario()
        {
            dtaCriacao = DateTime.Now;
            dtaEdicao = DateTime.Now;
            CasasUsuario = new List<UsuarioCasa>();
            Distribuicoes = new List<Distribuicao>();
        }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }

        public string ImgPerfil { get; set; }
        public List<UsuarioCasa> CasasUsuario { get; set; }        
        public List<Distribuicao> Distribuicoes { get; set; }         
        public List<UsuarioLista> UsuarioListas { get; set; }      

        public DateTime dtaCriacao { get; set; }        
        public DateTime dtaEdicao { get; set; }
        public DateTime UltimoAcesso { get; set; }

        public string PromoterId { get; set; }

        [ForeignKey("PromoterId")]
        public virtual Usuario ComissarioDe { get; set; }
        public bool Comissario { get; set; }
    }
}