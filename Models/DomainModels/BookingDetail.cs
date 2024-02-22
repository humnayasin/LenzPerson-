using System.ComponentModel.DataAnnotations;

namespace LenzPerson.api.Models.DomainModels
{
    public class BookingDetail
    {
        public int Id { get; set; }
        [Required]

        public int PhotographerID { get; set; }
        [Required]
        public int CustomerID { get; set; }
        [Required]

        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; } // End time of the booking

        public string EventDetails { get; set; }
        public string Status { get; set; }
       

        public int? Charges { get; set; }

    }
}
