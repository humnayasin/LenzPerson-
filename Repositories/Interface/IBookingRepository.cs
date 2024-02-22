using LenzPerson.api.Models.DomainModels;
using LenzPerson.api.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace LenzPerson.api.Repositories.Interface
{
    public interface IBookingRepository
    {
        public bool IsDuplicateDateTime(DateTime startTime, DateTime endTime, int photographerId);
        public Task AddBooking(BookingDetail booking);
        public Task AddFeedback(feedback feedback);

        public Task AddCharges(int BookingId, int charges);
        public Task rejectBooking(int bookingId);
        public Task deleteBooking(int bookingId);
        public Task<bool> doneBooking(int bookingId);
        public Task acceptBooking(int bookingId, int photograherId);
        Task<IEnumerable<BookingDetailsDTO>> GetRequestedBookings(int photographerId);
        Task<IEnumerable<BookingRequestsDTO>> GetRejectedBookings(int photographerId);
        Task<IEnumerable<BookingRequestsDTO>> GetPendingBookings(int photographerId);
        Task<IEnumerable<BookingRequestsDTO>> GetAcceptedBookings(int photographerId);
        Task<IEnumerable<int>> GetFeedbackIds();

        Task<IEnumerable<BookingDetailsDTO>> GetRequestedBookingsbyCustId(int Id);
        Task<IEnumerable<BookingRequestsDTO>> GetPendingBookingsByCustId(int Id);
        Task<IEnumerable<BookingRequestsDTO>> GetAcceptedBookingsByCustId(int Id);
        Task<IEnumerable<BookingRequestsDTO>> GetRejectedBookingsByCustId(int Id);
        Task<IEnumerable<BookingRequestsDTO>> doneBookings(int photographerId);
        Task<IEnumerable<BookingRequestsDTO>> doneBookingsByCust(int Id);
        Task<IEnumerable<feedBackDTO>> GetFeedback(int photographerId);

    }
}
