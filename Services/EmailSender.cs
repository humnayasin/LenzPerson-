

using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Security.Cryptography;
using LenzPerson.api.Models.DomainModels;


namespace LenzPerson.api.Services
{
    public class EmailSender : IEmailSender
    {


        private readonly IConfiguration _config;

        public EmailSender(IConfiguration config)
        {
            _config = config;
        }
        public async Task SendEmailAsync(string toEmail, string subject, BookingDetail bookingDetail)
        {
            string fromMail = _config["EmailSettings:SmtpUsername"];
            string fromPassword = _config["EmailSettings:SmtpPassword"];

            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromMail);
            message.Subject = subject;
            message.To.Add(new MailAddress(toEmail));

            string htmlBody =
                        "<h1> Congratulation! Booking is Confirmed</h1>" +
                        "<p>Hi,</p>" +
                        "<p>Hope this email finds you well</p>" +
                     "<p>Here are the booking details:</p>" +
                     "<ul>" +
                     "<li>Event Start Time: " + bookingDetail.StartTime.ToString("yyyy-MM-dd HH:mm:ss") + "</li>" +
                     "<li>Event End Time: " + bookingDetail.EndTime.ToString("yyyy-MM-dd HH:mm:ss") + "</li>" +
                     "<li>Booking Details: " + bookingDetail.EventDetails+ "</li>"+
                     "<li>Charges: " + bookingDetail.Charges+ "</li>"+
                     "</ul>" +
                     "<p>Have a Great Event. Thanks</p>"+
                     "<h1>LenzPerson<h1>"+
                      "<img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIeWEvs9JQwK6ch9nRx2Lrl7MvzSJckMND4G5HUOQqsn8eAXQKI7YQZegRCjoaxB5kCRM&usqp=CAU\" alt=\"Image\">";
            ;




            message.Body = htmlBody;
            message.IsBodyHtml = true; 

            using (var smtpClient = new SmtpClient("smtp.gmail.com"))
            {
                smtpClient.Port = 587;
                smtpClient.Credentials = new NetworkCredential(fromMail, fromPassword);
                smtpClient.EnableSsl = true;
                await smtpClient.SendMailAsync(message);
            }
        }

    }
}