using System.ComponentModel.DataAnnotations;

namespace ProjectCourse.Models
{
    public class Orders
    {
        [Key]
        public int id_order { get; set; }
        public int id_customer { get; set; }
        public int? total_cost { get; set; }
        public DateOnly date_of_order { get; set; }
        public bool statys { get; set; } = false;
        public string? address { get; set; }
    }
}
