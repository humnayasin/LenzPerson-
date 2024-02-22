using LenzPerson.api.Data;
using LenzPerson.api.Models.DomainModels;
using LenzPerson.api.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace LenzPerson.api.Repositories.Implementation
{
    public class CustomerDetailRepository : ICustomerDetailRepository
    {
        private readonly ApplicationDbContext dbContext;

        public CustomerDetailRepository(ApplicationDbContext dbContext) { 
        
        this.dbContext = dbContext;

        }   

        public async Task<CustomerDetail> CreateCustomer(CustomerDetail customer)
        {
            await dbContext.CustomerDetails.AddAsync(customer);
            await dbContext.SaveChangesAsync();
            return customer;
        }



        public async Task<CustomerDetail> GetUserByEmail(String email)
        {
            return await dbContext.CustomerDetails.FirstOrDefaultAsync(c => c.Email == email);

           
        }


        public async Task<bool> checkEmailExists(string email)
        {
            return await dbContext.CustomerDetails.AnyAsync(c => c.Email == email)
                    || await dbContext.PhotographerDetails.AnyAsync(p => p.Email == email);

        }

        async Task<List<CustomerDetail>> ICustomerDetailRepository.getAllUsers()
        {
            return await dbContext.CustomerDetails.ToListAsync();     
        }
        

        async Task<CustomerDetail> ICustomerDetailRepository.GetCustomerById(int id)
        {
            return await dbContext.CustomerDetails.FirstOrDefaultAsync(c => c.Id == id);
        }

    
        public async Task<CustomerDetail> UpdateCustomerDetails(CustomerDetail updatedCustomer)
        {
            var existingCustomer = await dbContext.CustomerDetails
                                               .FirstOrDefaultAsync(c => c.Id == updatedCustomer.Id);

            if (existingCustomer != null)
            {
                existingCustomer.Email = updatedCustomer.Email;
                existingCustomer.PhoneNumber = updatedCustomer.PhoneNumber;
                existingCustomer.FirstName = updatedCustomer.FirstName;
                existingCustomer.LastName = updatedCustomer.LastName;
                existingCustomer.Gender = updatedCustomer.Gender;
                existingCustomer.City = updatedCustomer.City;
                // Add other properties as needed

                await dbContext.SaveChangesAsync();
            }

            return existingCustomer;
        }
    

    }
}


