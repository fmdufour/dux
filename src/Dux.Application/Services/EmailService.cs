using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Dux.Infrastructure.Exceptions;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Dux.Application
{
    public class EmailService : IEmailService
    {
        private readonly ILogger<EmailService> _logger;

        public EmailService(ILogger<EmailService> logger)
        {
            _logger = logger;
        }
        public Task SendEmailAsync(string email, string subject, string message)
        {
            _logger.LogError("Enviando email para {email}, assunto {subject}, mensagem: {message}", email, subject, message);
            return Task.FromResult<object>(null);
        }
    }
}
