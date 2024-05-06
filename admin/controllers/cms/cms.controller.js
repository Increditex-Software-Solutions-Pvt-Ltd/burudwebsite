const { uploadMember } = require("../../../config/multerconfig");
const { About } = require("../../models/Aboutcms.model");
const { Advertise } = require("../../models/Advertise.model");
const { Member } = require("../../models/Membercms.model");
const { Review } = require("../../models/Review.model");
const { Successstory } = require("../../models/Successstory.model");
const { Successvideo } = require("../../models/Successvideo.model");

const addAboutpage=async(req,res)=>{
    try { 
       const formData = req.body;
      
       const aboutrecord = await About.create({
          aboutwebsite:formData.aboutwebsite,
          adhykshmanogat:formData.adhykshmanogat,
          sachivmanogat:formData.sachivmanogat       
       })
      
     
       res.redirect('/admin/cms');
    } catch (error) {
         console.error('Error adding about page:', error);
         res.status(500).send('Internal Server Error');
    }
 }

 const getAboutUpdateForm=async(req,res)=>{

    const {id} = req.params;
   try {
       const aboutcontent = await About.findByPk(id);
       
       if(aboutcontent){
         res.json({success:true,data:aboutcontent})
       }
       else{
        res.json({success:false,message:"aboutrecord not found"});
       }
   } catch (error) {
    console.error('Error updating aboutcontent', error);
    res.status(500).json({ success: false, message: 'Failed to update aboutcontent' });
   }
}
const updateAbout = async (req, res) => {
   let aboutId = req.params.id;
   try {
       const about = await About.findByPk(aboutId);
       if (about) {
           const updatedAbout = await about.update(req.body);
           updatedAbout.save();
           res.redirect('/admin/cms');
       }
       else {
           res.json({ success: false, message: 'about not found' });
       }
   } catch (error) {
       console.error('Error updating about:', error);
       res.status(500).json({ success: false, message: 'Failed to update about' });
   }
}
 const getMemberUpdateForm=async(req,res)=>{

    const {id} = req.params;
   try {
       const members = await Member.findByPk(id);
       
       if(members){
         res.json({success:true,data:members})
       }
       else{
        res.json({success:false,message:"member not found"});
       }
   } catch (error) {
    console.error('Error updating member', error);
    res.status(500).json({ success: false, message: 'Failed to update member' });
   }
}


const addMember=async(req,res)=>{
   try {
      uploadMember.single('memberpic')(req, res, async function (err) {
              if (err) {
                  return res.status(400).json({ message: 'member pic upload failed' });
              }
  
          
              const { membername,position } = req.body;
              const memberpic = req.file ? req.file.path : null;
  
              const newMember = await Member.create({
                 membername,memberpic,position
              });
  
              return res.redirect('/admin/cms'); 
          });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to add YouTube video' });
      }
}
const updateMember = async (req, res) => {
   try {
      const memberId = req.params.id;

      // Assuming you have a function like `findById` to find the YouTube video by ID
      const existingMember = await Member.findByPk(memberId);

      if (!existingMember) {
          return res.status(404).json({ message: 'member not found' });
      }

      uploadMember.single('memberpic')(req, res, async function (err) {
          if (err) {
              return res.status(400).json({ message: 'file upload failed' });
          }

          const { membername,position } = req.body;

          // Check if a new thumbnail file is uploaded
          if (req.file) {
              existingMember.memberpic = req.file.path;
          }

          existingMember.membername = membername;
          existingMember.position = position;

          await existingMember.save();

          return res.redirect('/admin/cms'); 
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update member video' });
  }
}

const deleteMember=async(req,res)=>{
   try {
       const memberId = req.params.id;
 
       const member = await Member.findByPk(memberId);
 
       if(!member){
         return res.status(404).json({ success: false, message: 'member not found'});
       }
 
       await member.destroy();
 
       return res.redirect("/admin/cms")
   } catch (error) {
     console.error('Error deleting member:', error);
     res.status(500).json({ success: false, message: 'Failed to delete member' });
   }
 }


 const addSuccessStory=async(req,res)=>{
   try {
      uploadMember.single('weddingpic')(req, res, async function (err) {
              if (err) {
                  return res.status(400).json({ message: 'wedding pic upload failed' });
              }
  
          
              const { groomname,bridename,city,description } = req.body;
              const weddingpic = req.file ? req.file.path : null;
  
              const newStory = await Successstory.create({
                 groomname,bridename,city,description,weddingpic
              });
  
              return res.redirect('/admin/cms'); 
          });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to add Success story' });
      }
 }

 const getStoryUpdateForm=async(req,res)=>{

   const {id} = req.params;
  try {
      const stories = await Successstory.findByPk(id);
      
      if(stories){
        res.json({success:true,data:stories})
      }
      else{
       res.json({success:false,message:"success story not found"});
      }
  } catch (error) {
   console.error('Error updating story', error);
   res.status(500).json({ success: false, message: 'Failed to update story' });
  }
}


const updateStory = async (req, res) => {
   try {
      const storyId = req.params.id;

      // Assuming you have a function like `findById` to find the YouTube video by ID
      const existingStory = await Successstory.findByPk(storyId);

      if (!existingStory) {
          return res.status(404).json({ message: 'story not found' });
      }

      uploadMember.single('weddingpic')(req, res, async function (err) {
          if (err) {
              return res.status(400).json({ message: 'file upload failed' });
          }

          const { bridename,groomname,city,description } = req.body;

          // Check if a new thumbnail file is uploaded
          if (req.file) {
              existingStory.weddingpic = req.file.path;
          }

          existingStory.bridename = bridename;
          existingStory.groomname = groomname;
          existingStory.city = city;
          existingStory.description = description;

          await existingStory.save();

          return res.redirect('/admin/cms'); // Redirect to appropriate page
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update member video' });
  }
}

const deleteStory=async(req,res)=>{
   try {
       const storyId = req.params.id;
 
       const story = await Successstory.findByPk(storyId);
 
       if(!story){
         return res.status(404).json({ success: false, message: 'story not found'});
       }
 
       await story.destroy();
 
       return res.redirect("/admin/cms")
   } catch (error) {
     console.error('Error deleting story:', error);
     res.status(500).json({ success: false, message: 'Failed to delete story' });
   }
 }

 const addSuccessVideo=async(req,res)=>{
    try { 
       const formData = req.body;
      
       const successvideorecord = await Successvideo.create({
          videourl:formData.videourl,
          year:formData.year,
          description:formData.description       
       })
      
     
       res.redirect('/admin/cms');
    } catch (error) {
         console.error('Error adding video page:', error);
         res.status(500).send('Internal Server Error');
    }
 }

 const getVideoUpdateForm=async(req,res)=>{

    const {id} = req.params;
   try {
       const videocontent = await Successvideo.findByPk(id);
       
       if(videocontent){
         res.json({success:true,data:videocontent})
       }
       else{
        res.json({success:false,message:"video record not found"});
       }
   } catch (error) {
    console.error('Error updating video', error);
    res.status(500).json({ success: false, message: 'Failed to update video' });
   }
}

const updateVideo = async (req, res) => {
   let videoId = req.params.id;
   try {
       const video = await Successvideo.findByPk(videoId);
       if (video) {
           const updatedVideo = await video.update(req.body);
           updatedVideo.save();
           res.redirect('/admin/cms');
       }
       else {
           res.json({ success: false, message: 'success video not found' });
       }
   } catch (error) {
       console.error('Error updating success video:', error);
       res.status(500).json({ success: false, message: 'Failed to update success video' });
   }
}

const deleteVideo=async(req,res)=>{
    try {
        const videoId = req.params.id;
  
        const video = await Successvideo.findByPk(videoId);
  
        if(!video){
          return res.status(404).json({ success: false, message: 'video not found'});
        }
  
        await video.destroy();
  
        return res.redirect("/admin/cms")
    } catch (error) {
      console.error('Error deleting story:', error);
      res.status(500).json({ success: false, message: 'Failed to delete story' });
    }
  }

  const addReview=async(req,res)=>{
    try {
       uploadMember.single('profilepic')(req, res, async function (err) {
               if (err) {
                   return res.status(400).json({ message: 'profile pic upload failed' });
               }
   
           
               const { profilename,reviewDesc } = req.body;
               const profilepic = req.file ? req.file.path : null;
   
               const newReview = await Review.create({
                  profilename,reviewDesc,profilepic
               });
   
               return res.redirect('/admin/review'); 
           });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Failed to add Success story' });
       }
  }
 
  const getReviewUpdateForm=async(req,res)=>{
 
    const {id} = req.params;
   try {
       const reviews = await Review.findByPk(id);
       
       if(reviews){
         res.json({success:true,data:reviews})
       }
       else{
        res.json({success:false,message:"review not found"});
       }
   } catch (error) {
    console.error('Error updating review', error);
    res.status(500).json({ success: false, message: 'Failed to update review' });
   }
 }
 
 
 const updateReview = async (req, res) => {
    try {
       const reviewId = req.params.id;
 
       // Assuming you have a function like `findById` to find the YouTube video by ID
       const existingReview = await Review.findByPk(reviewId);
 
       if (!existingReview) {
           return res.status(404).json({ message: 'review not found' });
       }
 
       uploadMember.single('profilepic')(req, res, async function (err) {
           if (err) {
               return res.status(400).json({ message: 'file upload failed' });
           }
 
           const { profilename,reviewDesc } = req.body;
 
           // Check if a new thumbnail file is uploaded
           if (req.file) {
               existingReview.profilepic = req.file.path;
           }
 
           existingReview.profilename = profilename;
           existingReview.reviewDesc = reviewDesc;
         
 
           await existingReview.save();
 
           return res.redirect('/admin/review'); // Redirect to appropriate page
       });
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Failed to update review ' });
   }
 }

 const deleteReview=async(req,res)=>{
    try {
        const reviewId = req.params.id;
  
        const review = await Review.findByPk(reviewId);
  
        if(!review){
          return res.status(404).json({ success: false, message: 'review not found'});
        }
  
        await review.destroy();
  
        return res.redirect("/admin/review")
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ success: false, message: 'Failed to delete review' });
    }
  }
 

  const addAdvertise=async(req,res)=>{
    try {
       uploadMember.single('advertisepic')(req, res, async function (err) {
               if (err) {
                   return res.status(400).json({ message: 'advertise pic upload failed' });
               }
   
           
               const { advertisename,advertisedesc } = req.body;
               const advertisepic = req.file ? req.file.path : null;
   
               const newMember = await Advertise.create({
                  advertisename,advertisepic,advertisedesc
               });
   
               return res.redirect('/admin/advertise'); 
           });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Failed to add YouTube video' });
       }
 }
 const updateAdvertise = async (req, res) => {
    try {
       const adId = req.params.id;
 
       // Assuming you have a function like `findById` to find the YouTube video by ID
       const existingAdd = await Advertise.findByPk(adId);
 
       if (!existingAdd) {
           return res.status(404).json({ message: 'advertise not found' });
       }
 
       uploadMember.single('advertisepic')(req, res, async function (err) {
           if (err) {
               return res.status(400).json({ message: 'file upload failed' });
           }
 
           const { advertisename,advertisedesc } = req.body;
 
           // Check if a new thumbnail file is uploaded
           if (req.file) {
               existingAdd.advertisepic = req.file.path;
           }
 
           existingAdd.advertisename = advertisename;
           existingAdd.advertisedesc = advertisedesc;
 
           await existingAdd.save();
 
           return res.redirect('/admin/advertise'); 
       });
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Failed to update Advertise' });
   }
 }
 
 const deleteAdvertise=async(req,res)=>{
    try {
        const advertiseId = req.params.id;
  
        const advertise = await Advertise.findByPk(advertiseId);
  
        if(!advertise){
          return res.status(404).json({ success: false, message: 'advertise not found'});
        }
  
        await advertise.destroy();
  
        return res.redirect("/admin/advertise")
    } catch (error) {
      console.error('Error deleting advertise:', error);
      res.status(500).json({ success: false, message: 'Failed to delete advertise' });
    }
  }

  const getAdvertiseForm=async(req,res)=>{

    const {id} = req.params;
   try {
       const advertise = await Advertise.findByPk(id);
       
       if(advertise){
         res.json({success:true,data:advertise})
       }
       else{
        res.json({success:false,message:"advertise record not found"});
       }
   } catch (error) {
    console.error('Error updating advertise', error);
    res.status(500).json({ success: false, message: 'Failed to update advertise' });
   }
}

 module.exports = {addAboutpage,getAboutUpdateForm,addMember,getMemberUpdateForm,updateMember,updateAbout,deleteMember,addSuccessStory,getStoryUpdateForm,updateStory,deleteStory,addSuccessVideo,getVideoUpdateForm,updateVideo,deleteVideo,addReview,getReviewUpdateForm,updateReview,deleteReview,addAdvertise,updateAdvertise,getAdvertiseForm,deleteAdvertise}