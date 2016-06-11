using System.Collections.Generic;

namespace Dux.Domain.Interfaces
{
    public interface ILayoutDistribuicaoRepository : IGenericRepository<LayoutDistribuicao>
    {
        LayoutDistribuicao GetLayoutDistribuicao(int id);
        void AddOrUpdate(List<LayoutDistribuicao> layoutsDistribuicao);
    }
}