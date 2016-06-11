using System.Collections.Generic;
using Dux.Domain;
using System.Threading.Tasks;

namespace Dux.Domain.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}