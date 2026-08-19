import mongoose, { type Model } from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
}, { timestamps: true });

const teamSchema = new Schema({
  name: { type: String, required: true, trim: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 0 },
  points: { type: Number, required: true, min: 0 },
  recordedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true, min: 0, default: 0 },
}, { timestamps: true });

const workoutSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  durationMinutes: { type: Number, min: 0 },
}, { timestamps: true });

export const User = mongoose.models.User as Model<any> || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team as Model<any> || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity as Model<any> || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard as Model<any> || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout as Model<any> || mongoose.model('Workout', workoutSchema);