namespace LenzPerson.api.Models.DTO
{
    public class UpdatePasswordRequestDTO
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
