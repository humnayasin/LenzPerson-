using CloudinaryDotNet;
using Dropbox.Api.Files;
using LenzPerson.api.Models.DomainModels;
using LenzPerson.api.Models.DTO;
using LenzPerson.api.Repositories.Implementation;
using LenzPerson.api.Repositories.Interface;
using LenzPerson.api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using static Dropbox.Api.Files.ListRevisionsMode;
using static Dropbox.Api.Sharing.ListFileMembersIndividualResult;

namespace LenzPerson.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotographerAssetsController : ControllerBase
    {
        private readonly IDropboxService dropBoxService;
        private readonly IPhotographerAssetsRepository photographerAssetsRepository;
        private readonly IPhotographerRepository photographerRepository;
        private readonly IPhotoService photoService;

        public PhotographerAssetsController(IDropboxService dropbox, IPhotographerAssetsRepository photographerAssetsRepository, IPhotographerRepository photographerRepository, IPhotoService photoService)
        {
            this.dropBoxService = dropbox;
            this.photographerAssetsRepository = photographerAssetsRepository;
            this.photographerRepository = photographerRepository;
            this.photoService = photoService;
        }


        [HttpPost("UploadPortfolio"), Authorize]
        public async Task<IActionResult> UploadPortFolio([FromForm] PhotographerAssetsDTO photographerAssetsDTO)
        {
            try
            {
                var userEmailClaim = HttpContext.User.FindFirst(ClaimTypes.Email);

                var userEmail = userEmailClaim.Value;
                var photographer = await photographerRepository.GetUserByEmail(userEmail);
                if (photographer == null)
                {
                    return BadRequest("Photographer not found");
                }
                var result = await dropBoxService.AddPortFolio(photographerAssetsDTO.Portfolio);
                var portfolioLink = new PhotographerAssets
                {
                    PhotographerId = photographer.Id,
                    SharedLink = result,
                    UploadDateTime = DateTime.UtcNow
                };

                await photographerAssetsRepository.AddPortfolioLink(portfolioLink);

                return Ok("portfolio is uploaded on dropbox!");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetPortfolioLinks")]
        [Authorize]

        public async Task<IActionResult> GetPortfolioLinks()
        {
            try
            {
                var userEmailClaim = HttpContext.User.FindFirst(ClaimTypes.Email);
                var userEmail = userEmailClaim.Value;
                var photographer = await photographerRepository.GetUserByEmail(userEmail);
                if (photographer == null)
                {
                    return BadRequest("Photographer not found");
                }


                var portfolioLinks = await photographerAssetsRepository.GetPortfolioLinksByPhotographerId(photographer.Id);

                return Ok(portfolioLinks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("UploadPhotoGallery")]
        [Authorize]
        public async Task<IActionResult> UploadGalleryPhotosLinks([FromForm] IFormFile[] photoGallery)
        {
            try
            {
                if (photoGallery != null)
                {
                    Console.WriteLine("Number of files received: " + photoGallery.Length);

                    var userEmailClaim = HttpContext.User.FindFirst(ClaimTypes.Email);
                    var userEmail = userEmailClaim.Value;
                    var photographer = await photographerRepository.GetUserByEmail(userEmail);
                    if (photographer == null)
                    {
                        return BadRequest("Photographer not found");
                    }

                    var response = await photoService.AddPhotoGalleryAsync(photoGallery);
                    var urls = response.Select(item => item.Url.ToString()).ToArray();

                    var portfolioLink = new PhotographerAssets
                    {
                        PhotographerId = photographer.Id,
                        UploadDateTime = DateTime.UtcNow,
                        ImageUrls = urls
                    };

                    await photographerAssetsRepository.AddGalleryLinks(portfolioLink);

                    return Ok(photoGallery);
                }
                else
                {
                    return BadRequest("no file received");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetGalleryImages")]
        [Authorize]
        public async Task<IActionResult> GetGalleryImages(int Id)
        {
            try
            {
                var imageUrls = await photographerAssetsRepository.GetGalleryPhotos(Id);

                return Ok(imageUrls);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }


        }
        [HttpDelete("DeleteGalleryImages")]
        [Authorize]
        public async Task<IActionResult> DeleteImages(int pid, String url)
        {
            try
            {
                await photographerAssetsRepository.DeleteGalleryPhotos(pid, url);    
                    return Ok();

            }catch(Exception ex) {

                return BadRequest("NotFound");
            }
        
        
        
        }
           

        

    }
}
