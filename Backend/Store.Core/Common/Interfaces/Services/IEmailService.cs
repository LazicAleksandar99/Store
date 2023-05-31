using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.Common.Interfaces.Services
{
    public interface IEmailService
    {
        public void SendEmail(string recipientEmail, string theMessage);
    }
}
