using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LenzPerson.api.Models.JWT
{
    public class JwtService
    {

        public string SecretKey {  get; set; }
        public int TokenDuration {  get; set; }
        public IConfiguration config { get; set; }

        public JwtService(IConfiguration _config ) {

           config = _config;
            this.SecretKey = config.GetSection("jwtConfig").GetSection("key").Value;
            this.TokenDuration = Int32.Parse(config.GetSection("jwtConfig").GetSection("Duration").Value);
        }





        public string GenerateTokenCustomer(int Id, string Email, string PhoneNumber, string FirstName, string LastName, string Gender, string City, string UserRole)
        {

        
          
          var key  = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecretKey));
            var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);



            var payload = new[]
            {   
                    new Claim("id", Id.ToString()),
                    new Claim("email", Email),
                    new Claim("phoneNumber", PhoneNumber),
                    new Claim("firstName", FirstName),
                    new Claim("lastName", LastName),
                    new Claim("gender", Gender),
                    new Claim("city", City),
                    new Claim("role", UserRole )
                   
                    

            };

            var jwtToken = new JwtSecurityToken(
                issuer: "localhost",
                audience: "localhost",
                claims: payload,
                expires: DateTime.Now.AddMinutes(TokenDuration),
                signingCredentials: signature

                );

            //to return jwt in string format
            return (new JwtSecurityTokenHandler().WriteToken(jwtToken));
       


        }



                public string GenerateTokenPhotographer(
            int Id, string Email, string PhoneNumber, string FirstName, string LastName,
            string Gender, string City, string UserRole, string InstaHandle, string PortfolioLink,
            string CameraUsed, List<string> PreferredPhotoshootTypes, string ProfilePicture)
                {
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecretKey));
                    var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var claims = new List<Claim>
            {
                new Claim("id", Id.ToString()),
                new Claim("email", Email),
                new Claim("phoneNumber", PhoneNumber),
                new Claim("firstName", FirstName),
                new Claim("lastName", LastName),
                new Claim("gender", Gender),
                new Claim("city", City),
                new Claim("role", UserRole),
                new Claim("instaHandle", InstaHandle),
                new Claim("portfolioLink", PortfolioLink),
                new Claim("cameraUsed", CameraUsed),
                new Claim("profilePicture", ProfilePicture)
            };

                    if (PreferredPhotoshootTypes != null)
                    {
                        foreach (var type in PreferredPhotoshootTypes)
                        {
                            claims.Add(new Claim("preferredPhotoshootTypes", type));
                        }
                    }

                    var jwtToken = new JwtSecurityToken(
                        issuer: "localhost",
                        audience: "localhost",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(TokenDuration),
                        signingCredentials: signature
                    );

                    return new JwtSecurityTokenHandler().WriteToken(jwtToken);
                }



    }





































}






