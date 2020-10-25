using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AshanWorld.Models
{
    public class RankingViewModel
    {
        public List<RankingViewModel> RankingList;
        private List<Ranking> Rankings;
        private List<string> Players;
        private List<int> matchesNumber;
        private List<int> siegeNumber;
        private List<int> fieldNumber;
        private List<int> points;      
        public RankingViewModel(List<Ranking> ranking)
        {
            RankingList = new List<RankingViewModel>();
            Rankings = ranking;
            GetPlayersWithoutDistinct();
            CountMatches();
            CountSiegeBattles();
            CountFieldBattles();
            CountPointsPerPlayer();

            for (int i = 0; i < Players.Count(); i++)
            {
                RankingViewModel rvm = new RankingViewModel
                {
                    Player = Players[i],
                    MatchesAmount = matchesNumber[i],
                    SiegeBattles = siegeNumber[i],
                    FieldBattles = fieldNumber[i],
                    Points = points[i],
                };
                RankingList.Add(rvm);
            }
            SortByPoints();
        }
        public RankingViewModel()
        {
        }
        public string Player { get; set; }
        public int MatchesAmount { get; set; }
        public int SiegeBattles { get; set; }
        public int FieldBattles { get; set; }
        public int Points { get; set; }

        private void GetPlayersWithoutDistinct()
        {
            var host = Rankings.Select(h => h.Host).Distinct().ToList();
            var guest = Rankings.Select(h => h.Guest).Distinct().ToList();

            Players = host.Union(guest).ToList();
        }
        private void CountMatches()
        {
            matchesNumber = new List<int>();
            foreach (var p in Players)
            {
                matchesNumber.Add(Rankings
                  .Where(h => h.Host == p || h.Guest == p)
                  .Count());
                //matchesNumber.Add(Rankings
                //  .Where(h => p
                //  .Any(x => h.Host.Contains(x) || p
                //  .Any(y => h.Guest.Contains(y))))
                //  .Count());
            }
        }
        private void CountSiegeBattles()
        {
            siegeNumber = new List<int>();
            foreach (var p in Players)
            {
                //siegeNumber.Add(Rankings
                //    .Where(s => (s.SiegeBattle == 1 && p
                //    .Any(x => s.Host.Contains(x))) ||
                //    (s.SiegeBattle == 2 && p
                //    .Any(y=>s.Guest.Contains(y))))
                //    .Count());

                siegeNumber.Add(Rankings
                    .Where(s => (s.SiegeBattle == 1 && 
                    s.Host == p)||
                    (s.SiegeBattle == 2 &&
                    s.Guest == p))
                    .Count());
            }
            //var siegeNumber = Rankings
                //.Where(s => s.SiegeBattle == 1 && Players
                //.Any(x => s.Host.Contains(x)));
        }
        private void CountFieldBattles()
        {
            fieldNumber = new List<int>();
            foreach (var p in Players)
            {
                fieldNumber.Add(Rankings
                .Where(s => (s.FieldBattle == 1 &&
                s.Host == p) ||
                (s.FieldBattle == 2 &&
                s.Guest == p))
                .Count());
            }
        }
        private void CountPointsPerPlayer()
        {
            points = new List<int>();
            for (int i = 0; i < siegeNumber.Count(); i++)
            {
                points.Add((3 * siegeNumber[i]) + (3 * fieldNumber[i]));
            }
        }
        private void SortByPoints()
        {
            RankingList.Sort((x, y) => y.Points.CompareTo(x.Points));
        }
    }
}