using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        // if private instance is null we assign mediator from services by suing hhtpContext
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        // global method for handling API responses.
        // Logic of the method could have been inside controller without function wrapper but that would make controller bigger than it could be 
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();
            if (result.isSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.isSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }

    }
}