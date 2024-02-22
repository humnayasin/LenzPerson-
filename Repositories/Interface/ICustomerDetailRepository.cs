using LenzPerson.api.Models.DomainModels;

namespace LenzPerson.api.Repositories.Interface
{
    public interface ICustomerDetailRepository
    {


        Task<CustomerDetail> CreateCustomer(CustomerDetail request);


        Task<CustomerDetail> GetUserByEmail(String email);
        Task<List<CustomerDetail>> getAllUsers();
   
        Task<bool> checkEmailExists(String email);
        Task<CustomerDetail> GetCustomerById(int id);

        Task<CustomerDetail> UpdateCustomerDetails(CustomerDetail request); 
    }
}
