namespace LenzPerson.api.Models.DTO
{
    public class CreatePhotographerRequestDto
    {


        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string InstaHandle { get; set; }
        public string PortfolioLink { get; set; }
        public string CameraUsed { get; set; }
        public List<string> PreferredPhotoshootTypes { get; set; }
        public string ProfilePicture { get; set; }
        public string UserRole { get; set; }
    }
}
