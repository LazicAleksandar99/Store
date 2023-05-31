using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Store.Api.Request.ArticleRequest;
using Store.Core.Common.Interfaces.Services;
using Store.Core.DTOs.ArticleDTOs;

namespace Store.Api.Controllers
{
    public class ArticleController : BaseController
    {
        private readonly IArticleService _articleService;
        private readonly IMapper _mapper;

        public ArticleController(IArticleService articleService, IMapper mapper) 
        {
            _articleService = articleService;
            _mapper = mapper;
        }

        [HttpPost("create")]
        [Authorize(Roles = "Salesman")]
        public async Task<IActionResult> Create(CreateArticleRequest newArticle)
        {
            var article = _mapper.Map<CreateArticleDTO>(newArticle);
            if (!await _articleService.Create(article))
                return BadRequest("Invalid input");
            return Ok();
        }


        [HttpGet("detail/{id}")]
        [Authorize(Roles = "Salesman")]
        public async Task<IActionResult> GetArticle(int id)
        {
            if (id < 1)
                return BadRequest("Invalid id");
            var result = await _articleService.GetArticle(id);
            if (result == null)
                return BadRequest("User does not exist");
            return Ok(result);
        }

        [HttpPatch("update")]
        [Authorize(Roles = "Salesman")]
        public async Task<IActionResult> Update(UpdateArticleRequest updatedArticle)
        {
            var article = _mapper.Map<UpdateArticleDTO>(updatedArticle);
            if (!await _articleService.Update(article))
                return BadRequest("Update faild, bad input");
            return Ok();
        }

        [HttpGet("all")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetAllArticles()
        {
            var result = await _articleService.GetAllArticles();
            return Ok(result);
        }

        [HttpGet("salesman/{id}")]
        [Authorize(Roles = "Salesman")]
        public async Task<IActionResult> GetSalesmanArticles(int id)
        {
            var result = await _articleService.GetSalesmanArticles(id);
            if (result == null)
                return BadRequest("Not salesman exist with this id");
            return Ok(result);
        }
    }
}
