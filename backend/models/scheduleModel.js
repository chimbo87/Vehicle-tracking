import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  vehicleBrand: { type: String, required: true },
  vehicleType: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  vehicleStatus: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(coordinates) {
          // Validate that exactly 2 coordinates are provided
          if (!Array.isArray(coordinates) || coordinates.length !== 2) {
            return false;
          }
          
          const [longitude, latitude] = coordinates;
          
          // Check if both values are numbers
          if (typeof longitude !== 'number' || typeof latitude !== 'number') {
            return false;
          }
          
          // Validate longitude (-180 to 180)
          if (longitude < -180 || longitude > 180) {
            return false;
          }
          
          // Validate latitude (-90 to 90)
          if (latitude < -90 || latitude > 90) {
            return false;
          }
          
          return true;
        },
        message: 'Invalid coordinates. Longitude must be between -180 and 180, and latitude must be between -90 and 90.'
      }
    }
  },
  town: { type: String, required: true },
  country: { type: String, required: true },
  destination: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: { type: String, required: true }
}, {
  timestamps: true
});


scheduleSchema.index({ location: '2dsphere' });

// Example of how to properly create a document
scheduleSchema.statics.createSchedule = async function(scheduleData) {
  try {
    // Ensure coordinates are numbers
    if (scheduleData.location?.coordinates) {
      scheduleData.location.coordinates = scheduleData.location.coordinates.map(coord => 
        typeof coord === 'string' ? parseFloat(coord) : coord
      );
    }
    
    const schedule = new this(scheduleData);
    await schedule.validate(); // Validate before saving
    return await schedule.save();
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Enhanced error message for location validation failures
      if (error.errors?.['location.coordinates']) {
        throw new Error('Invalid coordinates. Please ensure longitude and latitude are valid numbers.');
      }
      throw new Error(error.message);
    }
    throw error;
  }
};

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;