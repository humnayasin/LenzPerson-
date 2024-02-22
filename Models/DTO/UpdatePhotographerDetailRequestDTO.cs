namespace LenzPerson.api.Models.DTO
{
    public class UpdatePhotographerDetailRequestDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string InstaHandle { get; set; }
        public string PortfolioLink { get; set; }
        public string CameraUsed { get; set; }
        public string ProfilePicture { get; set; }
     
    }
}
