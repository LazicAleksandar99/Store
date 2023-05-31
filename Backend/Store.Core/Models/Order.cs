using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.Models
{
    public class Order
    {
        [Required]
        [Key]
        public int Id { get; set; }
        [Required]
        [Range(0, float.MaxValue)]
        public float Price { get; set; }
        [Required]
        public DateTime Creation { get; set; }
        [Required]
        public DateTime Delivery { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string ArticleName { get; set; }
        [Required]
        [StringLength(255)]
        public string Comment { get; set; }
        [Required]
        public int SellerId { get; set; }
        public User Seller { get; set; }
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
        public Item Item { get; set; }
    }
}
