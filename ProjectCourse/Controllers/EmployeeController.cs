using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCourse.Database;
using ProjectCourse.Models;

namespace ProjectCourse.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        ApplicationContext db;

        public EmployeeController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Employee>>> Get(int id)
        {
            Employee employee = await db.employee.FirstOrDefaultAsync(x => x.id_employee == id);
            if (employee == null) return NotFound();
            return new ObjectResult(employee);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAll()
        {
            return await db.employee.ToListAsync();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> Delete(int id)
        {
            Employee employee = await db.employee.FirstOrDefaultAsync(x => x.id_employee == id);
            if (employee == null) return NotFound();
            db.employee.Remove(employee);
            await db.SaveChangesAsync();
            return Ok(employee);
        }

        [HttpPatch]
        public async Task<ActionResult<Employee>> Patch(Employee employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }
            if (!db.employee.Any(x => x.id_employee == employee.id_employee))
            {
                return NotFound();
            }

            db.employee.Update(employee);
            await db.SaveChangesAsync();
            return Ok(employee);
        }
        [HttpPost]
        public async Task<ActionResult<Employee>> Post(Employee employee)
        {
            if (employee == null) return BadRequest();

            db.employee.Add(employee);
            await db.SaveChangesAsync();
            return Ok(employee);
        }
    }
}
