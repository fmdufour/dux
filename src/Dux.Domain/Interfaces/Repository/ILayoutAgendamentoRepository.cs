using System.Collections.Generic;

namespace Dux.Domain.Interfaces
{
    public interface ILayoutAgendamentoRepository : IGenericRepository<LayoutAgendamento>
    {
        LayoutAgendamento GetLayoutAgendamento(int id);
        void RemoveExcluidos(List<LayoutAgendamento> layAgend);
        void AddOrUpdate(LayoutAgendamento agend);
    }
}