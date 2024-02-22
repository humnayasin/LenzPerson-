using LenzPerson.api.Models.DomainModels;
using LenzPerson.api.Models.DTO;
using LenzPerson.api.Repositories.Implementation;
using LenzPerson.api.Repositories.Interface;
using LenzPerson.api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using static Dropbox.Api.Files.ListRevisionsMode;

namespace LenzPerson.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository bookingRepository;
        private readonly IEmailSender _emailSender;

        public BookingController(IBookingRepository bookingRepository, IEmailSender emailSender)
        {
            this.bookingRepository = bookingRepository;
            _emailSender = emailSender;
        }

        [HttpPost("BookingRequest")]
        public async Task<IActionResult> BookingRequest(CreateBookingRequestDTO request)
        {
            bool isDuplicate = this.bookingRepository.IsDuplicateDateTime(request.StartTime, request.EndTime, request.PhotographerID);
            if (request.StartTime == request.EndTime)
            {
                return BadRequest("A booking with the same start and end time");
            }
            if (isDuplicate)
            {
                return BadRequest("A booking with the same date, start time, and end time already exists.");
            }

            var Booking = new BookingDetail
            {
                PhotographerID = request.PhotographerID,
                CustomerID = request.CustomerID,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                EventDetails = request.EventDetails,
                Status = "requested",
                Charges = null
            };
           await this.bookingRepository.AddBooking(Booking);

            return Ok();
        }
       
        [HttpGet("GetRequestedBooking")]
        public async Task<IActionResult> GetRequestedBooking(int PhotographerId)
        {

            var requestedBookings = await bookingRepository.GetRequestedBookings(PhotographerId);
            if (requestedBookings == null || !requestedBookings.Any())
            {
                return NotFound("No requested bookings found.");
            }
            return Ok(requestedBookings);
        }
        [HttpGet("GetRequestedBookingByCustId")]
        public async Task<IActionResult> GetRequestedBookingByCustId(int Id)
        {

            var requestedBookings = await bookingRepository.GetRequestedBookingsbyCustId(Id);
            if (requestedBookings == null || !requestedBookings.Any())
            {
                return NotFound("No requested bookings found.");
            }
            return Ok(requestedBookings);
        }




        [HttpPost("AddCharges")]
        public async Task<IActionResult> AddCharges(offerChargesRequestDTO request)
        {
            if (request == null)
            {
                return BadRequest("empty");

            }


            await this.bookingRepository.AddCharges(request.BookingId, request.Charges);


            return Ok();


        }



        [HttpGet("GetAcceptedBooking")]
        public async Task<IActionResult> GetAcceptedBooking(int PhotographerId)
        {

            var acceptedBookings = await bookingRepository.GetAcceptedBookings(PhotographerId);
            if (acceptedBookings == null || !acceptedBookings.Any())
            {
                return NotFound("No accepted bookings found.");
            }
            return Ok(acceptedBookings);
        }
        [HttpGet("GetAcceptedBookingByCustId")]
        public async Task<IActionResult> GetAcceptedBookingByCustId(int Id)
        {

            var acceptedBookings = await bookingRepository.GetAcceptedBookingsByCustId(Id);
            if (acceptedBookings == null || !acceptedBookings.Any())
            {
                return NotFound("No accepted bookings found.");
            }
            return Ok(acceptedBookings);
        }

        [HttpGet("GetPendingBooking")]
        public async Task<IActionResult> GetPendingBooking(int PhotographerId)
        {

            var pendingBookings = await bookingRepository.GetPendingBookings(PhotographerId);
            if (pendingBookings == null || !pendingBookings.Any())
            {
                return NotFound("No pending bookings found.");
            }
            return Ok(pendingBookings);
        }
     
        [HttpGet("GetRejectedBooking")]
        public async Task<IActionResult> GetRejectedBooking(int PhotographerId)
        {
            var rejectedBookings = await bookingRepository.GetRejectedBookings(PhotographerId);
            if (rejectedBookings == null || !rejectedBookings.Any())
            {
                return NotFound("No rejected bookings found.");
            }
            return Ok(rejectedBookings);
        }
        [HttpGet("GetRejectedBookingByCustId")]
        public async Task<IActionResult> GetRejectedBookingByCustId(int Id)
        {
            var rejectedBookings = await bookingRepository.GetRejectedBookingsByCustId(Id);
            if (rejectedBookings == null || !rejectedBookings.Any())
            {
                return NotFound("No rejected bookings found.");
            }
            return Ok(rejectedBookings);
        }
        [HttpGet("GetPendingBookingByCustId")]
        public async Task<IActionResult> GetPendingBookingByCustId(int Id)
        {

            var pendingBookings = await bookingRepository.GetPendingBookingsByCustId(Id);
            if (pendingBookings == null || !pendingBookings.Any())
            {
                return NotFound("No pending bookings found.");
            }
            return Ok(pendingBookings);
        } 
        [HttpGet("GetdoneBooking")]
        public async Task<IActionResult> GetDoneBooking(int PhotographerId)
        {

            var doneBookings = await bookingRepository.doneBookings(PhotographerId);
            if (doneBookings == null || !doneBookings.Any())
            {
                return NotFound("No done bookings found.");
            }
            return Ok(doneBookings);
        }  
        [HttpGet("GetdoneBookingByCust")]
        public async Task<IActionResult> GetDoneBookingByCust(int Id)
        {

            var doneBookings = await bookingRepository.doneBookingsByCust(Id);
            if (doneBookings == null || !doneBookings.Any())
            {
                return NotFound("No done bookings found.");
            }
            return Ok(doneBookings);
        }
        [HttpPut("rejectBooking")]
        public async Task<IActionResult> rejectBooking(int bookingId)
        {
            if(bookingId == 0)
            {
                return BadRequest("id is empty");
            }
            await bookingRepository.rejectBooking(bookingId);
            return Ok();
        }

        [HttpDelete("DeleteBooking")]
        public async Task<IActionResult> DeleteBooking(int bookingId)
        {
            if (bookingId == 0)
            {
                return BadRequest("id is empty");
            }
            await bookingRepository.deleteBooking(bookingId);
            return Ok();
        }

        [HttpPut("AcceptBooking")]
        public async Task<IActionResult> AcceptBooking(int bookingId, int photographerId)
        {
            if (bookingId == 0)
            {
                return BadRequest("id is empty");
            }
            try
            {
                await bookingRepository.acceptBooking(bookingId, photographerId);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }


        [HttpPost("sentEmail")]
        public async Task<IActionResult> sendEmail()
        {
            string recipientEmail = "rohaejaz7@gmail.com";
            string subject = "Test Email";
            string message1 = "This is a test email.";

            try
            {
                string fromMail = "humnayasin86@gmail.com";
                string fromPassword = "kiwtpurwpmvywzef";
                MailMessage message = new MailMessage();
                message.From = new MailAddress(fromMail);
                message.Subject = "Test Subject";
                message.To.Add(new MailAddress("rohaejaz7@gmail.com"));
                message.Body = "congooooooooooooooooo";
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential(fromMail, fromPassword),
                    EnableSsl = true,
                   
                };
                 smtpClient.Send(message);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to send email: {ex.Message}");
            }
        }


        [HttpPut("doneBooking")]
        public async Task<IActionResult> doneBooking(int bookingId)
        {
            if (bookingId == 0)
            {
                return BadRequest("id is empty");
            }
           bool done= await bookingRepository.doneBooking(bookingId);
            if (done)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Event is not ended yet");
            }
            
        }



        [HttpPost("GiveFeedBack")]
        public async Task<IActionResult> CustomerFeedback(CreateFeedBackDTO request)
        {
          

             var feedback = new feedback
            {
                 CId = request.CId,
                 BId = request.BId,
                 PId= request.PId,
                 CName=request.CName,
                 Comment=request.Comment
                       
            };
            try
            {

            await this.bookingRepository.AddFeedback(feedback);
            return Ok();
            }
            catch
            {
                return BadRequest("feed back already given");
            }

        }

        [HttpGet("GetFeedback")]
        public async Task<IActionResult> GetFeedback(int PhotographerId)
        {

            var feedback = await bookingRepository.GetFeedback(PhotographerId);
            if (feedback == null || !feedback.Any())
            {
                return NotFound("No feedback  found.");
            }
            return Ok(feedback);
        }

        [HttpGet("GetIdHavingFeedBack")]
        public async Task<IActionResult> GetIdHavingFeedBack()
        {
            try
            {
                
                var feedbackIds = await bookingRepository.GetFeedbackIds();

                // Check if feedback IDs were found
                if (feedbackIds == null || !feedbackIds.Any())
                {
                    return NotFound("No feedback found.");
                }

                return Ok(feedbackIds);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching feedback: {ex.Message}");
            }
        }



    }


}

