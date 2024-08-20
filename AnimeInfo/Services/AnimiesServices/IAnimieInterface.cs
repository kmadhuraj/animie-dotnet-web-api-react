using AnimeInfo.DTOs;
using AnimeInfo.Model;
using Microsoft.AspNetCore.Identity;

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

        string GenerateToken(UserCredentials UserCredent);
        //AdminLogin AuthenticateAdmin(AdminLogin admin);
        string RegisterUser(UserCredentials ulogin);
        string HashingPassword(string password, out byte[] salt);
        UserCredentials Authenticate(string EnteredEmail, string EnteredPassword);
        bool VerifyPassword(string EnteredPassword, string hashedPassword, byte[] salt);
        //Task<IdentityResult> CreateUserAsync(string Email, string password, bool isAdmin);

        //public string UserRoleManager(UserCredentials userRole);
        //void UpdateAnimie(Animes updatedData); 
    }
}