using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dux.Domain;

namespace Dux.Application
{
    public class Email
    {

        public static string SenhaTemp(string nome, string email, string senhaTemp)
        {
            return "Olá " + nome + ", \n" +
                "Seu usuário foi criado no sistema Dux!\n" +
                "Use seu email e a senha temporária: " + senhaTemp + " para realizar o login";
        }

        public static string ResetaSenha(string nome, string code,  string url)
        {
            return "Olá " + nome + ", \n" +
                "Para configurar uma nova senha para seu login acesse o seguinte link:\n" +
                url;
        }

    }
}
