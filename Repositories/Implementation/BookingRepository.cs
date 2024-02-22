using LenzPerson.api.Data;
using LenzPerson.api.Models.DomainModels;
using LenzPerson.api.Models.DTO;
using LenzPerson.api.Repositories.Interface;
using LenzPerson.api.Services;
using Microsoft.EntityFrameworkCore;
using static Dropbox.Api.Files.ListRevisionsMode;

namespace LenzPerson.api.Repositories.Implementation
{
    public class BookingRepository: IBookingRepository
    {

        private readonly ApplicationDbContext dbContext;
        private readonly IEmailSender _emailSender;
        public BookingRepository(ApplicationDbContext dbContext, IEmailSender emailSender){

            this.dbContext = dbContext;
            _emailSender = emailSender;
        }
        public bool IsDuplicateDateTime(DateTime startTime, DateTime endTime, int photographerId)
                {
            return dbContext.Set<BookingDetail>()
            .Any(b => b.PhotographerID == photographerId &&
            b.Status == "accepted" &&
            ((b.StartTime <= endTime && b.EndTime >= startTime) ||
             (b.StartTime >= startTime && b.StartTime <= endTime) ||
             (b.EndTime > startTime && b.EndTime <= endTime)));
                   // Check if existing booking starts where the new one ends
                }
       
      

        public async Task AddBooking(BookingDetail booking)
            {
                try
                {
                     dbContext.Set<BookingDetail>().Add(booking);
                    await dbContext.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    throw new Exception("Error adding booking to database", ex);
                }
            }

        async Task<IEnumerable<BookingDetailsDTO>> IBookingRepository.GetRequestedBookings(int photographerId)
        {
            return await dbContext.BookingDetails
            .Where(b => b.PhotographerID == photographerId && b.Status == "requested")
            .Select(b => new BookingDetailsDTO
            {
                Id = b.Id,
                PhotographerID = b.PhotographerID,
                CustomerID = b.CustomerID,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                EventDetails = b.EventDetails,
                Status = b.Status
            })
            .ToListAsync();
        }

        async Task<IEnumerable<BookingDetailsDTO>> IBookingRepository.GetRequestedBookingsbyCustId(int Id)
        {
            return await dbContext.BookingDetails
            .Where(b => b.CustomerID == Id && b.Status == "requested")
            .Select(b => new BookingDetailsDTO
            {
                Id = b.Id,
                PhotographerID = b.PhotographerID,
                CustomerID = b.CustomerID,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                EventDetails = b.EventDetails,
                Status = b.Status
            })
            .ToListAsync();
        }


        async Task<IEnumerable<BookingRequestsDTO>> IBookingRepository.GetAcceptedBookings(int photographerId)
        {
            return await dbContext.BookingDetails
            .Where(b => b.PhotographerID == photographerId && b.Status == "accepted")
            .Select(b => new BookingRequestsDTO
            {
                Id = b.Id,
                PhotographerID = b.PhotographerID,
                CustomerID = b.CustomerID,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                EventDetails = b.EventDetails,
                Status = b.Status,
                Charges = b.Charges

            })
            .ToListAsync();
        }
        async Task<IEnumerable<BookingRequestsDTO>> IBookingRepository.GetAcceptedBookingsByCustId(int Id)
        {
            return await dbContext.BookingDetails
            .Where(b => b.CustomerID == Id && b.Status == "accepted")
            .Select(b => new BookingRequestsDTO
            {
                Id = b.Id,
                PhotographerID = b.PhotographerID,
                CustomerID = b.CustomerID,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                EventDetails = b.EventDetails,
                Status = b.Status,
                Charges = b.Charges

            })
            .ToListAsync();
        }
        async Task<IEnumerable<BookingRequestsDTO>> IBookingRepository.GetRejectedBookings(int photographerId)
        {
            return await dbContext.BookingDetails
            .Where(b => b.PhotographerID == photographerId && b.Status == "rejected")
            .Select(b => new BookingRequestsDTO
            {
                Id = b.Id,
                PhotographerID = b.PhotographerID,
                CustomerID = b.CustomerID,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                EventDetails = b.EventDetails,
                Status = b.Status,
                Charges = b.Charges
            })
            .ToListAsync();
        }  
        async Task<IEnumerable<BookingRequestsDTO>> IBookingRepository.GetPendingBookings(int photographerId)
        {
            return await dbContext.BookingDetails
            .Where(b => b.PhotographerID == photographerId && b.Status == "pending")
            .Select(b => new BookingRequestsDTO
            {
                Id = b.Id,
                PhotographerID = b.PhotographerID,
                CustomerID = b.CustomerID,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                EventDetails = b.EventDetails,
                Status = b.Status,
                Charges = b.Charges
            })
            .ToListAsync();
        } 
        async Task<IEnumerable<BookingRequestsDTO>> IBookingRepository.GetPendingBookingsByCustId(int Id)
        {
            return await dbContext.BookingDetails
            .Where(b => b.CustomerID == Id && b.Status == "pending")
            .Select(b => new BookingRequestsDTO
            {
                Id = b.Id,
                PhotographerID = b.PhotographerID,
                CustomerID = b.CustomerID,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                EventDetails = b.EventDetails,
                Status = b.Status,
                Charges = b.Charges
            })
            .ToListAsync();
        }
       
        
        
        
        
        
        public async Task AddCharges(int BookingId, int charges)
        {
            var booking = await dbContext.BookingDetails.FirstOrDefaultAsync(b => b.Id == BookingId);
            if (booking != null)
            {
                // Update the booking status to "pending"
                booking.Status = "pending";

                // Update the charges
                booking.Charges = charges;

                await dbContext.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException("Booking not found with the provided ID.");
            }
        }

       async  Task IBookingRepository.rejectBooking(int bookingId)
        {

            var booking = await dbContext.BookingDetails.FirstOrDefaultAsync(b => b.Id == bookingId);

            if (booking != null)
            {
                // Update the booking status to "pending"
                booking.Status = "rejected";
                await dbContext.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException("Booking not found with the provided ID.");
            }


        }

            async  Task<IEnumerable<BookingRequestsDTO>> IBookingRepository.GetRejectedBookingsByCustId(int Id)
        {

            return await dbContext.BookingDetails
            .Where(b => b.CustomerID == Id && b.Status == "rejected")
            .Select(b => new BookingRequestsDTO
            {
                Id = b.Id,
                PhotographerID = b.PhotographerID,
                CustomerID = b.CustomerID,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                EventDetails = b.EventDetails,
                Status = b.Status,
                Charges = b.Charges
            })
            .ToListAsync();
        }

      async  Task IBookingRepository.acceptBooking(int bookingId,int  photograherId)
        {
            var booking = await dbContext.BookingDetails.FirstOrDefaultAsync(b => b.Id == bookingId);
            var photographer = await dbContext.PhotographerDetails.FirstOrDefaultAsync(b => b.Id == booking.PhotographerID);
            var customer = await dbContext.CustomerDetails.FirstOrDefaultAsync(b => b.Id == booking.CustomerID);
            var email = photographer.Email;
            var custEmail = customer.Email;
         
            if (booking != null)
            {
                // Update the booking status to "pending"
                booking.Status = "accepted";


            var overlappingBookings = await dbContext.BookingDetails
            .Where(b => b.PhotographerID == photograherId && b.Status == "requested" &&
                        ((b.StartTime <= booking.EndTime && b.EndTime >= booking.StartTime) ||
                         (b.StartTime >= booking.StartTime && b.StartTime <= booking.EndTime) ||
                         (b.EndTime > booking.StartTime && b.EndTime <= booking.EndTime)))
            .ToListAsync();
                foreach (var overlappingBooking in overlappingBookings)
                {
                    overlappingBooking.Status = "rejected";
                }
                await dbContext.SaveChangesAsync();

                await _emailSender.SendEmailAsync(email, "Booking Confirmed", booking);
                await _emailSender.SendEmailAsync(custEmail, "Booking Confirmed", booking);
            }
            else
            {
                throw new ArgumentException("Booking not found with the provided ID.");
            }

        }

       async Task IBookingRepository.deleteBooking(int bookingId)
        {
            var booking = await dbContext.BookingDetails.FirstOrDefaultAsync(b => b.Id == bookingId);
            if (booking != null)
            {
                dbContext.BookingDetails.Remove(booking);
                await dbContext.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException("Booking not found with the provided ID.");
            }
        }

        async  Task<bool> IBookingRepository.doneBooking(int bookingId)
        {
            var booking = await dbContext.BookingDetails.FirstOrDefaultAsync(b => b.Id == bookingId);
            if (booking.EndTime <= DateTime.UtcNow.AddHours(5).AddMinutes(1) && booking.Status=="accepted")
            {
                booking.Status = "done"; 
                await dbContext.SaveChangesAsync();
                return true; 
            }
            else
            {
                return false;
            }
        }

        async Task IBookingRepository.AddFeedback(feedback feedback)
        {
            try
            {
                bool feedbackExists = await dbContext.Set<feedback>().AnyAsync(f => f.BId == feedback.BId);
                if (!feedbackExists)
                {
                    dbContext.Set<feedback>().Add(feedback);
                    await dbContext.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("feedback already given ");

                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding feedback to database", ex);
            }
        }

        async  Task<IEnumerable<BookingRequestsDTO>> IBookingRepository.doneBookings(int photographerId)
        {

            return await dbContext.BookingDetails
            .Where(b => b.PhotographerID == photographerId && b.Status == "done")
            .Select(b => new BookingRequestsDTO
            {
                Id = b.Id,
                PhotographerID = b.PhotographerID,
                CustomerID = b.CustomerID,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                EventDetails = b.EventDetails,
                Status = b.Status,
                Charges = b.Charges
            })
            .ToListAsync();
        }

       async Task<IEnumerable<feedBackDTO>> IBookingRepository.GetFeedback(int photographerId)
        {
            return await dbContext.feedbacks
           .Where(b => b.PId == photographerId)
           .Select(b => new feedBackDTO
           {
               PId= b.PId,
               CId =b.CId,
               CName=b.CName,
               Comment=b.Comment   
           })
           .ToListAsync();
        }

      async   Task<IEnumerable<BookingRequestsDTO>> IBookingRepository.doneBookingsByCust(int Id)
        {
            return await dbContext.BookingDetails
              .Where(b => b.CustomerID == Id && b.Status == "done")
              .Select(b => new BookingRequestsDTO
              {
                  Id = b.Id,
                  PhotographerID = b.PhotographerID,
                  CustomerID = b.CustomerID,
                  StartTime = b.StartTime,
                  EndTime = b.EndTime,
                  EventDetails = b.EventDetails,
                  Status = b.Status,
                  Charges = b.Charges
              })
              .ToListAsync();
        }

       async Task<IEnumerable<int>> IBookingRepository.GetFeedbackIds()
        {
            var feedbackIds = await dbContext.feedbacks
             .Select(f => f.BId) 
             .Distinct()
             .ToListAsync();

            return feedbackIds;
        }
    }
}
