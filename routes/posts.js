const express = require("express");
const router = express.Router();
const Posts = require("../model/Posts");

router.get("/getAll", async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.send(posts);
  } catch (e) {
    res.send(500, { message: e.message });
  }
});

router.get("/getMyPost/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  Posts.find({ user_id: user_id })
    .exec()
    .then(data => {
      console.log("data ======> ", data);
      res.status(200).json({
        success: true,
        message: "Post get success",
        data: data
      });
    })
    .catch(err => {
      console.log("err ======> ", err);

      res.status(500).json({
        success: false,
        message: "Server error. Please try again."
      });
    });
});

router.put("/updatePost/:id", async (req, res) => {
  const id = req.params.id;
  const updateObject = req.body;
  console.log("update Object ", updateObject)
  Posts.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Post is updated",
        post: updateObject
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again."
      });
    });
});

// router.get('/deletePost', (req, res) => {

//     const post = await Posts.deleteOne();

//     if(!post.length) {
//         res.send(500, { message: "Post was not found!" });
//         return;
//     }

//     res.send(post);
// })

router.post("/addPost", (req, res) => {
  const post = req.body;

  const newPost = new Posts({
    user_id: post.user_id,
    user_name: post.user_name,
    blood_group: post.blood_group,
    no_of_blood_required: post.no_of_blood_required,
    urgency: post.urgency,
    country: post.country,
    state: post.state,
    city: post.city,
    hospital: post.hospital,
    relationship_with_patient: post.relationship_with_patient,
    contact_no: post.contact_no,
    additional_instruction: post.additional_instruction,
    voluntreers_uptill_now: 0,
    current_requirement: post.no_of_blood_required,
    voluntreers: [],
    comments: [],
  });

  newPost
    .save()
    .then(() => res.send({ message: "Post successfully submitted!" }))
    .catch(e => res.send(500, { message: e.message }));

  // });
});

module.exports = router;
