CREATE DATABASE hanzi_database;

CREATE TABLE hanzi (
    id SERIAL PRIMARY KEY,
    character VARCHAR(50) NOT NULL,
    pinyin VARCHAR(50) NOT NULL,
    english VARCHAR(50) NOT NULL,
    hsk_level INTEGER NOT NULL,
    hsk_section INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

