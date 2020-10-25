using AshanWorld.DAL;
using AshanWorld.Models;
using AshanWorld.Services;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AshanWorld.Controllers
{
    public class HomeController : Controller
    {
        AshanWorldDBConnection context;
        public ActionResult Index(string loginError=null, string regError=null, string account = "", string createErr = null)
        {
           
            if (User.Identity.IsAuthenticated)
            {
                ViewData["Nickname"] = getNickname();
                ViewData["MatchErr"] = createErr;
            }
            else if(loginError != "" || regError != "")
            {
                ViewData["LogErrorMsg"] = loginError;
                ViewData["RegErrorMsg"] = regError;
                ViewData["accountL"] = account;
                ViewData["accountR"] = account;
            }

            GetRanking gr = new GetRanking();
            var model = gr.CreateTableModels();

            return View(model);
        }
        [HttpPost]
        public ActionResult AddMatch(Ranking newMatch)
        {
            MatchesInsert mi = new MatchesInsert();
            string createMatchResult = mi.AddNewMatchManager(newMatch);

            return RedirectToAction("Index", new { createErr = createMatchResult});
        }
        
        private string getNickname()
        {
            var store = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var userManager = new UserManager<ApplicationUser>(store);
            string nickname = userManager.FindByNameAsync(User.Identity.Name).Result.Nickname;

            string name = HttpContext.User.Identity.Name;

            context = new AshanWorldDBConnection();
            string nname = context.Users.Where(n => n.UserName == name).Select(ni => ni.Nickname).Single();

            return nickname;
        }
    }
}