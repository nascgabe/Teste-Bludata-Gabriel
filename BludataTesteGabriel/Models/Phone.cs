using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BludataTesteGabriel.Models
{
    public class Phone
    {
        [Key]
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
    }
}
