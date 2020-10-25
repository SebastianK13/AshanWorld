using AshanWorld.DAL;
using AshanWorld.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AshanWorld.Services
{
    public class ValidationHelper
    {
        private string email;
        private string nickname;
        private AshanWorldDBConnection context;
        private List<bool> exist;
        public List<bool> CheckEmailExisting(string email, string nickname)
        {
            this.email = email;
            this.nickname = nickname;

            DoesEmailExist();
            DoesNicknameExist();

            return exist;
        }
        private void DoesEmailExist()
        {
            exist = new List<bool>();
            context = new AshanWorldDBConnection();
            //var name = context.Users.Where(n => n.UserName == email).FirstOrDefault();

            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            if (UserManager.FindByName(email) != null)
            {
                exist.Add(false);
            }
            else
            {
                exist.Add(true);
            }
        }
        private void DoesNicknameExist()
        {
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            var nicknam = context.Users.Where(n => n.Nickname == nickname).FirstOrDefault();

            if (nicknam != null)
            {
                exist.Add(false);
            }
            else
            {
                exist.Add(true);
            }
        }
    }
    public class MessagesGenerator
    {
        private string errorExistMessages;
        private string email;
        private string nickname;
        //result[0] contains if EmailExist; result[1] contains if  NicknameExist;
        public string CreateExistMsgErr(List<bool>result, string email, string nickname)
        {
            this.email = email;
            this.nickname = nickname;
            if (!result[0])
            {
                EmailExistMsg();
            }
            if (!result[1])
            {
                NickExistMsg();
            }

            return errorExistMessages;
        }
        private void EmailExistMsg()
        {
            errorExistMessages = "Email "+email+" is already taken.,";
        }
        private void NickExistMsg()
        {
            errorExistMessages += "Nickname " + nickname + " is already taken.";
        }
    }
}
