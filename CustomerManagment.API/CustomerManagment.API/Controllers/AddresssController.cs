using CustomerManagment.API.Data;
using CustomerManagment.API.DTOs;
using CustomerManagment.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomerManagment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddresssController : ControllerBase
    {
        private readonly CmDbContext _context;

        public AddresssController(CmDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddressADto>>> GetAllAddress()
        {
            var addresses = await _context.Addresses
                 .Include(c => c.Customer)
                 .ToListAsync();

            var Dtos = addresses.Select(ManualMapping.MapAddressToDtoWithCustomer).ToList();

            return Ok(Dtos);
        }

       


        [HttpGet("GetAddressByCustomerId/{id}")]
        public async Task<ActionResult<AddressDto>> GetAddressByCustomerId(int id)
        {
            var address = await _context.Addresses
                 .Where(c=> c.CustomerId == id).ToListAsync();

            if (address.Count == 0)
            {
                return NotFound();
            }

            var Dtos = address.Select(ManualMapping.MapAddressToDto).ToList();

            return Ok(Dtos);
        }
    }
}
