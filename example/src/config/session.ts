import session from 'express-session';

export type SessionConfig = session.SessionOptions;

const config: SessionConfig = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: true,
};

export default config;
