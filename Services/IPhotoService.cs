using CloudinaryDotNet.Actions;

namespace LenzPerson.api.Services
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        Task<ImageUploadResult[]> AddPhotoGalleryAsync(IFormFile[] files);
        Task<ImageUploadResult> DeletePhotoAsync(string photoId);
     
     


        }
}
