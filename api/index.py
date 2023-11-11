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
    return "<p>User successful!</p>"
    #render_template('register.js', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm(request.form)
    if request.method == 'POST' and form.validate():
        if check_user_credentials(form.username.data, form.password.data):
            return jsonify({'message': 'Login successful'})
        else:
            return jsonify({'message': 'Invalid username or password'})
    return "<p>User successful!</p>"
    #return render_template('login.js', form=form)

if __name__ == '__main__':
    app.run(debug=True)


'''
from flask_cors import CORS

app = Flask(__name__)
CORS(app)'''
