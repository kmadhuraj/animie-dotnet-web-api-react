using AnimeInfo.DTOs;
using AnimeInfo.Model;

namespace AnimeInfo.Profile
{
    public class AnimieProfile:AutoMapper.Profile
    {
        public AnimieProfile()
        {
            CreateMap<AddAnimieDto,Animes>();
            CreateMap<Animes,GetAnimieDto>();
            CreateMap<UpdateAnimieDto,Animes>();
            CreateMap<Animes,DeleteAnimie>();
            CreateMap<UserLoginDto,UserCredentials>();
            CreateMap<AdminLoginDto,AdminLogin> ();
            CreateMap<UserCredentialDto,UserCredentials> ();
        }
    }
}
