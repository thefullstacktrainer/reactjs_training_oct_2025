-- db/schema.sql
-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop tables if they already exist
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS users;

-- Create employees table
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL
);

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'user'
);

-- Seed admin user
INSERT INTO users (username, password, role)
VALUES ('admin', 'admin', 'admin')
ON CONFLICT (username) DO NOTHING;
