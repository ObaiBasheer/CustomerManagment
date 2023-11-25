using CustomerManagment.API.Data;
using CustomerManagment.API.Models;
using Hangfire;
using Microsoft.EntityFrameworkCore;
using System;

namespace CustomerManagment.API.Tasks
{
    public class BackgroundJobService
    {
        private readonly CmDbContext _context;
        public BackgroundJobService(CmDbContext context)
        {
            _context = context;
            
        }
        

        public void CreateNewAddress()
        {
            // Logic to create a new address and associate it with a random customer
            var randomCustomer = GetRandomCustomer();

            if (randomCustomer != null)
            {
                var newAddress = new Address
                {
                    Location = GenerateRandomLocation(),
                    CustomerId = randomCustomer.Id
                };

                _context.Addresses.Add(newAddress);
                _context.SaveChanges();
            }
        }

        private Customer GetRandomCustomer()
        {
            var customerIds = _context.Customers.Select(c => c.Id).ToList();

            if (customerIds.Count > 0)
            {
                Shuffle(customerIds);
                var randomCustomerId = customerIds.First(); // Select the first (randomized) customer ID
                return _context.Customers.Find(randomCustomerId)!;
            }

            return null;
        }

        private void Shuffle<T>(List<T> list)
        {
            var random = new Random();
            int n = list.Count;

            for (int i = n - 1; i > 0; i--)
            {
                int j = random.Next(0, i + 1);

                // Swap list[i] and list[j]
                T temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }

        private string GenerateRandomLocation()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
