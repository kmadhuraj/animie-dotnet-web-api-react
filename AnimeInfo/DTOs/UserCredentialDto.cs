using System.ComponentModel.DataAnnotations;

namespace AnimeInfo.DTOs
{
    public class UserCredentialDto
    {
        //[Required(ErrorMessage = "Username is required.")]
        public string Username { get; set; }

        //[Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; }

        //[Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }
        public string Salt { get; set; }

        public bool IsAdmin { get; set; }
    }
}
