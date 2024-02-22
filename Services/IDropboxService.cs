namespace LenzPerson.api.Services
{
    public interface IDropboxService
    {
        Task<string> AddPortFolio(IFormFile portfolio);
    }
}
