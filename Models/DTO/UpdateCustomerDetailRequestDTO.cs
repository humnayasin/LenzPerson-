using System.ComponentModel.DataAnnotations;

namespace LenzPerson.api.Models.DTO
{
    public class UpdateCustomerDetailRequestDTO
    {


        public int Id { get; set; }
        public string Email { get; set; }



        public string PhoneNumber { get; set; }


        public string FirstName { get; set; }


        public string LastName { get; set; }
        
        public string Gender { get; set; }



        public string City { get; set; }

 

    }
}
