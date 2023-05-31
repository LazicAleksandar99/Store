using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Store.Api.Request.OrderRequest;
using Store.Core.Common.Interfaces.Services;
using Store.Core.DTOs.ArticleDTOs;
using Store.Core.DTOs.OrderDTOs;

namespace Store.Api.Controllers
{
    public class OrderController : BaseController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpPost("create")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> Create(CreateOrderRequest newOrder)
        {
            var order = _mapper.Map<CreateOrderDTO>(newOrder);
            var result = await _orderService.Create(order);
            if (result == null)
                return BadRequest("Order is not valid");

            return Ok(result);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AllOrder()
        {
            var result = await _orderService.AllOrders();
            return Ok(result);
        }

        [HttpGet("active/{id}")]
        [Authorize(Roles = "Customer,Salesman")]
        public async Task<IActionResult> GetActiveOrders(int id)
        {
            var result = await _orderService.GetActiveOrders(id);
            if (result == null)
                return BadRequest("Bad ID");
            return Ok(result);
        }


        [HttpGet("history/{id}")]
        [Authorize(Roles = "Customer,Salesman")]
        public async Task<IActionResult> History(int id)
        {
            var result = await _orderService.History(id);
            if (result == null)
                return BadRequest("Bad ID");
            return Ok(result);
        }

        [HttpPatch("cancel")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> CancelOrder(CancleOrderRequest cancel)
        {
            var order = _mapper.Map<CancleOrderDTO>(cancel);
            if (!await _orderService.CancelOrder(order))
                return BadRequest();
            return Ok();
        }
    }
}
