using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using Dropbox.Api;
using Dropbox.Api.Files;
using System;
using System.IO;
using System.Threading.Tasks;

namespace LenzPerson.api.Services
{
    public class DropBoxService : IDropboxService
    {
        private readonly string accessToken;

        public DropBoxService(IConfiguration config)
        {
            accessToken = config.GetSection("DropBoxSettings:access_token").Value;
        }

        public async Task<string> AddPortFolio(IFormFile portfolio)
        {
            try
            {
                using (var client = new DropboxClient(accessToken))
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await portfolio.CopyToAsync(memoryStream);

                        // Set the position of the memory stream to the beginning
                        memoryStream.Position = 0;

                        // Change the folderPath to the desired folder path
                        var folderPath = "/Apps/LenzPerson2";

                        // Get the original filename
                        var fileName = Path.GetFileName(portfolio.FileName);

                        // Combine folderPath and fileName for the full Dropbox path
                        var dropboxPath = $"{folderPath}/{fileName}";

                        var uploadOptions = new UploadArg(dropboxPath, WriteMode.Overwrite.Instance);

                        try
                        {
                            // Upload the file and get the metadata
                            var uploadResponse = await client.Files.UploadAsync(uploadOptions, memoryStream);

                            // Retrieve information about the uploaded file
                            var uploadedFileMetadata = uploadResponse.AsFile;

                            // Create a shared link for the uploaded file
                            var linkResponse = await client.Sharing.CreateSharedLinkWithSettingsAsync(dropboxPath);

                            // Get the shared link URL
                            var sharedLink = linkResponse.Url;

                            // Return the shared link
                            return sharedLink;
                        }
                        catch (ApiException<UploadError> e)
                        {
                            
                            // Handle the error appropriately
                            throw new Exception("Error uploading file:");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
            }
        }
    }
}
