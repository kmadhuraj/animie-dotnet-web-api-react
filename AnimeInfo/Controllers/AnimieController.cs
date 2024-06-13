using AnimeInfo.DTOs;
using AnimeInfo.Model;
using AnimeInfo.Services.AnimiesServices;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpPut("{Id}")]
        public IActionResult UpdateAnimie(int Id,UpdateAnimieDto updateAnimiedto)
        {
            if (Id != updateAnimiedto.Id)
            {
                return BadRequest();
            }
            var UpdateData = _mapper.Map<Animes>(updateAnimiedto);
            _animieInterface.UpdateAnimie(UpdateData);
            return Ok();
        }
        [HttpDelete]
        public IActionResult DeleteAnimie(int id)
        {
            
            
            var status = _animieInterface.DeleteAnimie(id);
            if(status == 0) { return NotFound(); }
            return Ok("entry deleted successfully");
        }
        [HttpGet("{Id}")]
        public ActionResult<IEnumerable<GetAnimieDto>> GetAnimieById(int Id)
        {
            var AnimeId = _animieInterface.GetAnimiesById(Id);
            if (AnimeId != null)
            {
                return Ok(_mapper.Map<GetAnimieDto>(AnimeId));
            }
            return NotFound();



        }

    }
}

