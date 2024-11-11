import Schedule from '../models/scheduleModel.js';

export async function createSchedule(req, res) {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

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