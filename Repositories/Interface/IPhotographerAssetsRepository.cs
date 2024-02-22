using LenzPerson.api.Models.DomainModels;

namespace LenzPerson.api.Repositories.Interface
{
    public interface IPhotographerAssetsRepository
    {
        Task AddPortfolioLink(PhotographerAssets portfolioLink);
        Task AddGalleryLinks(PhotographerAssets galleryLink );
       
        Task<List<string>> GetGalleryPhotos(int id);
        Task<List<string>> GetPortfolioLinksByPhotographerId(int photographerId);
        Task DeleteGalleryPhotos(int photographerId, string url);






    }
}


