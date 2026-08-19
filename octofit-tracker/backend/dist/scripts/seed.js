import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Team.deleteMany({}),
            User.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.create([
            { username: 'alex.morgan', email: 'alex.morgan@example.com', name: 'Alex Morgan' },
            { username: 'jamie.lee', email: 'jamie.lee@example.com', name: 'Jamie Lee' },
            { username: 'taylor.reed', email: 'taylor.reed@example.com', name: 'Taylor Reed' },
            { username: 'riley.patel', email: 'riley.patel@example.com', name: 'Riley Patel' },
        ]);
        const teams = await Team.create([
            { name: 'Summit Striders', members: [users[0]._id, users[1]._id] },
            { name: 'Pulse Collective', members: [users[2]._id, users[3]._id] },
        ]);
        await Activity.create([
            { userId: users[0]._id, type: 'Running', durationMinutes: 42, points: 84, recordedAt: new Date('2026-08-15') },
            { userId: users[1]._id, type: 'Cycling', durationMinutes: 55, points: 110, recordedAt: new Date('2026-08-16') },
            { userId: users[2]._id, type: 'Strength training', durationMinutes: 35, points: 70, recordedAt: new Date('2026-08-17') },
            { userId: users[3]._id, type: 'Yoga', durationMinutes: 30, points: 45, recordedAt: new Date('2026-08-18') },
        ]);
        await Leaderboard.create([
            { userId: users[0]._id, teamId: teams[0]._id, points: 420 },
            { userId: users[1]._id, teamId: teams[0]._id, points: 375 },
            { userId: users[2]._id, teamId: teams[1]._id, points: 340 },
            { userId: users[3]._id, teamId: teams[1]._id, points: 295 },
        ]);
        await Workout.create([
            { name: 'Morning Momentum', description: 'A brisk full-body routine to start the day.', difficulty: 'beginner', durationMinutes: 20 },
            { name: 'Trail Builder', description: 'Intervals and lower-body strength for outdoor runners.', difficulty: 'intermediate', durationMinutes: 35 },
            { name: 'Power Circuit', description: 'A demanding circuit focused on strength and conditioning.', difficulty: 'advanced', durationMinutes: 45 },
        ]);
        console.log('Database seeding complete: 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
