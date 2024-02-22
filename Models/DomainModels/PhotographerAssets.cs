namespace LenzPerson.api.Models.DomainModels
{
    public class PhotographerAssets
    {
        public int Id { get; set; }
        public int PhotographerId { get; set; }
        public string? SharedLink { get; set; }
        public DateTime UploadDateTime { get; set; } = DateTime.Now;


        public string[]? ImageUrls { get; set; }
    }
}

