import session from 'express-session';

export type SessionConfig = session.SessionOptions;

export const config: SessionConfig = {
  secret: process.env.SESSION_SECRET || 'asd',
  saveUninitialized: false,
  resave: true,
};
