using LenzPerson.api.Data;
using LenzPerson.api.Models.DomainModels;
using LenzPerson.api.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace LenzPerson.api.Repositories.Implementation
{
    public class PhotographerRepository : IPhotographerRepository
    {
        private readonly ApplicationDbContext dbContext;

        public PhotographerRepository(ApplicationDbContext dbContext) {
            this.dbContext =dbContext;
        }



        public  async Task<PhotographerDetail> GetUserByEmail(String email)
        {
            return await dbContext.PhotographerDetails.FirstOrDefaultAsync(c => c.Email == email);


        }


      

     async  Task<PhotographerDetail> IPhotographerRepository.CreateNewPhotographer(PhotographerDetail request)
        {
            await dbContext.PhotographerDetails.AddAsync(request);
            await dbContext.SaveChangesAsync();
            return request;
        }

        async Task<List<PhotographerDetail>> IPhotographerRepository.getAllPhotographers()
        {
           return await dbContext.PhotographerDetails.ToListAsync();
        }


         async  Task<List<PhotographerDetail>> IPhotographerRepository.getFilteredPhotographers(string city)
        {
            var photographers = await dbContext.PhotographerDetails
                .Where(d => d.City == city)
                .ToListAsync();
            if (photographers != null)
            {
                return photographers;

            }
            else
            {
                throw new Exception("Not FOund");
            }

        }

        async Task<PhotographerDetail> IPhotographerRepository.GetPhotographerById(int id)
        {
            return await dbContext.PhotographerDetails.FirstOrDefaultAsync(c => c.Id == id);
        }

       async Task<PhotographerDetail> IPhotographerRepository.UpdatePhotographerDetails(PhotographerDetail updatedPhotographer)
        {
            var existingPhotographer = await dbContext.PhotographerDetails
                                                 .FirstOrDefaultAsync(p => p.Id == updatedPhotographer.Id);

            if (existingPhotographer != null)
            {
                
                existingPhotographer.Email = updatedPhotographer.Email;
                existingPhotographer.PhoneNumber = updatedPhotographer.PhoneNumber;
                existingPhotographer.FirstName = updatedPhotographer.FirstName;
                existingPhotographer.LastName = updatedPhotographer.LastName;
                existingPhotographer.Gender = updatedPhotographer.Gender;
                existingPhotographer.City = updatedPhotographer.City;
                existingPhotographer.InstaHandle = updatedPhotographer.InstaHandle;
                existingPhotographer.PortfolioLink = updatedPhotographer.PortfolioLink;
                existingPhotographer.CameraUsed = updatedPhotographer.CameraUsed;
                existingPhotographer.ProfilePicture = updatedPhotographer.ProfilePicture;

                await dbContext.SaveChangesAsync();
            }

            return existingPhotographer;
        }

      
    }
}
