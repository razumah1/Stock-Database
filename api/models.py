import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

def get_db_connection():
    return mysql.connector.connect(
        host='',
        user='',
        password='.',
        database=''
    )

def register_user(username, email, password):
    hashed_password = generate_password_hash(password)
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute('INSERT INTO user (Username, Email, Password) VALUES (%s, %s, %s)',
                       (username, email, hashed_password))
        connection.commit()
    finally:
        cursor.close()
        connection.close()

def check_user_credentials(username, password):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute('SELECT * FROM user WHERE Username = %s', (username))
        user = cursor.fetchone()
        if user and check_password_hash(user['Password'], password):
            return True
        else:
            return False
    finally:
        cursor.close()
        connection.close()