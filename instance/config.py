import os
SECRET_KEY = os.environ.get('SECRET_KEY', 'ff75ad21682ef28442814bdecd45eb6a4d15f9d1fc6280cc3d5a43fedac24f26')
SQLALCHEMY_DATABASE_URI = 'sqlite:///CSSAnimations.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
