using System.ComponentModel.DataAnnotations;

namespace ProjectCourse.Models
{
    public class Order_details
    {
        [Key]
        public int id_detail { get; set; }
        public int? id_order { get; set; }
        public int? id_delivery { get; set; }
        public int? id_stack { get; set; }
    }
}
