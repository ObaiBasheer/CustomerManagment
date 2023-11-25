namespace CustomerManagment.API.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string? Location { get; set; }
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
    }
}