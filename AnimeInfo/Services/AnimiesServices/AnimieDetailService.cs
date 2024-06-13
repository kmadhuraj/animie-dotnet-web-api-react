using AnimeInfo.Data;
using AnimeInfo.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

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

        public void UpdateAnimie(Animes anime)
        {
            if (anime == null) throw new ArgumentNullException();
            _context.Animes.Update(anime);
            _context.SaveChanges();
        }
        public int DeleteAnimie(int id)
        {
            var animie=_context.Animes.Find(id);
            if (animie != null)
            {
                _context.Animes.Remove(animie);
                _context.SaveChanges();
                return 1;
            }
            else
            {
                return 0;
            }
            
        }
        public Animes GetAnimiesById(int id)
        {
            return _context.Animes.FirstOrDefault(a=>a.Id==id);
        }
    }
}
