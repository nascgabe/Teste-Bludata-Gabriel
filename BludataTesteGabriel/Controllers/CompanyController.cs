using BludataTesteGabriel.Data;
using BludataTesteGabriel.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BludataTesteGabriel.Controllers
{
    [EnableCors]
    [ApiController]
    [Route("v1/company")]

    public class CompanyController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Company>>> Get([FromServices] DataContext context)
        {
            var companies = await context.Companies.AsNoTracking().ToListAsync();
            return companies;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Company>> GetById([FromServices] DataContext context, int id)
        {
            var companies = await context.Companies.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            return companies;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Company>> Post(
            [FromServices] DataContext context,
            [FromBody] Company model)
        {
            if (ModelState.IsValid)
            {
                context.Companies.Add(model);
                await context.SaveChangesAsync();
                return model;
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]

        public async Task<ActionResult<Company>> Delete([FromServices] DataContext context,
            int id)
        {
            var company = await context.Companies.FirstOrDefaultAsync(x => x.Id == id);
            if (company == null)
                return NotFound(new { message = "Empresa não encontrada!" });

            try
            {
                context.Companies.Remove(company);
                await context.SaveChangesAsync();
                return company;
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Não foi possível remover a empresa!" });

            }
        }

        [HttpPut]
        [Route("{id:int}")]

        public async Task<ActionResult<Company>> Put(
            [FromServices] DataContext context,
            int id,
            [FromBody] Company model)
        {
            if (id != model.Id)
                return NotFound(new { message = "Empresa não encontrada!" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                context.Entry<Company>(model).State = EntityState.Modified;
                await context.SaveChangesAsync();
                return model;
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest(new { message = "Não foi possível atualizar a empresa!" });

            }
        }
    }
}