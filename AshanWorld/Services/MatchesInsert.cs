using AshanWorld.DAL;
using AshanWorld.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AshanWorld.Services
{
    public class MatchesInsert
    {
        private AshanWorldDBConnection context;
        private Ranking match;
        private int TotalPoints;
        public string AddNewMatchManager(Ranking match)
        {
            this.match = match;
            CountTotalPoints(match.FieldBattle);
            CountTotalPoints(match.SiegeBattle);
            match.Summary = TotalPoints;
            match.Confirmed = false;
            bool result = CheckIfPlayerExist();
            if (result)
            {
                InsertMatchToDb();
                return null;
            }
            else
            {
                return "One of the player doesn't exist";
            }
        }
        private void CountTotalPoints(int winner)
        {
            switch (winner)
            {
                case 2:
                    TotalPoints += 3;
                    break;
                case 1:
                    TotalPoints += 3;
                    break;
                case 0:
                    TotalPoints += 0;
                    break;
            }
        }
        private bool CheckIfPlayerExist()
        {
            context = new AshanWorldDBConnection();
            bool exist = context.Users.Any(n => n.Nickname == match.Host || n.Nickname == match.Guest);
                
            return exist;
        }
        private void InsertMatchToDb()
        {
            context.Rankings.Add(match);
            context.SaveChanges();
        }
    }
}