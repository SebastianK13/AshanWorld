namespace AshanWorld.DAL
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Data.Entity.ModelConfiguration.Conventions;
    using Microsoft.AspNet.Identity.EntityFramework;
    using AshanWorld.Models;

    public partial class AshanWorldDBConnection : IdentityDbContext<ApplicationUser>
    {
        public AshanWorldDBConnection()
            : base("AshanWorldDBConnection")
        {
        }
        public DbSet<Ranking> Rankings { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}