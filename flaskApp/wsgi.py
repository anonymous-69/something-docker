from flask import Flask, render_template , redirect ,  url_for, request

from flask_sqlalchemy import SQLAlchemy
from wtforms import Form, BooleanField, StringField, PasswordField, validators, validators, ValidationError, TextAreaField, TextField
from wtforms.validators import InputRequired, Email, Length, URL
from flask_wtf import Form
from flask_wtf import FlaskForm

from flask_bootstrap import Bootstrap
from datetime import datetime
import random, string
from sqlalchemy import desc
from myproject import app

if __name__ == "__main__":
    application.run()
