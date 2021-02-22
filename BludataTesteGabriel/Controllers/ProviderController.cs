using BludataTesteGabriel.Data;
using BludataTesteGabriel.Enums;
using BludataTesteGabriel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BludataTesteGabriel.Controllers
{
    [ApiController]
    [Route("v1/provider")]
    public class ProviderController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Provider>>> Get([FromServices] DataContext context)
        {
            var providers = await context.Providers.Include(x => x.Company)
                .AsNoTracking()
                .ToListAsync();
            return providers;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Provider>> GetById([FromServices] DataContext context, int id)
        {
            var providers = await context.Providers.Include(x => x.Company)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
            return providers;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Provider>> GetByCompany([FromServices] DataContext context, int id)
        {
            var providers = await context.Providers.Include(x => x.Company)
                .AsNoTracking()
                .Where(x => x.CompanyId == id)
                .FirstOrDefaultAsync(x => x.Id == id);
            return providers;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Provider>> Post(
           [FromServices] DataContext context,
           [FromBody] Provider model)
        {
            var company = context.Companies.FirstOrDefault(x => x.Id == model.CompanyId);

            if (model.ProviderType == ProviderType.physical &&
               company.UF == UF.Parana && model.Birth <= 18)
            {
                return BadRequest(new { message = "Não foi possível cadastrar o fornecedor!" });

            }
            else
            {
                context.Providers.Add(model);
                await context.SaveChangesAsync();
                return model;
            }
        }

        [HttpDelete]
        [Route("{id:int}")]

        public async Task<ActionResult<Provider>> Delete([FromServices] DataContext context,
            int id)
        {
            var provider = await context.Providers.FirstOrDefaultAsync(x => x.Id == id);
            if (provider == null)
                return NotFound(new { message = "Fornecedor não encontrado!" });

            try
            {
                context.Providers.Remove(provider);
                await context.SaveChangesAsync();
                return provider;
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Não foi possível remover o fornecedor!" });

            }
        }

        [HttpPut]
        [Route("{id:int}")]

        public async Task<ActionResult<Provider>> Put(
            [FromServices] DataContext context,
            int id,
            [FromBody] Provider model)
        {
            if (id != model.Id)
                return NotFound(new { message = "Fornecedor não encontrado!" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                context.Entry<Provider>(model).State = EntityState.Modified;
                await context.SaveChangesAsync();
                return model;
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest(new { message = "Não foi possível atualizar o fornecedor!" });

            }
        }
    }
}
