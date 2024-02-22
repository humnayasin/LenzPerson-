using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace LenzPerson.api.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary cloudinary;

        public PhotoService(IConfiguration config)
        {


            Account account = new Account(
            config.GetSection("CloudinarySettings:CloudName").Value,
            config.GetSection("CloudinarySettings:ApiKey").Value,
            config.GetSection("CloudinarySettings:ApiSecret").Value

                );


            cloudinary = new Cloudinary(account);
            cloudinary.Api.Secure = true;



        }
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {


            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(800)

                };
                uploadResult = await cloudinary.UploadAsync(uploadParams);




            }
            return uploadResult;
        }

        public Task<ImageUploadResult> DeletePhotoAsync(string photoId)
        {
            throw new NotImplementedException();
        }


        public async Task<ImageUploadResult[]> AddPhotoGalleryAsync(IFormFile[] files)
        {
            var results = new List<ImageUploadResult>();

            foreach (var file in files)
            {
                var result = await AddPhotoAsync(file);
                results.Add(result);
            }

            // Return the results or any other necessary information
            return results.ToArray();
        }
 
    }
    }
