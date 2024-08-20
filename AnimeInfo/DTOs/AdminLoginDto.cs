using System.ComponentModel.DataAnnotations;

namespace AnimeInfo.DTOs
{
    public class AdminLoginDto
    {
        [Required(ErrorMessage ="Username is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
