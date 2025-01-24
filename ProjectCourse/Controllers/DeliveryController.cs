using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCourse.Database;
using ProjectCourse.Models;

namespace ProjectCourse.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        ApplicationContext db;

        public DeliveryController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Delivery>>> Get()
        {
            return await db.delivery.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Delivery>>> Get(int id)
        {
            Delivery delivery = await db.delivery.FirstOrDefaultAsync(x => x.id_delivery == id);
            if (delivery == null) return NotFound();
            return new ObjectResult(delivery);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Delivery>> Delete(int id)
        {
            Delivery delivery = await db.delivery.FirstOrDefaultAsync(x => x.id_delivery == id);
            if (delivery == null) return NotFound();
            db.delivery.Remove(delivery);
            await db.SaveChangesAsync();
            return Ok(delivery);
        }
        [HttpPatch]
        public async Task<ActionResult<Delivery>> Patch(Delivery delivery)
        {
            if (delivery == null)
            {
                return BadRequest();
            }
            if (!db.delivery.Any(x => x.id_delivery == delivery.id_delivery))
            {
                return NotFound();
            }

            db.delivery.Update(delivery);
            await db.SaveChangesAsync();
            return Ok(delivery);
        }

        [HttpPost]
        public async Task<ActionResult<Delivery>> Post(Delivery delivery)
        {
            if (delivery == null) return BadRequest();

            db.delivery.Add(delivery);
            await db.SaveChangesAsync();
            return Ok(delivery);
        }
    }
}
