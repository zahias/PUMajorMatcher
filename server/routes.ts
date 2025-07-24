import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizResultSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all majors
  app.get("/api/majors", async (req, res) => {
    try {
      const majors = await storage.getMajors();
      res.json(majors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch majors" });
    }
  });

  // Get specific major by key
  app.get("/api/majors/:key", async (req, res) => {
    try {
      const major = await storage.getMajorByKey(req.params.key);
      if (!major) {
        return res.status(404).json({ message: "Major not found" });
      }
      res.json(major);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch major" });
    }
  });

  // Submit quiz results
  app.post("/api/quiz-results", async (req, res) => {
    try {
      const validatedData = insertQuizResultSchema.parse(req.body);
      const result = await storage.createQuizResult(validatedData);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quiz result data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save quiz results" });
    }
  });

  // Get quiz results by session
  app.get("/api/quiz-results/:sessionId", async (req, res) => {
    try {
      const result = await storage.getQuizResult(req.params.sessionId);
      if (!result) {
        return res.status(404).json({ message: "Quiz results not found" });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz results" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
