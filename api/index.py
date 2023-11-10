from flask import Flask, jsonify, request
#import mysql.connector
from flask_cors import CORS
''' host = "LAPTOP-EAAK4H27"
user = "root"
password = "sqL32suharta."
database = "stocks"
connection = mysql.connector.connect(
    host=host,
    user=user,
    password=password,
    database=database
)
cursor = connection.cursor()
cursor.close()
connection.close() '''
app = Flask(__name__)
'''CORS(app)
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    return jsonify({'message': 'User registered successfully'})
@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    return jsonify({'message': 'Login successful'})'''
@app.route('/api/data')
def get_data():
    return jsonify({'message': 'Hello from Flask!'})
@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"
if __name__ =='__main__':
    app.run(debug=True)