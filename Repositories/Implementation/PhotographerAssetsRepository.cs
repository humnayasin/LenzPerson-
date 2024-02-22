using System;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using LenzPerson.api.Data;
using LenzPerson.api.Models.DomainModels;
using LenzPerson.api.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using static Dropbox.Api.Files.SearchMatchType;

namespace LenzPerson.api.Repositories.Implementation
{
    public class PhotographerAssetsRepository : IPhotographerAssetsRepository
    {
        private readonly ApplicationDbContext dbContext;

        public PhotographerAssetsRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddPortfolioLink(PhotographerAssets portfolioLink)
        {
            try
            {
                // Add the portfolio link to the database
                dbContext.PhotographerAssets.Add(portfolioLink);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Handle exceptions, log, or rethrow if necessary
                throw new Exception("Error adding portfolio link to the database.", ex);
            }
        }

        public async Task AddGalleryLinks(PhotographerAssets galleryLinks)
        {

            try
            {
                dbContext.PhotographerAssets.Add(galleryLinks);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding gallery  link to the database.", ex);

            }



        }



        async Task<List<string>> IPhotographerAssetsRepository.GetGalleryPhotos(int id)
        {


            var imageUrls = await dbContext.PhotographerAssets
        .Where(p => p.PhotographerId == id && p.ImageUrls != null)
        .ToListAsync();

            // SelectMany and Distinct can be applied after fetching data from the database
            var flattenedUrls = imageUrls
                .SelectMany(p => p.ImageUrls)
                .Distinct()
                .ToList();

            return flattenedUrls;


        }
        public async Task<List<string>> GetPortfolioLinksByPhotographerId(int photographerId)
        {
            var portfolioLinks = await dbContext.PhotographerAssets
                .Where(link => link.PhotographerId == photographerId && link.SharedLink != null)
                .Select(link => link.SharedLink) 
                .ToListAsync();

            var flattenedUrls = portfolioLinks
                .Distinct()
                .ToList();

            return flattenedUrls;
        }
        async Task IPhotographerAssetsRepository.DeleteGalleryPhotos(int photographerId, string url)
        {
            try
            {
                var assetToUpdate = await this.dbContext.PhotographerAssets
                    .FirstOrDefaultAsync(a => a.PhotographerId == photographerId && a.ImageUrls.Contains(url));

                if (assetToUpdate != null)
                {
                    assetToUpdate.ImageUrls = assetToUpdate.ImageUrls.Where(u => u != url).ToArray();

                    await this.dbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Unable to delete", ex);
            }
        }



    }
}