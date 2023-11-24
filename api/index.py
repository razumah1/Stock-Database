from flask import Flask, jsonify, request
from forms import RegistrationForm, LoginForm
from models import register_user, check_user_credentials
from finnhub_integration import setup_finnhub_client, fetch_stock_data, get_stock_quote, get_general_news, get_technical_indicator
from secret import api_key

app = Flask(__name__)
finnhub_client = setup_finnhub_client('cen5uf2ad3i22rjjmfg0cen5uf2ad3i22rjjmfgg') 

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

@app.route('/api/stock_data/<symbol>/<date>')
def api_fetch_stock_data(symbol, date):
    data = fetch_stock_data(finnhub_client, symbol, date)
    return jsonify(data) if data is not None else jsonify({'error': 'Data not found'})

@app.route('/api/stock_quote/<symbol>')
def api_get_stock_quote(symbol):
    quote = get_stock_quote(finnhub_client, symbol)
    return jsonify(quote)

@app.route('/api/general_news')
def api_get_general_news():
    news = get_general_news(finnhub_client)
    return jsonify(news)

@app.route('/api/technical_indicator/<symbol>/<resolution>/<int:_from>/<int:to>/<indicator>/<int:timeperiod>')
def api_get_technical_indicator(symbol, resolution, _from, to, indicator, timeperiod):
    indicator_data = get_technical_indicator(finnhub_client, symbol, resolution, _from, to, indicator, timeperiod)
    return jsonify(indicator_data)

if __name__ == '__main__':
    app.run(debug=True)


'''
from flask_cors import CORS

app = Flask(__name__)
CORS(app)'''