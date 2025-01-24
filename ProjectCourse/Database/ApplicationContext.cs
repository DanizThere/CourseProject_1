using Microsoft.EntityFrameworkCore;
using ProjectCourse.Models;

namespace ProjectCourse.Database
{
    public class ApplicationContext : DbContext
    {
        public DbSet<customer> customer { get; set; }
        public DbSet<Delivery> delivery { get; set; }
        public DbSet<Employee> employee { get; set; }
        public DbSet<Stacks> stacks { get; set; }
        public DbSet<Orders> orders { get; set; }
        public DbSet<Order_details> order_details { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }
    }
}
