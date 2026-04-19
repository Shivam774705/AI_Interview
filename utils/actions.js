"use server"
import { db } from "./db";
import { MockInterview, UserAnswer } from "./schema";
import { eq, desc, sql } from "drizzle-orm";

/**
 * Saves a new mock interview configuration.
 */
export async function saveMockInterview(data) {
    try {
        const resp = await db.insert(MockInterview)
            .values(data)
            .returning({ mockId: MockInterview.mockId });
        return resp;
    } catch (error) {
        console.error("Error saving mock interview:", error);
        return null;
    }
}

/**
 * Saves a user's answer and AI feedback.
 */
export async function saveUserAnswer(data) {
    try {
        await db.insert(UserAnswer)
            .values(data);
        return true; // Return plain serializable value, not the raw DB result object
    } catch (error) {
        console.error("Error saving user answer:", error);
        return null;
    }
}

/**
 * Fetches feedback for a specific interview.
 */
export async function getInterviewFeedback(interviewId) {
    try {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, interviewId))
            .orderBy(UserAnswer.id);
        return result;
    } catch (error) {
        console.error("Error fetching interview feedback:", error);
        return [];
    }
}

/**
 * Fetches all interviews created by a specific user.
 */
export async function getUserInterviews(email) {
    try {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, email))
            .orderBy(desc(MockInterview.id));
        return result;
    } catch (error) {
        console.error("Error fetching user interviews:", error);
        return [];
    }
}

/**
 * Fetches details for a single mock interview.
 */
export async function getInterviewDetails(interviewId) {
    try {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId));
        return result[0] || null;
    } catch (error) {
        console.error("Error fetching interview details:", error);
        return null;
    }
}

/**
 * Fetches user analytics required for the gamification progress dashboard.
 */
export async function getUserProgress(email) {
    if (!email) return null;
    try {
        // Find total distinct interviews and average score
        const stats = await db.select({
            totalInterviews: sql`COUNT(DISTINCT ${UserAnswer.mockIdRef})`,
            avgScore: sql`AVG(CAST(NULLIF(${UserAnswer.rating}, '') AS FLOAT))`
        })
        .from(UserAnswer)
        .where(eq(UserAnswer.userEmail, email));

        // Fetch all distinct dates for streak calculation
        const datesResult = await db.select({ date: UserAnswer.createdAt })
            .from(UserAnswer)
            .where(eq(UserAnswer.userEmail, email))
            .groupBy(UserAnswer.createdAt);
            
        // Calculate Streak locally
        let streak = 0;
        if (datesResult.length > 0) {
            const sortedDates = datesResult
                .map(r => r.date)
                .filter(Boolean)
                .sort((a, b) => {
                    const [d1, m1, y1] = a.split('-');
                    const [d2, m2, y2] = b.split('-');
                    return new Date(`${y2}-${m2}-${d2}`) - new Date(`${y1}-${m1}-${d1}`);
                });
            
            if (sortedDates.length > 0) {
                let currentDate = new Date();
                currentDate.setHours(0,0,0,0);
                
                let checkDateStr = sortedDates[0];
                const [cd, cm, cy] = checkDateStr.split('-');
                let lastDate = new Date(`${cy}-${cm}-${cd}`);
                lastDate.setHours(0,0,0,0);
                
                const timeDiff = currentDate.getTime() - lastDate.getTime();
                const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
                
                if (dayDiff > 1) {
                    streak = 0; // Lost streak
                } else {
                    streak = 1;
                    for (let i = 1; i < sortedDates.length; i++) {
                        const [d, m, y] = sortedDates[i].split('-');
                        const prevDate = new Date(`${y}-${m}-${d}`);
                        prevDate.setHours(0,0,0,0);
                        
                        const expected = new Date(lastDate);
                        expected.setDate(expected.getDate() - 1);
                        
                        // Compare ignoring timezone
                        if (prevDate.getTime() === expected.getTime()) {
                            streak++;
                            lastDate = prevDate;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
        
        // Fetch rating history for the chart
        const history = await db.select({
            mockId: UserAnswer.mockIdRef,
            date: UserAnswer.createdAt,
            avgRating: sql`AVG(CAST(NULLIF(${UserAnswer.rating}, '') AS FLOAT))`
        })
        .from(UserAnswer)
        .where(eq(UserAnswer.userEmail, email))
        .groupBy(UserAnswer.mockIdRef, UserAnswer.createdAt);
        
        return {
            totalInterviews: Number(stats[0]?.totalInterviews || 0),
            avgScore: Number(stats[0]?.avgScore || 0).toFixed(1),
            streak,
            history: history.map(h => ({
                name: "Int " + h.mockId.substring(0, 4),
                score: Number(h.avgRating || 0).toFixed(1),
                date: h.date
            }))
        };
    } catch (error) {
        console.error("Error fetching user progress:", error);
        return null;
    }
}

/**
 * Fetches the global leaderboard.
 */
export async function getLeaderboard() {
    try {
        const result = await db.select({
            email: UserAnswer.userEmail,
            totalInterviews: sql`COUNT(DISTINCT ${UserAnswer.mockIdRef})`,
            avgScore: sql`AVG(CAST(NULLIF(${UserAnswer.rating}, '') AS FLOAT))`
        })
        .from(UserAnswer)
        .where(sql`${UserAnswer.rating} != '' AND ${UserAnswer.userEmail} IS NOT NULL`)
        .groupBy(UserAnswer.userEmail)
        .orderBy(desc(sql`AVG(CAST(NULLIF(${UserAnswer.rating}, '') AS FLOAT))`))
        .limit(20);
        
        return result.map((r, i) => ({
            rank: i + 1,
            username: "@" + r.email.split('@')[0], 
            totalInterviews: Number(r.totalInterviews || 0),
            avgScore: Number(r.avgScore || 0).toFixed(1)
        }));
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return [];
    }
}
