namespace AshanWorld.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Ranking")]
    public partial class Ranking
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(50)]
        public string Host { get; set; }

        [StringLength(50)]
        public string Guest { get; set; }

        public int Summary { get; set; }

        public int SiegeBattle { get; set; }

        public int FieldBattle { get; set; }

        public bool? Confirmed { get; set; }
        public string HostFraction { get; set; }
        public string GuestFraction { get; set; }
    }
}
