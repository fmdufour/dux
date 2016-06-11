using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dux.Domain;

namespace Dux.Application
{
    public class Util
    {
        public static string GetIdUsuario(ClaimsPrincipal user)
        {
            return user.Claims.First(p => p.Type == ClaimTypes.NameIdentifier).Value;
        }

        public static int GetCasaUsuario(ClaimsPrincipal user)
        {
            return Convert.ToInt32(user.Claims.Single(p => p.Type.Equals("casa")).Value);
        }

        internal static string GeraSenhaTemp()
        {
            int length = 8;
            string allowedLetterChars = "abcdefghijkmnpqrstuvwxyz";
            string allowedCapitals = "ABCDEFGHJKLMNPQRSTUVWXYZ";
            string allowedNumberChars = "123456789";
            string allowedSymbols = "!@#$%*";
            char[] chars = new char[length];
            Random rd = new Random();

            int i = 0;
            for (i = 0; i < length; i++)
            {
                if (i % 2 == 1)
                {
                    chars[i] = allowedLetterChars[rd.Next(0, allowedLetterChars.Length)];
                }
                else
                {
                    chars[i] = allowedNumberChars[rd.Next(0, allowedNumberChars.Length)];
                }
            }   
                     
            i = rd.Next(0, length - 1);
            chars[i] = allowedSymbols[rd.Next(0, allowedSymbols.Length)];

            i = (i + rd.Next(1, length - 2)) % (length - 1);
            
            chars[i] = allowedCapitals[rd.Next(0, allowedCapitals.Length)];

            return new string(chars);
    }
    }
}
