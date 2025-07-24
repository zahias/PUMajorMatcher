import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const majors = pgTable("majors", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  name: text("name").notNull(),
  college: text("college").notNull(),
  description: text("description").notNull(),
  careers: json("careers").$type<string[]>().notNull(),
  icon: text("icon").notNull(),
  url: text("url").notNull(),
  keywords: json("keywords").$type<string[]>().notNull(),
  degree_type: text("degree_type").notNull(),
});

export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  session_id: text("session_id").notNull(),
  answers: json("answers").$type<any[]>().notNull(),
  top_matches: json("top_matches").$type<string[]>().notNull(),
  scores: json("scores").$type<Record<string, number>>().notNull(),
  created_at: text("created_at").notNull(),
});

export const insertMajorSchema = createInsertSchema(majors).omit({
  id: true,
});

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({
  id: true,
});

export type Major = typeof majors.$inferSelect;
export type InsertMajor = z.infer<typeof insertMajorSchema>;
export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
