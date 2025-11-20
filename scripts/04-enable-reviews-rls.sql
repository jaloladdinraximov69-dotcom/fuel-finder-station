-- Enable RLS and create policies for reviews table
-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert reviews (public can add reviews)
CREATE POLICY "Anyone can insert reviews"
ON reviews FOR INSERT
WITH CHECK (true);

-- Allow anyone to read reviews (public can view reviews)
CREATE POLICY "Anyone can read reviews"
ON reviews FOR SELECT
USING (true);
