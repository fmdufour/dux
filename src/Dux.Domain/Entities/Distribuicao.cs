namespace Dux.Domain
{
    public class Distribuicao : BaseEntity
    {    
        public string UsuarioId { get; set; }        
        public Usuario Usuario { get; set; }
        public Lista Lista { get; set; }
        public int ListaId { get; set; }

        public int qtdNomesM { get; set; }
        public int qtdNomesF { get; set; }
    }
}