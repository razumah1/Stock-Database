from models import get_db_connection
from secret import DB_PASS as database_pw, DB_USER as database_username



def print_stocks_from_db():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM stock') 
    stocks = cursor.fetchall()
    for stock in stocks:
        print(stock)
    cursor.close()
    connection.close()

if __name__ == "__main__":
    print_stocks_from_db()
