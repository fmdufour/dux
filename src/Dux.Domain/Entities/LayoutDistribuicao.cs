namespace Dux.Domain
{
    public class LayoutDistribuicao : BaseEntity
    {
        public int PerfilDistribuicaoId { get; set; }
        public PerfilDistribuicao PerfilDistribuicao { get; set;}
        public string UsuarioId { get; set; }        
        public Usuario Usuario { get; set; }
        public int qtdNomesM { get; set; }
        public int qtdNomesF { get; set; }
    }
}