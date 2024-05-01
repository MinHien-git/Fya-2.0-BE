import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      file?: any;
      files?: any;
    }
  }
}
