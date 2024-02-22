using LenzPerson.api.Models.DomainModels;
using LenzPerson.api.Models.DTO;
using LenzPerson.api.Models.JWT;
using LenzPerson.api.Repositories.Implementation;
using LenzPerson.api.Repositories.Interface;
using LenzPerson.api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace LenzPerson.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotographerController : ControllerBase
    {
        private readonly IPhotographerRepository photographerRepository;
        private readonly IPhotoService photoService;
        private IDropboxService dropboxService;
        private readonly IConfiguration _config;
        private readonly ICustomerDetailRepository customerRepository;

        public PhotographerController(IPhotographerRepository photographerRepository, IPhotoService photoService, IDropboxService dropbox, IConfiguration _config, ICustomerDetailRepository customerRepository)
        {
            this.photographerRepository = photographerRepository;
            this.photoService = photoService;
            this.dropboxService = dropbox;
            this._config = _config;
            this.customerRepository = customerRepository;
        }


        [HttpGet("GetAllPhotographers"), Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetAllPhotographers()
        {
            List<PhotographerDetail> deatails = await photographerRepository.getAllPhotographers();
            return Ok(deatails);
        }
        [HttpPost("RegisterPhotographer")]
        public async Task<IActionResult> CreatePhotographer(CreatePhotographerRequestDto request)
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);
            var emailExists = await customerRepository.checkEmailExists(request.Email);
            if (!emailExists)
            {
                var photographer = new PhotographerDetail()
                {
                    Email = request.Email,
                    Password = hashedPassword,
                    PhoneNumber = request.Phone,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Gender = request.Gender,
                    City = request.City,
                    InstaHandle = request.InstaHandle,
                    PortfolioLink = request.PortfolioLink,
                    CameraUsed = request.CameraUsed,
                    PreferredPhotoshootTypes = request.PreferredPhotoshootTypes,
                    ProfilePicture = request.ProfilePicture,
                    UserRole = request.UserRole
                };
                var newPhotographer = await photographerRepository.CreateNewPhotographer(photographer);


                var response = new PhotographerDetailsDto()
                {
                    Email = newPhotographer.Email,
                    Id = newPhotographer.Id,
                    Phone = newPhotographer.PhoneNumber,
                    FirstName = newPhotographer.FirstName,
                    LastName = newPhotographer.LastName,
                    Gender = newPhotographer.Gender,
                    City = newPhotographer.City,
                    InstaHandle = newPhotographer.InstaHandle,
                    PortfolioLink = newPhotographer.PortfolioLink,
                    CameraUsed = newPhotographer.CameraUsed,
                    PreferredPhotoshootTypes = newPhotographer.PreferredPhotoshootTypes,
                    ProfilePicture = newPhotographer.ProfilePicture,
                    UserRole = newPhotographer.UserRole

                };
                return Ok(response);

            }
            else
            {
                return BadRequest(" Email Already Exists");
            }
           
        }




        [HttpPost("uploadImage")]
        public async Task<IActionResult> AddProfileImage(IFormFile photo)
        {
            var result = await photoService.AddPhotoAsync(photo);
            if (result.Error != null)
            {
                return BadRequest(result.Error);
            }

            string imageUrl = result.SecureUrl?.ToString();
            return Ok(new { imageUrl });

        }

        [HttpGet("GetPhotographer"), Authorize(Roles = "Photographer")]
        public async Task<IActionResult> GetPhotographer(string email)
        {
            var photographer = await photographerRepository.GetUserByEmail(email);
            return Ok(photographer);
        }
        [HttpPut("UpdatePhotographerDetails")]
        [Authorize]
        public async Task<IActionResult> UpdatePhotographer(UpdatePhotographerDetailRequestDTO request)
        {
            var updatedPhotographer = new PhotographerDetail
            {
                Id = request.Id,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Gender = request.Gender,
                City = request.City,
                InstaHandle = request.InstaHandle,
                PortfolioLink = request.PortfolioLink,
                CameraUsed = request.CameraUsed,
                ProfilePicture = request.ProfilePicture
            };


            var result = await photographerRepository.UpdatePhotographerDetails(updatedPhotographer);

            if (result != null)
            {
                var jwtService = new JwtService(_config); // Initialize JwtService with IConfiguration
                var token = jwtService.GenerateTokenPhotographer(
                    result.Id,
                    result.Email,
                    result.PhoneNumber,
                    result.FirstName,
                    result.LastName,
                    result.Gender,
                    result.City,
                    result.UserRole,
                    result.InstaHandle,
                    result.PortfolioLink,
                    result.CameraUsed,
                    result.PreferredPhotoshootTypes,
                    result.ProfilePicture
                );

                return Ok(new { token = token });

            }
            else
            {
                return NotFound("Photographer not found");
            }



        }

        [HttpGet("GetPhotographerById")]
        public async Task<IActionResult> GetPhotographerById(int id )
        {
            var photographer = await photographerRepository.GetPhotographerById(id);
            if(photographer == null)
            {
                return BadRequest("not Found");
            }
            else
            {
            return Ok(photographer);

            }
        }

        [HttpGet("getFilteredData")]
        public async Task<IActionResult> GetFilteredResults(string city)
        {
            if(city == null)
            {
                return BadRequest("null");
            }
            var  Photographer =await  photographerRepository.getFilteredPhotographers(city);
            if(Photographer == null)
            {
                return BadRequest("null");
            }
            else
            {
                    return Ok(Photographer);

            }
        }



    }
}