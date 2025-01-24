using System.ComponentModel.DataAnnotations;

namespace ProjectCourse.Models
{
    public class Delivery
    {
        [Key]
        public int id_delivery { get; set; }
        public int id_employee {  get; set; }
        public int? total_cost { get; set; }
        public DateOnly date_of_delivery { get; set; }
    }
}
