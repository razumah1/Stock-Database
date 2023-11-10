## new code

from flask import Flask, render_template, request, jsonify
from forms import RegistrationForm, LoginForm
from models import register_user, check_user_credentials

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with a real secret key

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        register_user(form.username.data, form.email.data, form.password.data)
        return jsonify({'message': 'User registered successfully'})
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm(request.form)
    if request.method == 'POST' and form.validate():
        if check_user_credentials(form.username.data, form.password.data):
            return jsonify({'message': 'Login successful'})
        else:
            return jsonify({'message': 'Invalid username or password'})
    return render_template('login.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)


### 





from flask import Flask, jsonify, request
#import mysql.connector
from flask_cors import CORS
from forms import RegistrationForm, LoginForm

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        # Register the user
        pass
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        # Perform login
        pass
    return render_template('login.html', form=form)


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

