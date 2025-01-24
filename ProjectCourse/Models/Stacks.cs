using System.ComponentModel.DataAnnotations;

namespace ProjectCourse.Models
{
    public class Stacks
    {
        [Key]
        public int id_stack {  get; set; }
        public int? quantity { get; set; }
        public int? meds_cost { get; set; }
        public int? exp_time { get; set; }
        public DateOnly date_of_create { get; set; }
        public int? dozen { get; set; }
        public string? meds_naming { get; set; }
    }
}
