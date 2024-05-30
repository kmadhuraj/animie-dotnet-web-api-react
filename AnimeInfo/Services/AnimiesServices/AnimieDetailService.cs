using AnimeInfo.Data;
using AnimeInfo.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AnimeInfo.Services.AnimiesServices
{
    public class AnimieDetailService : IAnimieInterface
    {
        private readonly AnimieDbContext _context;
        public AnimieDetailService(AnimieDbContext context)
        {
            _context = context;
        }

        public void AddAnimie(Animes anime)
        {
            _context.Animes.Add(anime);
            _context.SaveChanges();
        }

        public List<Animes> GetAnimies()
        {
            return _context.Animes.ToList();
        }

        public void RemoveAnimie(Animes anime)
        {
            throw new NotImplementedException();
        }

        public bool UpdateAnimie(Animes anime)
        {
            if(anime == null)
            {
                return false;
               // return b NotFound("no data found");
            }
            _context.Animes.Update(anime);
            _context.SaveChanges();
            return true;
        }
    }
}
