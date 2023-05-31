using MimeKit;
using Store.Core.Common.Interfaces.Services;
using MailKit.Net.Smtp;

namespace Store.Api.Services
{
    public class EmailService : IEmailService
    {
        public void SendEmail(string recipientEmail, string theMessage)
        {

            MimeMessage message = new MimeMessage();

            message.From.Add(new MailboxAddress("ShopUp", "acopro0@gmail.com"));
            message.To.Add(MailboxAddress.Parse(recipientEmail));
            message.Subject = "Verification";
            message.Body = new TextPart("plain")
            {
                Text = theMessage
            };

            SmtpClient client = new SmtpClient();

            try
            {
                client.Connect("smtp.gmail.com", 465, true);
                client.Authenticate("acopro0@gmail.com", "klngnrdntduxvkxg");
                client.Send(message);
                Console.WriteLine("Email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending email: " + ex.Message);
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }
    }
}
