using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProjectCourse.Models
{
    public class customer
    {
        [Key]
        public int id_customer { get; set; }
        public int? score { get; set; } = 0;
        public string? firstname { get; set; }
        public string? secondname { get; set; }
        public string? lastname { get; set; }
        public string? address { get; set; }
        public string cust_password { get; set; }
        public string email { get; set; }
    }
}
