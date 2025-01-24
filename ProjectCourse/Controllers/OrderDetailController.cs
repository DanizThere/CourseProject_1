using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCourse.Database;
using ProjectCourse.Models;

namespace ProjectCourse.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        ApplicationContext db;

        public OrderDetailController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order_details>>> Get()
        {
            return await db.order_details.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Order_details>>> Get(int id)
        {
            Order_details order_det = await db.order_details.FirstOrDefaultAsync(x => x.id_detail == id);
            if (order_det == null) return NotFound();
            return new ObjectResult(order_det);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order_details>> Delete(int id)
        {
            Order_details order_det = await db.order_details.FirstOrDefaultAsync(x => x.id_detail == id);
            if (order_det == null) return NotFound();
            db.order_details.Remove(order_det);
            await db.SaveChangesAsync();
            return Ok(order_det);
        }
        [HttpPatch]
        public async Task<ActionResult<Order_details>> Patch(Order_details order_det)
        {
            if (order_det == null)
            {
                return BadRequest();
            }
            if (!db.order_details.Any(x => x.id_detail == order_det.id_detail))
            {
                return NotFound();
            }

            db.order_details.Update(order_det);
            await db.SaveChangesAsync();
            return Ok(order_det);
        }

        [HttpPost]
        public async Task<ActionResult<Order_details>> Post(Order_details order_det)
        {
            if (order_det == null) return BadRequest();

            db.order_details.Add(order_det);
            await db.SaveChangesAsync();
            return Ok(order_det);
        }
    }
}
