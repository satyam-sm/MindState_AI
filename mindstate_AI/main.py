from flask import Flask, render_template, request
import joblib
import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

app = Flask(__name__)

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('punkt_tab')

# Load model and vectorizer
model = joblib.load('mental_health_model.pkl')
vectorizer = joblib.load('tfidf_vectorizer.pkl')

# Preprocessing function
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'<.*?>+', '', text)
    text = re.sub(r'[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub(r'\n', '', text)
    text = re.sub(r'\w*\d\w*', '', text)
    return text

# Stopword removal
stop_words = set(stopwords.words('english'))
def remove_stopwords(text):
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word not in stop_words]
    return ' '.join(tokens)

# Prediction function
def predict_status(text):
    cleaned_text = preprocess_text(text)
    cleaned_text = remove_stopwords(cleaned_text)
    vectorized = vectorizer.transform([cleaned_text])
    prediction = model.predict(vectorized)
    return prediction[0]

# Define routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    user_input = request.form['text']
    prediction = predict_status(user_input)
    return render_template('index.html', prediction=prediction, user_input=user_input)

app.run(debug=True, host='0.0.0.0', port=5000)