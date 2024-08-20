using AnimeInfo.Data;
using AnimeInfo.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AnimeInfo.Services.AnimiesServices
{
    public class AnimieDetailService : IAnimieInterface
    {
        private readonly UserManager<UserCredentials> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AnimieDbContext _context;
        private IConfiguration _config;
        const int keySize = 64;
        const int iterations = 350000;
        HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
        public AnimieDetailService(IConfiguration config, AnimieDbContext context)
        {
            _config = config;
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


   
     
        //token generation for the admin login authentication
        public string GenerateToken(UserCredentials UserCredent)
        {
            var securutyKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securutyKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Email,UserCredent.Email),
                new Claim(ClaimTypes.Role,UserCredent.IsAdmin?"Admin":"User")
            }; 
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: credentials);
            var finalToken= new JwtSecurityTokenHandler().WriteToken(token);
            return finalToken;
        }


        //Hashing the password for security
        public string HashingPassword(string password,out byte[] salt)
        {
            salt = RandomNumberGenerator.GetBytes(keySize);
            var hashPassword = Rfc2898DeriveBytes.Pbkdf2(password,
                salt,
                iterations,
                hashAlgorithm,
                keySize);
            return Convert.ToHexString(hashPassword);
        }

        //user registration function.
        public string RegisterUser(UserCredentials userCred)
        {
            if (userCred.Username == null)
            {
                return "User cannot be empty ";
            }
            if (userCred.Password == null)
            {
                return "Password Cannot be empty";
            }
            userCred.Password = HashingPassword(userCred.Password, out byte[] salt);
            //converting the salt to hexstring , becouse in model salt is defined as string
            userCred.Salt = Convert.ToHexString(salt);
            try
            {
                _context.UserCredentials.Add(userCred);
                _context.SaveChanges();
                return "Registrion successfull";
            }
            catch (Exception ex)
            {
                return ("an error occured while registering the user"+ex.Message);
            }
        }

        //verify and compare the password in database and user entered password and its salt 
        bool VerifyPassword(string EnteredPassword, string hashedPassword, string salt)
        {
            //converting salt back to bytes for comparing
            var salt_decrypt = Convert.FromHexString(salt);
            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(
                EnteredPassword,
                salt_decrypt,
                iterations, 
                hashAlgorithm, 
                keySize);
            //converting hashed password to the hex string for  comparing
            var hashedPasswrdToHex = Convert.ToHexString(hashToCompare);
            //comparing the hashed password
            return CryptographicOperations.Equals(hashedPasswrdToHex, hashedPassword);
        }

        //for user authentication admin or user

        public AnimeInfo.Model.UserCredentials Authenticate(string EnteredEmail, string EnteredPassword)
        {
            
            var user = _context.UserCredentials.FirstOrDefault(u => u.Email == EnteredEmail);
            if (user != null)
            {
                //return null;
                var userdata = VerifyPassword(EnteredPassword, user.Password, user.Salt);
                return user;
            }
            else
            {
                return null;
            }

            //if (VerifyPassword(EnteredPassword, user.Password, user.Salt))
            //{
            //  return user;
            //}
           
             //return null;
        }
       
            bool IAnimieInterface.VerifyPassword(string EnteredPassword, string hashedPassword, byte[] salt)
        {
            throw new NotImplementedException();
        }

   
    }
}
