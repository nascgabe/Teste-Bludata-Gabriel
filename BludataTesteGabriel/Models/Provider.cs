using BludataTesteGabriel.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BludataTesteGabriel.Models
{
    public class Provider
    {
        [Key]
        public int Id { get; set; }

        [DisplayFormat(DataFormatString = "{dd/MM/yyyy}")]
        public DateTime Register { get; set; } = DateTime.Now;

        public string Name { get; set; }

        [Required(ErrorMessage = "Esse campo é obrigatório!")]
        public int Birth { get; set; } 

        [Required(ErrorMessage = "Esse campo é obrigatório!")]
        public ProviderType ProviderType { get; set; }

        [StringLength(14, MinimumLength = 11,
            ErrorMessage = "Esse campo deve conter no máximo 14 e no mínimo 11 caracteres!")]
        public string CPF { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public ICollection<Phone> Phones { get; set; } = new List<Phone>();
    }
}

