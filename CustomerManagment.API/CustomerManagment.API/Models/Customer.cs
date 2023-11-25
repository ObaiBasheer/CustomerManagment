using System.Net;

namespace CustomerManagment.API.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual List<Address>? Addresses { get; set; }
    }
}
