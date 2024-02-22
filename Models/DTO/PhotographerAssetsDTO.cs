
namespace LenzPerson.api.Models.DTO
{
    public class PhotographerAssetsDTO
    {
        public IFormFile Portfolio { get; set; }

        // Parameterless constructor for model binding
        public PhotographerAssetsDTO()
        {
        }

        public PhotographerAssetsDTO(IFormFile portfolio)
        {
            Portfolio = portfolio;
        }
    }
}
