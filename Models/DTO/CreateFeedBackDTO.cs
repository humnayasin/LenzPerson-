namespace LenzPerson.api.Models.DTO
{
    public class CreateFeedBackDTO
    {
        public int PId { get; set; }
        public int BId { get; set; }
        public int CId { get; set; }
        public string CName { get; set; }
        public string Comment { get; set; }
    }
}
