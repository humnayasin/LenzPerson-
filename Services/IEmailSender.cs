using LenzPerson.api.Models.DomainModels;
using System.Runtime.CompilerServices;

namespace LenzPerson.api.Services
{
    public interface IEmailSender
    {

        Task SendEmailAsync(string toEmail, string subject, BookingDetail bookingDetail);
    }

    
}
