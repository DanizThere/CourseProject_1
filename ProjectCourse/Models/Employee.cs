using System.ComponentModel.DataAnnotations;

namespace ProjectCourse.Models
{
    public class Employee
    {
        [Key]
        public int id_employee { get; set; }
        public string? emp_position { get; set; }
        public string? firstname { get; set; }
        public string? secondname { get; set; }
        public string? lastname { get; set; }
        public bool statys { get; set; } = true;
        public string? email { get; set; }
        public string? emp_password { get; set; }
        public int salary { get; set; }
    }
}
