using AutoMapper;
using Store.Core.Common.Interfaces.Services;
using Store.Core.Common.Interfaces.UnitOfWork;
using Store.Core.DTOs.ArticleDTOs;
using Store.Core.Models;

namespace Store.Api.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public ArticleService(IUnitOfWork uow, IMapper mapper) 
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<bool> Create(CreateArticleDTO newArticle)
        {
            if (!await _uow.UserRepository.Check(u => u.Id == newArticle.SalesmanId && u.Role =="Salesman"))
                return false;
            var article = _mapper.Map<Article>(newArticle);
            return await _uow.ArticleRepository.Create(article);
        }
        public async Task<bool> Update(UpdateArticleDTO oldArticle)
        {
            if (!await _uow.UserRepository.Check(u => u.Id == oldArticle.SalesmanId && u.Role == "Salesman"))
                return false;
            var article = _mapper.Map<Article>(oldArticle);
            return await _uow.ArticleRepository.Update(article);
        }
        public async Task<List<GetAllArticlesDTO>> GetAllArticles()
        {
            var result = await _uow.ArticleRepository.Find(a => a.Quantity > 0);
            var returnValue = _mapper.Map<List<GetAllArticlesDTO>>(result);
            return returnValue;
        }
        public async Task<List<GetSalesmanArticlesDTO>> GetSalesmanArticles(int id)
        {
            if (!await _uow.UserRepository.Check(u => u.Id == id))
                return null;
            var result = await _uow.ArticleRepository.Find(a => a.SalesmanId == id);
            var history = _mapper.Map<List<GetSalesmanArticlesDTO>>(result);
            return history;
        }
        public async Task<GetArticleDTO> GetArticle(int id)
        {
            var result = await _uow.ArticleRepository.GetArticle(id);
            var returnValue = _mapper.Map<GetArticleDTO>(result);
            return returnValue;
        }
        public async Task<bool> Delete(int id, int salesman)
        {
            if (!await _uow.UserRepository.Check(u => u.Id == salesman && u.Role == "Salesman"))
                return false;
            return await _uow.ArticleRepository.Delete(id, salesman);
        }
    }
}
