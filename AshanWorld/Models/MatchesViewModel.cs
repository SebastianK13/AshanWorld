using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AshanWorld.Models
{
    public class MatchesViewModel
    {
        private List<Ranking> modelRanking;
        public List<MatchesViewModel> matches;
        private List<string> players;

        public MatchesViewModel()
        {
        }
        public MatchesViewModel(List<Ranking> modelRanking)
        {
            this.modelRanking = modelRanking;
            matches = new List<MatchesViewModel>();
            GetPlayers();
            foreach (var p in players)
            {
                var playersMatches = modelRanking.Where(h => h.Host == p || h.Guest == p).ToList();
                foreach (var m in playersMatches)
                {
                    var participants = GetPlayerAndOpponent(m, p);
                    var fWinner = CheckFieldWinner(m, p);
                    var sWinner = CheckSiegeWinner(m, p);
                    var result = CheckFinalResult(fWinner, sWinner, p);
                    MatchesViewModel mvm = new MatchesViewModel()
                        {
                            Player = participants[0],
                            Opponent = participants[1],
                            FieldWinner = fWinner,
                            SiegeWinner = sWinner,
                            FinalResult = result
                        };
                    matches.Add(mvm);
                }
            }

        }

        public string Player { get; set; }
        public string Opponent { get; set; }
        public string FieldWinner { get; set; }
        public string SiegeWinner { get; set; }
        public string FinalResult { get; set; }

        private void GetPlayers()
        {
            var host = modelRanking.Select(h => h.Host).ToList();
            var guest = modelRanking.Select(g => g.Guest).ToList();
            players = host.Union(guest).Distinct().ToList();
        }
        private List<string> GetPlayerAndOpponent(Ranking m, string p)
        {
            List<string> participants = new List<string> ();
            if(m.Host == p)
            {
                participants.Add(p);
                participants.Add(m.Guest);
            }
            else
            {
                participants.Add(p);
                participants.Add(m.Host);
            }
            return participants;
        }
        private string CheckFieldWinner(Ranking m, string p)
        {
            string fWinner="";

            if ((m.FieldBattle == 1 && m.Host == p) || (m.FieldBattle == 2 && m.Guest == p))
            {
                 fWinner = p;
            }
            else 
            {
                if (m.Host != p)
                {
                    fWinner = m.Host;
                }
                else
                {
                    fWinner = m.Guest;
                }
            }

            return fWinner;
        }
        private string CheckSiegeWinner(Ranking m, string p)
        {
            string sWinner = "";

            if ((m.SiegeBattle == 1 && m.Host == p) || (m.SiegeBattle == 2 && m.Guest == p))
            {
                sWinner = p;
            }
            else
            {
                if (m.Host != p)
                {
                    sWinner = m.Host;
                }
                else
                {
                    sWinner = m.Guest;
                }
            }

            return sWinner;
        }
        private string CheckFinalResult(string fWinner, string sWinner, string p)
        {
            string result = "Unsettled";
            if (fWinner == p && sWinner == p)
            {
                return result = "Win";
            }
            else if((fWinner !=p && sWinner == p)||(fWinner == p && sWinner != p))
            {
                return result = "Draw";
            }
            else if(fWinner != p && sWinner != p)
            {
                return result = "Lose";
            }

            return result;
        }
    }
}