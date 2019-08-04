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
    public class CommentsOntrainsController : ApiController
    {
        private TrainAppEntities db = new TrainAppEntities();



        [Route("getPostComments/{postID}")]
        public async Task<IHttpActionResult> getCommentsOfPost(int postID)
{
            List<CommentsOntrain> comments = await db.CommentsOntrain.Where(c => c.TrainPostObj.PostID.Equals(postID)).ToListAsync();

            if (comments.Count() == 0)
            {
                return NotFound();
            }

            return Ok(comments);
        }


        // POST: api/CommentsOntrains1
        [ResponseType(typeof(CommentsOntrain))]
      
        public async Task<IHttpActionResult> PostCommentsOntrain
        ([FromBody]CommentsOntrain commentsOntrain)

        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            db.CommentsOntrain.Add(commentsOntrain);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CommentsOntrainExists(commentsOntrain.CommentID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            //return CreatedAtRoute("DefaultApi", new { id = commentsOntrain.CommentID }, commentsOntrain);
            return Ok(db.CommentsOntrain.ToListAsync());
        }


       [Route("getComment")]
        public async Task<IHttpActionResult> getComment([FromUri] int commentID)
        {
            CommentsOntrain comment = await db.CommentsOntrain.FirstOrDefaultAsync(c => c.CommentID == commentID);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }












        // GET: api/CommentsOntrains1
        public IQueryable<CommentsOntrain> GetCommentsOntrain()
        {
            return db.CommentsOntrain;
        }

        // GET: api/CommentsOntrains1/5
        [ResponseType(typeof(CommentsOntrain))]
        public async Task<IHttpActionResult> GetCommentsOntrain(int id)
        {
            CommentsOntrain commentsOntrain = await db.CommentsOntrain.FindAsync(id);
            if (commentsOntrain == null)
            {
                return NotFound();
            }

            return Ok(commentsOntrain);
        }

        // PUT: api/CommentsOntrains1/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCommentsOntrain(int id, CommentsOntrain commentsOntrain)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != commentsOntrain.CommentID)
            {
                return BadRequest();
            }

            db.Entry(commentsOntrain).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentsOntrainExists(id))
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

       

        // DELETE: api/CommentsOntrains1/5
        [ResponseType(typeof(CommentsOntrain))]
        public async Task<IHttpActionResult> DeleteCommentsOntrain(int id)
        {
            CommentsOntrain commentsOntrain = await db.CommentsOntrain.FindAsync(id);
            if (commentsOntrain == null)
            {
                return NotFound();
            }

            db.CommentsOntrain.Remove(commentsOntrain);
            await db.SaveChangesAsync();

            return Ok(commentsOntrain);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CommentsOntrainExists(int id)
        {
            return db.CommentsOntrain.Count(e => e.CommentID == id) > 0;
        }
    }
}