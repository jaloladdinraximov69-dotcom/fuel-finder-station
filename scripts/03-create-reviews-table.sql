-- Create reviews table for station reviews and ratings
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  station_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on station_id for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_station_id ON reviews(station_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
