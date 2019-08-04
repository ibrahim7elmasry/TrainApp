using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using TrainApp;
using TrainApp.Models;

namespace TrainApp.Controller
{
    public class TrainPostsController : ApiController
    {
        private TrainAppEntities db = new TrainAppEntities();

        // GET: api/TrainPosts
        public IQueryable<TrainPost> GetTrainPost()
        {
            return db.TrainPost;
        }

        // GET: api/TrainPosts/5
        [Route("Post/{postID}")]
        [ResponseType(typeof(TrainPost))]
        public async Task<IHttpActionResult> GetTrainPost(int id)
        {
            TrainPost trainPost = await db.TrainPost.FindAsync(id);
            if (trainPost == null)
            {
                return NotFound();
            }

            return Ok(trainPost);
        }

        // PUT: api/TrainPosts/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTrainPost(int id, TrainPost trainPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trainPost.PostID)
            {
                return BadRequest();
            }

            db.Entry(trainPost).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainPostExists(id))
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

        // POST: api/TrainPosts
        [ResponseType(typeof(TrainPost))]
        public async Task<IHttpActionResult> PostTrainPost(TrainPost trainPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TrainPost.Add(trainPost);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TrainPostExists(trainPost.PostID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = trainPost.PostID }, trainPost);
        }

        // DELETE: api/TrainPosts/5
        [ResponseType(typeof(TrainPost))]
        public async Task<IHttpActionResult> DeleteTrainPost(int id)
        {
            TrainPost trainPost = await db.TrainPost.FindAsync(id);
            if (trainPost == null)
            {
                return NotFound();
            }

            db.TrainPost.Remove(trainPost);
            await db.SaveChangesAsync();

            return Ok(trainPost);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrainPostExists(int id)
        {
            return db.TrainPost.Count(e => e.PostID == id) > 0;
        }


        //[HttpGet]
        ////[Route("Comments")]
        //public async Task<IHttpActionResult> getComments(string postID)
        //{
        //    List<CommentsOntrain> comments = await db.CommentsOntrain.Where(a=>a.TrainPostObj.PostID == postID).ToListAsync();
        //    if (comments.FirstOrDefault() == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(comments);
        //}

        }
    }