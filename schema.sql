-- =========================================================
-- NET QUANTA SECURE VOTING SYSTEM
-- COMPLETE DATABASE SCHEMA
-- PostgreSQL / Neon
-- =========================================================


-- =========================================================
-- DROP EXISTING TABLES
-- =========================================================

DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
DROP TABLE IF EXISTS nominee_applications CASCADE;
DROP TABLE IF EXISTS election_settings CASCADE;
DROP TABLE IF EXISTS elections CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- =========================================================
-- USERS TABLE
-- =========================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    full_name VARCHAR(255) NOT NULL,
    voter_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,

    password_hash VARCHAR(255) NOT NULL,

    is_admin BOOLEAN DEFAULT FALSE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,

    rejection_reason TEXT,

    otp_code VARCHAR(6),
    otp_expiry TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- ELECTIONS TABLE
-- =========================================================

CREATE TABLE elections (
    id SERIAL PRIMARY KEY,

    title VARCHAR(200) NOT NULL,
    description TEXT,

    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,

    status VARCHAR(20) DEFAULT 'upcoming',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- ELECTION SETTINGS
-- =========================================================

CREATE TABLE election_settings (
    id SERIAL PRIMARY KEY,

    nominee_start_date TIMESTAMP NOT NULL,
    nominee_end_date TIMESTAMP NOT NULL,

    election_start_date TIMESTAMP NOT NULL,
    election_end_date TIMESTAMP NOT NULL,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- NOMINEE APPLICATIONS
-- =========================================================

CREATE TABLE nominee_applications (
    id SERIAL PRIMARY KEY,

    user_id INTEGER
        REFERENCES users(id)
        ON DELETE CASCADE,

    name VARCHAR(150) NOT NULL,
    voter_id VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,

    department VARCHAR(100) NOT NULL,
    year VARCHAR(50) NOT NULL,

    position VARCHAR(100) NOT NULL,

    manifesto TEXT,

    -- Candidate profile image
    image_url VARCHAR(500),

    -- Candidate uploaded document
    candidate_document_url VARCHAR(500),

    -- Affidavit PDF
    affidavit_url VARCHAR(500),

    status VARCHAR(20) DEFAULT 'pending',

    rejection_reason TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- CANDIDATES TABLE
-- =========================================================

CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,

    election_id INTEGER
        REFERENCES elections(id)
        ON DELETE CASCADE,

    name VARCHAR(100) NOT NULL,

    party VARCHAR(100),

    manifesto TEXT,

    -- Candidate profile image
    image_url VARCHAR(500),

    -- Candidate uploaded document
    candidate_document_url VARCHAR(500),

    -- Affidavit PDF
    affidavit_url VARCHAR(500),

    vote_count INTEGER DEFAULT 0
);


-- =========================================================
-- VOTES TABLE
-- =========================================================

CREATE TABLE votes (
    id SERIAL PRIMARY KEY,

    election_id INTEGER
        REFERENCES elections(id)
        ON DELETE CASCADE,

    voter_id INTEGER
        REFERENCES users(id)
        ON DELETE CASCADE,

    candidate_id INTEGER
        REFERENCES candidates(id)
        ON DELETE CASCADE,

    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Prevent duplicate voting
    UNIQUE(election_id, voter_id)
);


-- =========================================================
-- DEFAULT ELECTION SETTINGS
-- =========================================================

INSERT INTO election_settings (
    nominee_start_date,
    nominee_end_date,
    election_start_date,
    election_end_date
)
VALUES (
    '2026-08-25 09:00:00',
    '2026-09-10 23:59:59',
    '2026-09-20 09:00:00',
    '2026-09-20 17:00:00'
);