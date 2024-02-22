namespace LenzPerson.api.Models.DomainModels
{
    public class feedback
    {
        public int Id { get; set; }
        public int BId { get; set; }
        public int PId { get; set; }
        public int CId { get; set; }
        public string CName { get; set; }
        public string Comment  { get; set; }
    }
}
