using LenzPerson.api.Models.DomainModels;
using Microsoft.EntityFrameworkCore;

namespace LenzPerson.api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<CustomerDetail> CustomerDetails { get; set; }



        public DbSet<PhotographerDetail> PhotographerDetails { get;set; }


        public DbSet<PhotographerAssets> PhotographerAssets { get; set;}
        public DbSet<BookingDetail> BookingDetails { get; set;}
        public DbSet<feedback> feedbacks { get; set;}

    }

}
