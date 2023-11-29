import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from secret import DB_PASS as database_pw, DB_USER as database_username
from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password
    def get_id(self):
        return str(self.id)
def get_db_connection():
    return mysql.connector.connect(
        host='aws.connect.psdb.cloud',
        user= database_username,
        password=database_pw,
        database='stock_website'
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

def check_user_credentials(email, password):
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute('SELECT * FROM user WHERE Email = %s', (email,))
        user = cursor.fetchone()
        if user and check_password_hash(user[3], password):
            user_details = {
                'id': user[0],
                'username' : user[1],
                'password' : user[3],
            }
            return user_details
        else:
            return None
    finally:
        cursor.close()
        connection.close()