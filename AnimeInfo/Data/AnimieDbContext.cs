using AnimeInfo.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AnimeInfo.Data
{
    public class AnimieDbContext : DbContext
    { 
        public AnimieDbContext(DbContextOptions<AnimieDbContext> options) : base(options) 
        {
        }
        public DbSet<Animes> Animes { get; set; }
        public DbSet<UserCredentials> UserCredentials { get; set; }
        //IdentityDbContext<UserCredentials>
    }
}
    