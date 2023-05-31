using Microsoft.EntityFrameworkCore;
using Store.Core.Common.Interfaces.Repositories;
using Store.Core.Helper;
using Store.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly StoreDataContext _data;
        private readonly Authentication _authentication;


        public UserRepository(StoreDataContext data)
        {
            _authentication = new Authentication();
            _data = data;

        }

        public async Task<User> Login(string email, string password)
        {
            var user = await _data.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null || user.PasswordKey == null)
                return null!;
            if (user.Verification != "Verified")
                return null;
            if (!_authentication.MatchPasswordHash(password, user.Password!, user.PasswordKey))
                return null!;

            return user;
        }

        public async Task<bool> Register(User newUser)
        {
            try
            {
                _data.Users.Add(newUser);
                await _data.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<User> VerifyOrDeny(int userId, string status)
        {
            var user = await _data.Users.SingleOrDefaultAsync(x => x.Id == userId);
            user.Verification = status;
            await _data.SaveChangesAsync();
            return user;
        }

        //da li email postoji
        //da li email postoji izuzev ovog usera
        //da li username postoji
        //da li username postoji izuzev ovog usera
        //da li ovaj user postiji ID
        //da li ovaj salesman postoji ID

        public async Task<bool> Find(Expression<Func<User, bool>> predicate)
        {
            return await _data.Users.AnyAsync(predicate);
        }
        //moyzda find za ova dva
        public async Task AddProfilePictureToUser(string email, string picture)
        {
            var user = await _data.Users.SingleOrDefaultAsync(x => x.Email == email);
            user.Picture = picture;
            await _data.SaveChangesAsync();
        }
        public async Task UpdateUserProfilePicture(int id, string picture)
        {
            var user = await _data.Users.SingleOrDefaultAsync(x => x.Id == id);
            user.Picture = picture;
            await _data.SaveChangesAsync();
        }
        public async Task<List<User>> GetSellers()
        {
            var sellers = await _data.Users.Where(u => u.Role == "Seller").ToListAsync();
            return sellers;
        }
        public async Task<User> GetUserDetails(int id)
        {
            var user = await _data.Users.SingleOrDefaultAsync(x => x.Id == id);
            return user;
        }
    }
}
