FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy contents of the app folder into the image
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port (change to 8501 if using Streamlit)
EXPOSE 5000

# Run the Python app
CMD ["python", "main.py"]
