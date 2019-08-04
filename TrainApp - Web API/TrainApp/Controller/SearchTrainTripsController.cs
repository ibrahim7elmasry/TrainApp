using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TrainApp;
using TrainApp.Models;

namespace TrainApp.Controller
{
    public class SearchTrainTripsController : ApiController
    {
        private TrainAppEntities db = new TrainAppEntities();

        // GET: api/SearchTrainTrips
        public IQueryable<TrainTrip> GetTrainTrip()
        {
            return db.TrainTrip;
        }

        // GET: api/SearchTrainTrips/5
        [ResponseType(typeof(TrainTrip))]
        public IHttpActionResult GetTrainTrip(int id)
        {
            TrainTrip trainTrip = db.TrainTrip.Find(id);
            if (trainTrip == null)
            {
                return NotFound();
            }

            return Ok(trainTrip);
        }

        // PUT: api/SearchTrainTrips/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTrainTrip(int id, TrainTrip trainTrip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trainTrip.TrainID)
            {
                return BadRequest();
            }

            db.Entry(trainTrip).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainTripExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/SearchTrainTrips
        [ResponseType(typeof(TrainTrip))]
        public IHttpActionResult PostTrainTrip(TrainTrip trainTrip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TrainTrip.Add(trainTrip);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TrainTripExists(trainTrip.TrainID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = trainTrip.TrainID }, trainTrip);
        }

        // DELETE: api/SearchTrainTrips/5
        [ResponseType(typeof(TrainTrip))]
        public IHttpActionResult DeleteTrainTrip(int id)
        {
            TrainTrip trainTrip = db.TrainTrip.Find(id);
            if (trainTrip == null)
            {
                return NotFound();
            }

            db.TrainTrip.Remove(trainTrip);
            db.SaveChanges();

            return Ok(trainTrip);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrainTripExists(int id)
        {
            return db.TrainTrip.Count(e => e.TrainID == id) > 0;
        }
    }
}