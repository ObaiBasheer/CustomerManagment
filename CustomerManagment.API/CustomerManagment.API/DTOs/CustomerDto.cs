public class CreateCustomerDto
{
    public string Name { get; set; } = string.Empty;
}

public class UpdateCustomerDto
{
    public int Id {  get; set; }
    public string Name { get; set; } = string.Empty;

}

public class CustomerDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<AddressDto>? Addresses { get; set; }
}