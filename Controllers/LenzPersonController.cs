using LenzPerson.api.Models.DomainModels;
using LenzPerson.api.Models.JWT;
using LenzPerson.api.Models.DTO;
using LenzPerson.api.Repositories.Implementation;
using LenzPerson.api.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using BCrypt.Net;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using Azure.Core;
using System.Security.Claims;

namespace LenzPerson.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LenzPersonController : ControllerBase
    {
        private readonly ICustomerDetailRepository customerRepository;
        private readonly IConfiguration _config;
        private readonly IPhotographerRepository photographerRepository;

        public LenzPersonController(ICustomerDetailRepository customerDetailRepository, IConfiguration _config, IPhotographerRepository photographerRepository)
        {
            this.customerRepository = customerDetailRepository;
            this._config = _config;
            this.photographerRepository = photographerRepository;

        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> CreateCustomer(CreateCustomerRequestDto request)
        {
            //map dto to domain model

            var emailExists = await customerRepository.checkEmailExists(request.Email);
            if (!emailExists)
            {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);
                var Customer = new CustomerDetail
                {


                    Email = request.Email,
                    Password = hashedPassword,
                    PhoneNumber = request.PhoneNumber,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Gender = request.Gender,
                    City = request.City,
                    UserRole = request.UserRole


                };


                await customerRepository.CreateCustomer(Customer);


                var response = new CustomerDetailDto
                {
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Gender = request.Gender,
                    City = request.City,
                    UserRole = request.UserRole


                };

                return Ok(response);

            }
            else
            {
                return BadRequest("Email already exists");
            }
          

        }



        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> UserLogin(LoginRequestDto loginRequest)
        {
            var photographer = await photographerRepository.GetUserByEmail(loginRequest.Email);
            var customer = await customerRepository.GetUserByEmail(loginRequest.Email);

            if (photographer == null && customer == null)
            {
                return NotFound(new { error = "user not found " });
            }
            bool isAuthorized;

            if (photographer != null)
            {
                isAuthorized = BCrypt.Net.BCrypt.Verify(loginRequest.Password, photographer.Password);

                if (!isAuthorized)
                {
                    return Unauthorized(new { error = "Invalid Credentials" });
                }

                var jwtService = new JwtService(_config); // Initialize JwtService with IConfiguration
                var token = jwtService.GenerateTokenPhotographer(
                    photographer.Id,
                    photographer.Email,
                    photographer.PhoneNumber,
                    photographer.FirstName,
                    photographer.LastName,
                    photographer.Gender,
                    photographer.City,
                    photographer.UserRole,
                    photographer.InstaHandle,
                    photographer.PortfolioLink,
                    photographer.CameraUsed,
                    photographer.PreferredPhotoshootTypes,
                    photographer.ProfilePicture

                );

                return Ok(new { token = token, userType = "Photographer" });
            }
            else if (customer != null)
            {
                isAuthorized = BCrypt.Net.BCrypt.Verify(loginRequest.Password, customer.Password);

                if (!isAuthorized)
                {
                    return Unauthorized(new { error = "Invalid Credentials" });
                }

                var jwtService = new JwtService(_config); // Initialize JwtService with IConfiguration
                var token = jwtService.GenerateTokenCustomer(

                    customer.Id,
                    customer.Email,
                    customer.PhoneNumber,
                    customer.FirstName,
                    customer.LastName,
                    customer.Gender,
                    customer.City,
                    customer.UserRole



                );

                return Ok(new { token = token, userType = "Customer" });
            }
            else
            {
                return BadRequest("Error occurred in login");
            }



        }

        [AllowAnonymous]
        [HttpPost("isEmailExist")]
        public async Task<IActionResult> IsEmailExists([FromQuery] string email)
        {
            var emailExists = await customerRepository.checkEmailExists(email);
            return Ok(emailExists);

        }
        [HttpGet("getAllUsers"), Authorize(Roles = "Customer")]
        public async Task<IActionResult> getAllUsers()
        {
            var userInfo = await customerRepository.getAllUsers();
            return Ok(userInfo);
        }



        [HttpPut("UpdatePassword/{userId}")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword(int userId, UpdatePasswordRequestDTO request)
        {
            
            var photographer = await photographerRepository.GetPhotographerById(userId);
            var customer = await customerRepository.GetCustomerById(userId);
            if (customer != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, customer.Password))
                {
                    return BadRequest("Old password is incorrect");
                }

                // Hash and update the new password
                string newHashedPassword = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
                customer.Password = newHashedPassword;

                // Save changes using the customer repository
               await customerRepository.UpdateCustomerDetails(customer);
                return Ok("");

            }
            if (photographer != null)
            {


                // Check if the old password provided matches the current password
                if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, photographer.Password))
                {
                    return BadRequest("Old password is incorrect");
                }
                string newHashedPassword = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
                photographer.Password = newHashedPassword;
                await photographerRepository.UpdatePhotographerDetails(photographer);
                return Ok();


            }
            return NotFound("User not found");

        }
        [HttpPut("UpdateCustomerDetails")]
        [Authorize]
        public async Task<IActionResult> UpdateCustomer(UpdateCustomerDetailRequestDTO request)
        {
           
            var updatedCustomer = new CustomerDetail
            {
                Id = request.Id,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Gender = request.Gender,
                City = request.City,
              
            };


            var result = await customerRepository.UpdateCustomerDetails(updatedCustomer);

            if (result != null)
            {
                var jwtService = new JwtService(_config); // Initialize JwtService with IConfiguration
                var token = jwtService.GenerateTokenCustomer(
                    result.Id,
                    result.Email,
                    result.PhoneNumber,
                    result.FirstName,
                    result.LastName,
                    result.Gender,
                    result.City,
                    result.UserRole
                  
                );

                return Ok(new { token = token });

            }
            else
            {
                return NotFound("Customer not found");
            }



        }

        [HttpGet("GetCustById")]
       public async Task<IActionResult> getCustById(int id)
        {
           CustomerDetail customer =  await customerRepository.GetCustomerById(id);
            if(customer== null)
            {
                return BadRequest("not found");
            }
            else
            {

            return Ok(customer);
            }
        }




    }
}
