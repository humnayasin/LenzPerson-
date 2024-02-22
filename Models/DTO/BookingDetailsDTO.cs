using System.ComponentModel.DataAnnotations;

namespace LenzPerson.api.Models.DTO
{
    public class BookingDetailsDTO
    {
        public int Id { get; set; }

        public int PhotographerID { get; set; }
        public int CustomerID { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; } 

        public string EventDetails { get; set; }
        public string Status { get; set; } 
  





    }
}
