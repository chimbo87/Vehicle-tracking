import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  vehicleBrand: { type: String, required: true },
  vehicleType: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  vehicleStatus: { type: String, required: true },
  position: { type: String, required: true },
  town: { type: String, required: true },
  country: { type: String, required: true },
  destination: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true }
}, {
  timestamps: true
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;