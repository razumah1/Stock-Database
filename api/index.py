from flask import Flask, jsonify, redirect, url_for, flash, render_template
from forms import RegistrationForm, LoginForm
from models import register_user, check_user_credentials, get_db_connection, User
from finnhub_integration import setup_finnhub_client, fetch_stock_data, get_stock_quote, get_general_news, get_technical_indicator, stock_description,stock_eps, stock_basicfinancials, stock_EPSdate
from secret import api_key
from flask_login import login_user, current_user, LoginManager
from flask_cors import CORS


app = Flask(__name__)
login_manager = LoginManager(app)
app.app_context().push()
login_manager.login_view = "login"

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
finnhub_client = setup_finnhub_client(api_key) 
app.config['SECRET_KEY'] = 'any secret string' ## what is this
@login_manager.user_loader
def load_user(user_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM user WHERE id = %s", (user_id,))
    user_record = cursor.fetchone()
    if user_record: 
        user = User(user_record[0],user_record[1],user_record[3])
        return user
    else: return None
@app.route('/')
def home_page():
    return redirect('http://localhost:3000/')

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        register_user(form.name.data, form.email.data, form.password.data)
        return redirect('http://localhost:3000/stock')
    return render_template('register.html', form = form, current_page='register')
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user_details = check_user_credentials(form.email.data, form.password.data)
        if user_details:
            user = User(**user_details)
            login_user(user)
            return redirect('http://localhost:3000/stock')
        else:
            flash('Username or password is incorrect.',category='danger')
    return render_template('login.html', form = form, current_page='login')

@app.route('/api/stocks', methods=['GET'])
def get_all_stocks():
    # Example function that you need to implement
    stock_data = retrieve_all_stocks_from_database()
    return jsonify(stock_data)

def retrieve_all_stocks_from_database():
    # Connect to your database and fetch all stock data
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute('SELECT * FROM stock')  # Assuming you have a table named 'stocks'
        stocks = cursor.fetchall()
        return stocks  # This will be a list of dictionaries
    finally:
        cursor.close()
        connection.close()


@app.route('/api/stock_data/<symbol>/<date>')
def api_fetch_stock_data(symbol, date):
    data = fetch_stock_data(finnhub_client, symbol, date)
    return jsonify(data) if data is not None else jsonify({'error': 'Data not found'})

@app.route('/api/stock_quote/<symbol>')
def api_get_stock_quote(symbol):
    quote = get_stock_quote(finnhub_client, symbol)
    descript = stock_description(finnhub_client,symbol)
    EPS = stock_eps(finnhub_client,symbol)
    PE = stock_basicfinancials(finnhub_client,symbol)
    date = stock_EPSdate(finnhub_client, symbol)
    connection = get_db_connection()
    cursor = connection.cursor()
    # (symbol, round(quote['c'],2),descript['result'][0]['description']))
    #date['earningsCalendar'][0]['date']
    '''try:
        cursor.execute('INSERT INTO fundamentalanalysis (PERatio, EPS, MarketCap, Symbol) VALUES (%s, %s, %s, %s)',
                       (PE['metric']['peAnnual'], EPS[0]['actual'], round(PE['metric']['marketCapitalization']),symbol))
        connection.commit()
    finally:
        cursor.close()
        connection.close()'''
    return jsonify(PE['metric'])

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

