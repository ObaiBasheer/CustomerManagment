using CustomerManagment.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManagment.API.DTOs
{
    public static class ManualMapping
    {
        public static CustomerDto MapCustomerToDto(Customer customer)
        {
            var customerDto = new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name!,
                Addresses = customer.Addresses?.Select(MapAddressToDto).ToList()
            };

            return customerDto;
        }

        public static AddressDto MapAddressToDto(Address address)
        {
            return new AddressDto
            {
                Id = address.Id,
                Location = address.Location
            };
        }

        public static AddressADto MapAddressToDtoWithCustomer(Address address)
        {
            return new AddressADto
            {
                Id = address.Id,
                Location = address.Location,
                CustomerId = address.CustomerId,

            };
        }
    }
}
