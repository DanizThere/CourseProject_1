using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCourse.Database;
using ProjectCourse.Models;

namespace ProjectCourse.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CatalogueController : ControllerBase
    {
        ApplicationContext db;

        public CatalogueController(ApplicationContext context) { db = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stacks>>> Get()
        {
            return await db.stacks.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Stacks>>> Get(int id)
        {
            Stacks stacks = await db.stacks.FirstOrDefaultAsync(x => x.id_stack == id);
            if (stacks == null) return NotFound();
            return new ObjectResult(stacks);
        }
        [HttpPost]
        public async Task<ActionResult<Stacks>> Post(Stacks stacks)
        {
            if (stacks == null) return BadRequest();

            db.stacks.Add(stacks);
            await db.SaveChangesAsync();
            return Ok(stacks);
        }
        [HttpPatch]
        public async Task<ActionResult<Stacks>> Patch(Stacks stacks)
        {
            if (stacks == null)
            {
                return BadRequest();
            }
            if (!db.stacks.Any(x => x.id_stack == stacks.id_stack))
            {
                return NotFound();
            }

            db.stacks.Update(stacks);
            await db.SaveChangesAsync();
            return Ok(stacks);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Stacks>> Delete(int id)
        {
            Stacks stacks = await db.stacks.FirstOrDefaultAsync(y => y.id_stack == id);
            if (stacks == null) return NotFound();
            db.stacks.Remove(stacks);
            await db.SaveChangesAsync();
            return Ok(stacks);
        }
    }
}
