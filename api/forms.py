from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField,validators

class RegistrationForm(FlaskForm):
    name = StringField('Name', [validators.DataRequired(),validators.Length(min=4, max=25)])
    email = StringField('Email Address', [validators.DataRequired(),validators.Length(min=6, max=30), validators.Email()])
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password',validators=[validators.EqualTo('password'), validators.DataRequired()])
    submit = SubmitField('Sign Up')
class LoginForm(FlaskForm):
    email = StringField('Email Address', [validators.DataRequired(), validators.Length(min=6, max=30), validators.Email()])
    password = PasswordField('Password', [validators.DataRequired()])
    submit = SubmitField(label='Sign in')