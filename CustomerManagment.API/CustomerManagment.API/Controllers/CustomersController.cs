using CustomerManagment.API.Data;
using CustomerManagment.API.DTOs;
using CustomerManagment.API.Models;
using CustomerManagment.API.Tasks;
using Hangfire;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/customers")]
public class CustomersController : ControllerBase
{
    private readonly CmDbContext _context;

    public CustomersController(CmDbContext context)
    {
        _context = context;
    }

    // GET: api/customers
    [HttpGet()]
    public async Task<ActionResult<IEnumerable<CustomerDto>>> GetAllCustomers()
    {
        var customers =await _context.Customers
             .Include(c => c.Addresses)
             .ToListAsync();

        var customerDtos = customers.Select(ManualMapping.MapCustomerToDto).ToList();

        return Ok(customerDtos);
    }

    // GET: api/customers/5
    [HttpGet("{id}")]
    public async Task<ActionResult<CustomerDto>> GetCustomer(int id)
    {
        var customer =await _context.Customers
             .Include(c => c.Addresses)
             .FirstOrDefaultAsync(c => c.Id == id);

        if (customer == null)
        {
            return NotFound();
        }

        var customerDto = ManualMapping.MapCustomerToDto(customer);

        return Ok(customerDto);
    }

  

    // POST: api/customers
    [HttpPost("CreateCustomer")]
    public async Task<ActionResult<Customer>> CreateCustomer(CreateCustomerDto customer)
    {
        if (customer == null) { return BadRequest(); }

        var dupCustomer = _context.Customers.Any(x=>x.Name == customer.Name);


        if (dupCustomer) return BadRequest("The Customer Already Found");
        var customers = new Customer
        {
            Name = customer.Name,
        };
        _context.Customers.Add(customers);
        await _context.SaveChangesAsync();

        // Trigger a background job to create a new address every 1 minute

        RecurringJob.AddOrUpdate<BackgroundJobService>("AddAddressEveryOneMin", x => x.CreateNewAddress(), Cron.Minutely);

        return StatusCode(201);
    }

    // PUT: api/customers/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCustomer(int id, UpdateCustomerDto customer)
    {
        
        if (!CustomerExists(id))
        {
            return BadRequest();
        }

        _context.Entry(customer).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CustomerExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/customers/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        var customer = await _context.Customers.FirstOrDefaultAsync(x=> x.Id == id);
        if (customer == null)
        {
            return NotFound();
        }

        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CustomerExists(int id)
    {
        return _context.Customers.Any(e => e.Id == id);
    }
   
}
