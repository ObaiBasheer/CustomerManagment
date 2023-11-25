public class AddressDto
{
    public int Id { get; set; }
    public string? Location { get; set; }
}

public class AddressADto
{
    public int Id { get; set; }
    public string? Location { get; set; }
    public int CustomerId { get; set; }
}