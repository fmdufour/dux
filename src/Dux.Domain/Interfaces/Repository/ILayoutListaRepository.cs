namespace Dux.Domain.Interfaces
{
    public interface ILayoutListaRepository : IGenericRepository<LayoutLista>
    {
        LayoutLista GetLayoutLista(int id);
        void AddOrUpdate(LayoutLista layout);
    }
}