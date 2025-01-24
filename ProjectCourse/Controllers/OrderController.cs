using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCourse.Database;
using ProjectCourse.Models;

namespace ProjectCourse.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        ApplicationContext db;

        public OrderController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orders>>> Get()
        {
            return await db.orders.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Orders>>> Get(int id)
        {
            Orders order = await db.orders.FirstOrDefaultAsync(x => x.id_order == id);
            if (order == null) return NotFound();
            return new ObjectResult(order);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Orders>> Delete(int id)
        {
            Orders order = await db.orders.FirstOrDefaultAsync(x => x.id_order == id);
            if (order == null) return NotFound();
            db.orders.Remove(order);
            await db.SaveChangesAsync();
            return Ok(order);
        }
        [HttpPatch]
        public async Task<ActionResult<Orders>> Patch(Orders order)
        {
            if (order == null)
            {
                return BadRequest();
            }
            if (!db.customer.Any(x => x.id_customer == order.id_order))
            {
                return NotFound();
            }

            db.orders.Update(order);
            await db.SaveChangesAsync();
            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<Orders>> Post(Orders orders)
        {
            if (orders == null) return BadRequest();

            db.orders.Add(orders);
            await db.SaveChangesAsync();
            return Ok(orders);
        }
    }
}
