using AnimeInfo.Model;

namespace AnimeInfo.Services.AnimiesServices
{
    public interface IAnimieInterface
    {
        void AddAnimie(Animes anime);
        void RemoveAnimie(Animes anime);
        bool UpdateAnimie(Animes anime);
        List<Animes> GetAnimies();
    }
}
