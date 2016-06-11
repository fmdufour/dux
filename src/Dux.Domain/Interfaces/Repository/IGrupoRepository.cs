namespace Dux.Domain.Interfaces
{
    public interface IGrupoRepository : IGenericRepository<Grupo>
    {
        Grupo GetGrupo(int id);
    }
}