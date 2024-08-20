using System.ComponentModel.DataAnnotations;

namespace AnimeInfo.Model
{
    public class AdminLogin
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="Email is required")]
        public string Email { get; set; }


        [Required(ErrorMessage = "Password  is required")]
        public string Password { get; set; }
    }
}
