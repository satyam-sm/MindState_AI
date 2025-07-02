# MindState AI

A DevOps-driven machine learning project for detecting mental health conditions from textual statements using NLP and logistic regression. Deployed as a scalable web application with Flask and Docker, integrated with CI/CD pipelines.

---

## Introduction

Mental health disorders affect millions but often go undiagnosed. Our system aims to bridge this gap by detecting potential mental health conditions using machine learning and natural language processing. It classifies input text into one of seven mental health states and is deployed via a containerized web app following DevOps best practices.

---

## Features

- Classifies text into 7 categories: Anxiety, Bipolar, Depression, Normal, Personality Disorder, Stress, Suicidal Tendencies
- 86.6% test accuracy using Logistic Regression
- Real-time predictions via a Flask web interface
- Dockerized for consistent deployment
- CI/CD pipeline using GitHub Actions for automated deployment

---

## Technologies Used

### Frontend

- HTML, CSS, JavaScript
- Bootstrap (for responsive UI)

### Backend & ML

- Flask (Python)
- Scikit-learn, Pandas, NumPy
- NLTK for text preprocessing
- TF-IDF vectorization, Logistic Regression

### DevOps

- Docker
- Git & GitHub
- GitHub Actions (CI/CD)

---

## Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/satyam-sm/Mindstate_AI.git
cd mindstate_AI
```

### Step 2: Using Docker (Recommended)

```bash
docker build -t mental-health-model .
docker run -p 5000:5000 mental-health-model
```

### Step 3: Access the Application

Open your browser and visit: http://localhost:5000

---

## Results and Analysis

- **Overall Accuracy:** 86.6%
- **Training Accuracy:** 96.1%
- **F1-Score (Weighted Avg):** 0.87
- Strong performance for Anxiety, Bipolar, and Normal categories.
- Slight improvements needed for Suicidal classification.

---