namespace TrainApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update7 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CommentsOntrains",
                c => new
                    {
                        CommentID = c.Int(nullable: false, identity: true),
                        text = c.String(),
                        timeNow = c.DateTime(nullable: false),
                        PostID = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CommentID)
                .ForeignKey("dbo.TrainPosts", t => t.PostID, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserID, cascadeDelete: true)
                .Index(t => t.PostID)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.TrainPosts",
                c => new
                    {
                        PostID = c.Int(nullable: false),
                        Text = c.String(),
                        timeNow = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.PostID)
                .ForeignKey("dbo.TrainTrips", t => t.PostID)
                .Index(t => t.PostID);
            
            CreateTable(
                "dbo.TrainTrips",
                c => new
                    {
                        TrainID = c.Int(nullable: false),
                        LeaveStation = c.String(),
                        ArriveStation = c.String(),
                        TrainTripStart = c.DateTime(nullable: false),
                        TrainTripFinish = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.TrainID)
                .ForeignKey("dbo.TrainTypes", t => t.TrainID)
                .Index(t => t.TrainID);
            
            CreateTable(
                "dbo.stations",
                c => new
                    {
                        stationID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.stationID);
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        ticketID = c.Int(nullable: false, identity: true),
                        type = c.String(),
                        ticketImage = c.String(),
                        TrainTripObj_TrainID = c.Int(),
                        Userobj_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ticketID)
                .ForeignKey("dbo.TrainTrips", t => t.TrainTripObj_TrainID)
                .ForeignKey("dbo.Users", t => t.Userobj_ID)
                .Index(t => t.TrainTripObj_TrainID)
                .Index(t => t.Userobj_ID);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Username = c.String(nullable: false),
                        pass = c.String(nullable: false),
                        email = c.String(nullable: false),
                        phone = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.TrainTypes",
                c => new
                    {
                        TypeID = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.TypeID);
            
            CreateTable(
                "dbo.stationTrainTrips",
                c => new
                    {
                        station_stationID = c.Int(nullable: false),
                        TrainTrip_TrainID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.station_stationID, t.TrainTrip_TrainID })
                .ForeignKey("dbo.stations", t => t.station_stationID, cascadeDelete: true)
                .ForeignKey("dbo.TrainTrips", t => t.TrainTrip_TrainID, cascadeDelete: true)
                .Index(t => t.station_stationID)
                .Index(t => t.TrainTrip_TrainID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CommentsOntrains", "UserID", "dbo.Users");
            DropForeignKey("dbo.CommentsOntrains", "PostID", "dbo.TrainPosts");
            DropForeignKey("dbo.TrainTrips", "TrainID", "dbo.TrainTypes");
            DropForeignKey("dbo.TrainPosts", "PostID", "dbo.TrainTrips");
            DropForeignKey("dbo.Tickets", "Userobj_ID", "dbo.Users");
            DropForeignKey("dbo.Tickets", "TrainTripObj_TrainID", "dbo.TrainTrips");
            DropForeignKey("dbo.stationTrainTrips", "TrainTrip_TrainID", "dbo.TrainTrips");
            DropForeignKey("dbo.stationTrainTrips", "station_stationID", "dbo.stations");
            DropIndex("dbo.stationTrainTrips", new[] { "TrainTrip_TrainID" });
            DropIndex("dbo.stationTrainTrips", new[] { "station_stationID" });
            DropIndex("dbo.Tickets", new[] { "Userobj_ID" });
            DropIndex("dbo.Tickets", new[] { "TrainTripObj_TrainID" });
            DropIndex("dbo.TrainTrips", new[] { "TrainID" });
            DropIndex("dbo.TrainPosts", new[] { "PostID" });
            DropIndex("dbo.CommentsOntrains", new[] { "UserID" });
            DropIndex("dbo.CommentsOntrains", new[] { "PostID" });
            DropTable("dbo.stationTrainTrips");
            DropTable("dbo.TrainTypes");
            DropTable("dbo.Users");
            DropTable("dbo.Tickets");
            DropTable("dbo.stations");
            DropTable("dbo.TrainTrips");
            DropTable("dbo.TrainPosts");
            DropTable("dbo.CommentsOntrains");
        }
    }
}
