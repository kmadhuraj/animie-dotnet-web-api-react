using AnimeInfo.DTOs;
using AnimeInfo.Model;

namespace AnimeInfo.Services.AnimiesServices
{
    public interface IAnimieInterface
    {
        void AddAnimie(Animes anime);
        void RemoveAnimie(Animes anime);
        void UpdateAnimie(Animes anime);
        int DeleteAnimie(int id);
        List<Animes> GetAnimies();
        Animes GetAnimiesById(int id);
  
        //void UpdateAnimie(Animes updatedData);
    }
}
