using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCourse.Database;
using ProjectCourse.Models;

namespace ProjectCourse.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        ApplicationContext db;

        public UserController(ApplicationContext context) { db = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<customer>>> Get() 
        {
            return await db.customer.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<customer>>> Get(int id)
        {
            customer customer = await db.customer.FirstOrDefaultAsync(x => x.id_customer == id);
            if (customer == null) return NotFound();
            return new ObjectResult(customer);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<customer>> Delete(int id)
        {
            customer customer = await db.customer.FirstOrDefaultAsync(y => y.id_customer == id);
            if (customer == null) return NotFound();
            db.customer.Remove(customer);
            await db.SaveChangesAsync();
            return Ok(customer);
        }
        [HttpPatch]
        public async Task<ActionResult<customer>> Patch(customer customer)
        {
            if (customer == null)
            {
                return BadRequest();
            }
            if (!db.customer.Any(x => x.id_customer == customer.id_customer))
            {
                return NotFound();
            }

            db.customer.Update(customer);
            await db.SaveChangesAsync();
            return Ok(customer);
        }

        [HttpPost]
        public async Task<ActionResult<customer>> Post(customer customer)
        {
            if (customer == null) return BadRequest();

            db.customer.Add(customer);
            await db.SaveChangesAsync();
            return Ok(customer);
        }
    }
}
