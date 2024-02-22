using LenzPerson.api.Models.DomainModels;
using System.Numerics;

namespace LenzPerson.api.Repositories.Interface
{
    public interface IPhotographerRepository
    {
        Task<PhotographerDetail> CreateNewPhotographer(PhotographerDetail request);
        Task<PhotographerDetail> UpdatePhotographerDetails(PhotographerDetail request);
        Task<PhotographerDetail> GetUserByEmail(String email);
        Task<PhotographerDetail> GetPhotographerById(int id);
 
        Task<List<PhotographerDetail>> getAllPhotographers();
        Task<List<PhotographerDetail>> getFilteredPhotographers(string city);
   

    }
}
