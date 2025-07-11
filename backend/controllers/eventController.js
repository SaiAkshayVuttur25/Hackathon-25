// const Event = require('../models/eventModel.js');
// const { Blog } = require('../models/blogModel.js');

// exports.getEvents = async (req, res) => {
//   try {
//     const events = await Blog.find(
//       { isApproved: true },
//       {
//         _id: 0,
//         title: 1,
//         eventDate: 1,
//         eventTime: 1,
//         eventEndDate: 1,
//         eventEndTime: 1,
//         // location: 1,
//         // participants: 1,
//         // nonParticipants: 1
//       }
//     );
    
//     res.status(200).json(events);
//   } catch (err) {
//     // console.error('Error fetching events:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.likeEvent = async (req, res) => {
//   const { userId, like } = req.body;
//   const { eventId } = req.params;

//   try {
//     // Validate input
//     if (!userId || !['yes', 'no', 'not_sure'].includes(like)) {
//       return res.status(400).json({ message: 'Invalid input parameters' });
//     }

//     const blog = await Blog.findById(eventId);
//     if (!blog) return res.status(404).json({ message: 'Event not found' });

//     const expireAt = new Date(`${blog.eventEndDate}T${blog.eventEndTime}:00+05:30`);

//     let interaction = await Event.findOne({ eventId, userId });

//     if (!interaction) {
//       // Create new interaction
//       interaction = new Event({
//         userId,
//         eventId,
//         liked: like,
//         reminded: false, // Default to false for new interactions
//         expireAt
//       });
//       await interaction.save();

//       // Update blog counters based on like value
//       if (like === 'yes') {
//         blog.participants = (blog.participants || 0) + 1;
//       } else if (like === 'no') {
//         blog.nonParticipants = (blog.nonParticipants || 0) + 1;
//       }
//       await blog.save();

//       return res.status(200).json({ 
//         message: 'Like status set successfully',
//         liked: like,
//         reminded: false
//       });
//     }

//     // Check if there's actually a change
//     if (interaction.liked === like) {
//       return res.status(200).json({ message: 'No change in like status' });
//     }

//     // Update counters based on previous and new like status
//     const previousLike = interaction.liked;
    
//     // Remove previous vote count
//     if (previousLike === 'yes') {
//       blog.participants = Math.max(0, (blog.participants || 0) - 1);
//     } else if (previousLike === 'no') {
//       blog.nonParticipants = Math.max(0, (blog.nonParticipants || 0) - 1);
//     }

//     // Add new vote count
//     if (like === 'yes') {
//       blog.participants = (blog.participants || 0) + 1;
//     } else if (like === 'no') {
//       blog.nonParticipants = (blog.nonParticipants || 0) + 1;
//     }

//     // Update interaction
//     interaction.liked = like;
//     await interaction.save();
//     await blog.save();

//     res.status(200).json({ 
//       message: 'Like status updated successfully',
//       liked: like,
//       reminded: interaction.reminded
//     });
//   } catch (err) {
//     // console.error('Error in likeEvent:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.remindEvent = async (req, res) => {
//   const { userId, remind } = req.body;
//   const { eventId } = req.params;

//   try {
//     // Validate input
//     if (!userId || typeof remind !== 'boolean') {
//       return res.status(400).json({ message: 'Invalid input parameters' });
//     }

//     const blog = await Blog.findById(eventId);
//     if (!blog) return res.status(404).json({ message: 'Event not found' });

//     const expireAt = new Date(`${blog.eventEndDate}T${blog.eventEndTime}:00+05:30`);

//     let interaction = await Event.findOne({ eventId, userId });

//     if (!interaction) {
//       // Create new interaction
//       interaction = new Event({
//         userId,
//         eventId,
//         liked: null, // Default to null for new interactions
//         reminded: remind,
//         expireAt
//       });
//       await interaction.save();

//       return res.status(200).json({ 
//         message: 'Reminder set successfully',
//         reminded: remind,
//         liked: null
//       });
//     }

//     // Check if there's actually a change
//     if (interaction.reminded === remind) {
//       return res.status(200).json({ message: 'No change in reminder status' });
//     }

//     // Update reminder status
//     interaction.reminded = remind;
//     await interaction.save();

//     res.status(200).json({ 
//       message: 'Reminder updated successfully',
//       reminded: remind,
//       liked: interaction.liked
//     });
//   } catch (err) {
//     // console.error('Error in remindEvent:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.getEventInteraction = async (req, res) => {
//   const { userId } = req.query;
//   const { eventId } = req.params;

//   try {
//     if (!userId) {
//       return res.status(400).json({ message: 'userId is required' });
//     }

//     const interaction = await Event.findOne({ eventId, userId });

//     if (!interaction) {
//       return res.status(200).json({
//         liked: null,
//         reminded: false,
//         hasInteraction: false
//       });
//     }

//     res.status(200).json({
//       liked: interaction.liked,
//       reminded: interaction.reminded,
//       hasInteraction: true
//     });
//   } catch (err) {
//     // console.error('Error in getEventInteraction:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.removeEventInteraction = async (req, res) => {
//   const { userId } = req.body;
//   const { eventId } = req.params;

//   try {
//     if (!userId) {
//       return res.status(400).json({ message: 'userId is required' });
//     }

//     const interaction = await Event.findOne({ eventId, userId });

//     if (!interaction) {
//       return res.status(404).json({ message: 'No interaction found' });
//     }

//     const blog = await Blog.findById(eventId);
//     if (blog && interaction.liked) {
//       // Remove the vote count from blog
//       if (interaction.liked === 'yes') {
//         blog.participants = Math.max(0, (blog.participants || 0) - 1);
//       } else if (interaction.liked === 'no') {
//         blog.nonParticipants = Math.max(0, (blog.nonParticipants || 0) - 1);
//       }
//       await blog.save();
//     }

//     await Event.deleteOne({ eventId, userId });

//     res.status(200).json({ message: 'Event interaction removed successfully' });
//   } catch (err) {
//     // console.error('Error in removeEventInteraction:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.getEventStats = async (req, res) => {
//   const { eventId } = req.params;

//   try {
//     const blog = await Blog.findById(eventId);
//     if (!blog) return res.status(404).json({ message: 'Event not found' });

//     // Get interaction counts from the interaction collection
//     const interactions = await Event.find({ eventId });
    
//     const stats = {
//       totalInteractions: interactions.length,
//       participants: blog.participants || 0,
//       nonParticipants: blog.nonParticipants || 0,
//       reminders: interactions.filter(i => i.reminded).length,
//       notSureCount: interactions.filter(i => i.liked === 'not_sure').length
//     };

//     res.status(200).json(stats);
//   } catch (err) {
//     // console.error('Error in getEventStats:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const Event = require('../models/eventModel.js');
const { Blog } = require('../models/blogModel.js');

async function fixMissingEventDates() {
  try {
    
    const blogs = await Blog.find({
      $or: [{ eventEndDate: { $exists: false } }, { eventEndTime: { $exists: false } }]
    });

    const now = new Date();
    const today = now.toISOString().split("T")[0]; // format: YYYY-MM-DD
    const defaultTime = "23:59";

    for (let blog of blogs) {
      const updatedEndDate = blog.eventEndDate || today;
      const updatedEndTime = blog.eventEndTime || defaultTime;
      const newExpireAt = new Date(`${updatedEndDate}T${updatedEndTime}:00+05:30`);

      blog.eventEndDate = updatedEndDate;
      blog.eventEndTime = updatedEndTime;
      blog.expireAt = newExpireAt;

      await blog.save();
      // console.log(`Updated blog: ${blog._id}`);
    }

    // console.log("All missing fields updated.");
    process.exit(0);
  } catch (error) {
    // console.error("Error updating blogs:", error);
    process.exit(1);
  }
}

exports.getEvents = async (req, res) => {
  try {
    const events = await Blog.find(
      { isApproved: true },
      {
        _id: 1, // Include _id for eventId
        title: 1,
        eventDate: 1,
        eventTime: 1,
        eventEndDate: 1,
        eventEndTime: 1,
        location: 1,
        participants: 1,
        nonParticipants: 1
      }
    );
    
    res.status(200).json(events);
  } catch (err) {
    // console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.likeEvent = async (req, res) => {
  const { like } = req.body;
  const userId = res.locals.user._id;
  const { id: eventId } = req.params; // Changed from eventId to id to match route

  try {
    // Validate input
    if (!userId || !['yes', 'no', 'not_sure'].includes(like)) {
      return res.status(400).json({ message: 'Invalid input parameters' });
    }

    const blog = await Blog.findById(eventId);
    if (!blog) return res.status(404).json({ message: 'Event not found' });

    const expireAt = new Date(`${blog.eventEndDate}T${blog.eventEndTime}:00+05:30`);

    let interaction = await Event.findOne({ eventId, userId });

    if (!interaction) {
      // Create new interaction
      interaction = new Event({
        userId,
        eventId,
        liked: like,
        reminded: false, // Default to false for new interactions
        expireAt
      });
      await interaction.save();

      // Update blog counters based on like value
      if (like === 'yes') {
        blog.participants = (blog.participants || 0) + 1;
      } else if (like === 'no') {
        blog.nonParticipants = (blog.nonParticipants || 0) + 1;
      }
      await blog.save();

      return res.status(200).json({ 
        message: 'Like status set successfully',
        liked: like,
        reminded: false,
        participants: blog.participants,
        nonParticipants: blog.nonParticipants
      });
    }

    // Check if there's actually a change
    if (interaction.liked === like) {
      return res.status(200).json({ message: 'No change in like status' });
    }

    // Update counters based on previous and new like status
    const previousLike = interaction.liked;
    
    // Remove previous vote count
    if (previousLike === 'yes') {
      blog.participants = Math.max(0, (blog.participants || 0) - 1);
    } else if (previousLike === 'no') {
      blog.nonParticipants = Math.max(0, (blog.nonParticipants || 0) - 1);
    }

    // Add new vote count
    if (like === 'yes') {
      blog.participants = (blog.participants || 0) + 1;
    } else if (like === 'no') {
      blog.nonParticipants = (blog.nonParticipants || 0) + 1;
    }

    // Update interaction
    interaction.liked = like;
    await interaction.save();
    await blog.save();

    res.status(200).json({ 
      message: 'Like status updated successfully',
      liked: like,
      reminded: interaction.reminded,
      participants: blog.participants,
      nonParticipants: blog.nonParticipants
    });
  } catch (err) {
    // console.error('Error in likeEvent:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.remindEvent = async (req, res, next) => {
//   const { remind } = req.body;
//   const userId = res.locals.user._id;
//   const { id: eventId } = req.params; // Changed from eventId to id to match route

//   try {
//     // Validate input
//     if (!userId || typeof remind !== 'boolean') {
//       return res.status(400).json({ message: 'Invalid input parameters' });
//     }

//     const blog = await Blog.findById(eventId);
//     if (!blog) return res.status(404).json({ message: 'Event not found' });

//     const expireAt = new Date(`${blog.eventEndDate}T${blog.eventEndTime}:00+05:30`);

//     let interaction = await Event.findOne({ eventId, userId });

//     if (!interaction) {
//       // Create new interaction
//       interaction = new Event({
//         userId,
//         eventId,
//         liked: null, // Default to null for new interactions
//         reminded: remind,
//         expireAt
//       });
//       await interaction.save();
      
//       // return res.status(200).json({ 
//       //   message: 'Reminder set successfully',
//       //   reminded: remind,
//       //   liked: null
//       // });
//       // console.log("going to next");
//       next(); 
//     }

//     // Check if there's actually a change
//     if (interaction.reminded === remind) {
//       return res.status(200).json({ message: 'No change in reminder status' });
//     }

//     // Update reminder status
//     interaction.reminded = remind;
//     await interaction.save();

//     // res.status(200).json({ 
//     //   message: 'Reminder updated successfully',
//     //   reminded: remind,
//     //   liked: interaction.liked
//     // });
//       // console.log("going to next");
//     next(); 
//   } catch (err) {
//     // console.error('Error in remindEvent:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
exports.remindEvent = async (req, res, next) => {
  const { remind } = req.body;
  const userId = res.locals.user._id;
  const { id: eventId } = req.params;

  try {
    if (!userId || typeof remind !== 'boolean') {
      // console.error('Invalid input parameters:', { userId, remind });
      return res.status(400).json({ message: 'Invalid input parameters' });
    }

    const blog = await Blog.findById(eventId);
    if (!blog) {
      // console.error('Event not found for eventId:', eventId);
      return res.status(404).json({ message: 'Event not found' });
    }

    const expireAt = new Date(`${blog.eventEndDate}T${blog.eventEndTime}:00+05:30`);

    let interaction = await Event.findOne({ eventId, userId });

    if (!interaction) {
      interaction = new Event({
        userId,
        eventId,
        liked: null,
        reminded: remind,
        expireAt
      });
      await interaction.save();
      // console.log("Created interaction, going to next()");
      return next(); // ✅ Early return here
    }

    if (interaction.reminded === remind) {
      // console.log("No change in reminder, skipping next()");
      return res.status(200).json({ message: 'No change in reminder status' });
    }

    interaction.reminded = remind;
    await interaction.save();
    // console.log("Updated interaction, going to next()");
    return next(); // ✅ Early return again
  } catch (err) {
    // console.error('Error in remindEvent:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getEventInteraction = async (req, res) => {
  const userId = res.locals.user._id;
  const { id: eventId } = req.params; // Changed from eventId to id to match route

  
// fixMissingEventDates();
// // console.log("Done");

  // console.log("eventId:", eventId);
  // console.log("userId:", res.locals.user._id);


  try {
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const interaction = await Event.findOne({ eventId, userId });

    if (!interaction) {
      return res.status(200).json({
        liked: null,
        reminded: false,
        hasInteraction: false
      });
    }

    res.status(200).json({
      liked: interaction.liked,
      reminded: interaction.reminded,
      hasInteraction: true
    });
  } catch (err) {
    // console.error('Error in getEventInteraction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeEventInteraction = async (req, res) => {
  const userId = res.locals.user._id;
  const { id: eventId } = req.params; // Changed from eventId to id to match route

  try {
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const interaction = await Event.findOne({ eventId, userId });

    if (!interaction) {
      return res.status(404).json({ message: 'No interaction found' });
    }

    const blog = await Blog.findById(eventId);
    if (blog && interaction.liked) {
      // Remove the vote count from blog
      if (interaction.liked === 'yes') {
        blog.participants = Math.max(0, (blog.participants || 0) - 1);
      } else if (interaction.liked === 'no') {
        blog.nonParticipants = Math.max(0, (blog.nonParticipants || 0) - 1);
      }
      await blog.save();
    }

    await Event.deleteOne({ eventId, userId });

    res.status(200).json({ message: 'Event interaction removed successfully' });
  } catch (err) {
    // console.error('Error in removeEventInteraction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEventStats = async (req, res) => {
  const { id: eventId } = req.params; // Changed from eventId to id to match route

  try {
    const blog = await Blog.findById(eventId);
    if (!blog) return res.status(404).json({ message: 'Event not found' });

    // Get interaction counts from the interaction collection
    const interactions = await Event.find({ eventId });
    
    const stats = {
      totalInteractions: interactions.length,
      participants: blog.participants || 0,
      nonParticipants: blog.nonParticipants || 0,
      reminders: interactions.filter(i => i.reminded).length,
      notSureCount: interactions.filter(i => i.liked === 'not_sure').length
    };

    res.status(200).json(stats);
  } catch (err) {
    // console.error('Error in getEventStats:', err);
    res.status(500).json({ message: 'Server error' });
  }
};