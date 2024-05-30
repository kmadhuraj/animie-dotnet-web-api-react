using AnimeInfo.DTOs;
using AnimeInfo.Model;
using AnimeInfo.Services.AnimiesServices;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnimeInfo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimieController : ControllerBase
    {
        private readonly IAnimieInterface _animieInterface;
        private readonly IMapper _mapper;
        public AnimieController(IAnimieInterface animieInterface, IMapper mapper)
        {
            _animieInterface = animieInterface;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<GetAnimieDto>>GetAnimies()
        {
            var animieList = _animieInterface.GetAnimies();
            IEnumerable<GetAnimieDto> animieDto = _mapper.Map<IEnumerable<GetAnimieDto>>(animieList);
            return Ok(animieDto);
        }
        [HttpPost]
        public IActionResult AddAnimie(AddAnimieDto animieDto)
        {
            var AnimieData= _mapper.Map<Animes>(animieDto);
            _animieInterface.AddAnimie(AnimieData);
            return Ok();
        }
        [HttpPut]
        public IActionResult UpdateAnimie(UpdateAnimieDto animieDto)
        {
            var UpdatedData=_mapper.Map<Animes>(animieDto);
            _animieInterface.UpdateAnimie(UpdatedData);
            return Ok();
        }

    }
}

