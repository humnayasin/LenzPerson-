using System.ComponentModel.DataAnnotations;

namespace LenzPerson.api.Models.DTO
{
    public class CreateBookingRequestDTO
    {
        public int PhotographerID { get; set; }
        [Required]
        public int CustomerID { get; set; }
        [Required]

        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; } 
        public string EventDetails { get; set; }

    }
}
