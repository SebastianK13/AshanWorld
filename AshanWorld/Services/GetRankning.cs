using AshanWorld.DAL;
using AshanWorld.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;

namespace AshanWorld.Services
{
    public class GetRanking
    {
        private RankingViewModel ranking;
        private AshanWorldDBConnection context;
        private List<Ranking> modelRanking;
        public dynamic CreateTableModels()
        {
            dynamic tableModels = new ExpandoObject();
            tableModels.ranking = GetRankingTable();
            tableModels.matches = GetAllMatches();

            return tableModels;
        }
        private List<RankingViewModel> GetRankingTable()
        {
            context = new AshanWorldDBConnection();
            var rankModel = context.Rankings.ToList();
            modelRanking = rankModel;
            ranking = new RankingViewModel(modelRanking);

            return ranking.RankingList;
        }    
        private List<MatchesViewModel> GetAllMatches()
        {
            MatchesViewModel mvm = new MatchesViewModel(modelRanking);

            var model = mvm.matches;

            return model;
        }
    }
}