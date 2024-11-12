import Schedule from '../models/scheduleModel.js';

export async function createSchedule(req, res) {
  try {
    const {
      vehicleBrand,
      vehicleType,
      registrationNumber,
      vehicleStatus,
      position,  // address
      town,
      country,
      destination,
      name,
      surname,
      email,
      phoneNumber,
      longitude,
      latitude
    } = req.body;

    // Required fields validation
    const requiredFields = [
      'vehicleBrand', 'vehicleType', 'registrationNumber', 
      'vehicleStatus', 'position', 'town', 'country', 
      'destination', 'name', 'surname', 'email', 'phoneNumber',
      'longitude', 'latitude'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Coordinate validation
    const parsedLongitude = parseFloat(longitude);
    const parsedLatitude = parseFloat(latitude);

    if (isNaN(parsedLongitude) || isNaN(parsedLatitude)) {
      return res.status(400).json({
        message: 'Longitude and Latitude must be valid numbers',
        details: {
          longitude: isNaN(parsedLongitude) ? 'Invalid longitude' : undefined,
          latitude: isNaN(parsedLatitude) ? 'Invalid latitude' : undefined
        }
      });
    }

    // Validate coordinate ranges
    if (parsedLongitude < -180 || parsedLongitude > 180) {
      return res.status(400).json({
        message: 'Invalid longitude value',
        details: 'Longitude must be between -180 and 180 degrees'
      });
    }

    if (parsedLatitude < -90 || parsedLatitude > 90) {
      return res.status(400).json({
        message: 'Invalid latitude value',
        details: 'Latitude must be between -90 and 90 degrees'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format'
      });
    }

    // Phone number basic validation (can be adjusted based on your requirements)
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        message: 'Invalid phone number format'
      });
    }

    // Create schedule instance
    const schedule = new Schedule({
      vehicleBrand,
      vehicleType,
      registrationNumber,
      vehicleStatus,
      address: position,  // map position to address field
      location: {
        type: 'Point',
        coordinates: [parsedLongitude, parsedLatitude]
      },
      town,
      country,
      destination,
      name,
      surname,
      email: email.toLowerCase().trim(),  // normalize email
      phoneNumber: phoneNumber.trim()
    });

    // Save with enhanced error handling
    const savedSchedule = await schedule.save();
    
    return res.status(201).json({
      message: 'Schedule created successfully',
      data: savedSchedule
    });

  } catch (error) {
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'A schedule with this email already exists',
        field: 'email'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }

    // Generic error handler
    console.error('Schedule creation error:', error);
    return res.status(500).json({
      message: 'An error occurred while creating the schedule',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Optional: Add a validation middleware
export const validateScheduleInput = (req, res, next) => {
  const {
    longitude,
    latitude,
    email,
    phoneNumber
  } = req.body;

  const errors = {};

  // Basic validation checks
  if (!longitude || !latitude) {
    errors.coordinates = 'Longitude and latitude are required';
  }

  if (!email) {
    errors.email = 'Email is required';
  }

  if (!phoneNumber) {
    errors.phoneNumber = 'Phone number is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};


export async function getSchedules(req, res) {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getScheduleById(req, res) {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateSchedule(req, res) {
  try {
    const { longitude, latitude } = req.body;

    // Ensure valid coordinates are provided
    if (longitude && latitude) {
      if (typeof longitude !== 'number' || typeof latitude !== 'number') {
        return res.status(400).json({ message: 'Longitude and Latitude must be numbers' });
      }
      req.body.location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };
    }

    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteSchedule(req, res) {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json({ message: 'Schedule deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
