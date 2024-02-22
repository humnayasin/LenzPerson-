﻿using System.ComponentModel.DataAnnotations;

namespace LenzPerson.api.Models.DTO
{
    public class CreateCustomerRequestDto
    {

        [Required]
        public string Email { get; set; }


        [Required]
        public string Password { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string UserRole { get; set; }



    }
}
