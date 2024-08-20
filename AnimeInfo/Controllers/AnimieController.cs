using AnimeInfo.DTOs;
using AnimeInfo.Model;
using AnimeInfo.Services.AnimiesServices;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

        //[Authorize(Roles = "User")]
        [Authorize(Roles ="User,Admin")]
        [HttpGet]
        public ActionResult<IEnumerable<GetAnimieDto>>GetAnimies()
        {
            var animieList = _animieInterface.GetAnimies();
            IEnumerable<GetAnimieDto> animieDto = _mapper.Map<IEnumerable<GetAnimieDto>>(animieList);
            return Ok(animieDto);
        }
        [Authorize(Roles ="Admin")]
        [HttpPost]
        public IActionResult AddAnimie(AddAnimieDto animieDto)
        {
            var AnimieData= _mapper.Map<Animes>(animieDto);
            _animieInterface.AddAnimie(AnimieData);
            return Ok();

        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public IActionResult UpdateAnimie(UpdateAnimieDto updateAnimiedto)
        {
           
            var UpdateData = _mapper.Map<Animes>(updateAnimiedto);
            _animieInterface.UpdateAnimie(UpdateData);
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public IActionResult DeleteAnimie(int id)
        {
            
            var status = _animieInterface.DeleteAnimie(id);
            if(status == 0) { return NotFound(); }
            return Ok("entry deleted successfully");
        }
        [Authorize(Roles = "Admin")]
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

