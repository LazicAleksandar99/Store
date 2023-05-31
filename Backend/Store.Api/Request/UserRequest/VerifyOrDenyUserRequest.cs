using System.ComponentModel.DataAnnotations;

namespace Store.Api.Request.UserRequest
{
    public class VerifyOrDenyUserRequest
    {
        [RegularExpression("^(Verified|Denied)$", ErrorMessage = "Role must be either 'Customer' or 'Seller'.")]
        public string Status { get; set; }
    }
}
