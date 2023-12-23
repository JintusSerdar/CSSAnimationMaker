import logging

from flask import Flask, redirect, render_template, request, session, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy import event
from instance.config import SECRET_KEY, SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS

application = Flask(__name__)
application.config['SECRET_KEY'] = SECRET_KEY
application.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS
db = SQLAlchemy(application)
migrate = Migrate(application, db)


# User model
class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    # Establish a relationship with saved animations
    animations = db.relationship('SavedAnimation', backref='user', lazy=True)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class SavedAnimation(db.Model):
    __tablename__ = 'savedAnimation'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    animationNumber = db.Column(db.Integer)
    spanColor = db.Column(db.String(7))
    spanCount = db.Column(db.Integer)
    styles = db.Column(db.JSON)


#  flask --app=application initdb
@application.cli.command("initdb")
def initialize_database():
    db.create_all()
    print("Database initialized.")


@application.route('/api/save_animation', methods=['POST'])
def save_animation():
    try:
        data = request.get_json()
        animation_data = data['savedAnimation']

        # Create a new SavedAnimation record associated with the user
        new_animation = SavedAnimation(
            userId=session['user_id'],
            animationNumber=animation_data['animationNumber'],
            spanColor=animation_data['spanColor'],
            spanCount=animation_data['spanCount'],
            styles=animation_data['styles']
        )

        db.session.add(new_animation)
        db.session.commit()

        return jsonify({'message': 'Animation saved successfully'})
    except Exception as e:
        logging.error(f"Error saving animation: {str(e)}")
        return jsonify({'error': 'An error occurred while saving the animation'}), 400


@application.route('/api/remove_animation', methods=['POST'])
def delete_animation():
    data = request.json
    animationNumber = data.get('animationNumber')

    if animationNumber is None:
        return jsonify({"message": "Missing animationNumber"}), 400

    # Find the animation to delete
    animation_to_delete = SavedAnimation.query.filter_by(userId=session['user_id'], animationNumber=animationNumber).first()

    if animation_to_delete is not None:
        db.session.delete(animation_to_delete)
        db.session.commit()
        return jsonify({"message": "Animation deleted successfully"})
    else:
        return jsonify({"message": "Animation not found"}), 404


@application.route("/")
def authentication():
    return render_template("index.html")


@application.route("/app")
def index():
    authenticated = 'user_id' in session  # Check if 'user_id' exists in the session
    if authenticated:
        user_id = session['user_id']

        # Getting username
        username = Users.query.filter_by(id=user_id).first().username.capitalize()

        # Assuming that savedAnimations is a list of animations for the currently authenticated user
        savedAnimations = SavedAnimation.query.filter_by(userId=user_id).all()

        # Convert SavedAnimation objects to dictionaries
        savedAnimations_dict = [
            {
                'animationNumber': animation.animationNumber,
                'spanColor': animation.spanColor,
                'spanCount': animation.spanCount,
                'styles': animation.styles,
            }
            for animation in savedAnimations
        ]

        return render_template("app.html", savedAnimations=savedAnimations_dict, authenticated=authenticated, username=username)

    return render_template("app.html", savedAnimations=None, authenticated=authenticated)


@application.route("/authentication")
def authentication():
    session.clear()
    return render_template("authentication.html")


@application.route("/login", methods=['GET', 'POST'])
def login():
    session.clear()

    if request.method == 'POST':
        username = request.form.get('loginUsername').lower()
        password = request.form.get('loginPassword')

        if not username:
            flash("Please provide a username", "danger")
        elif not password:
            flash("Please provide a password", "danger")
        else:
            user = Users.query.filter_by(username=username).first()

            if user and user.check_password(password):
                session['user_id'] = user.id
                flash("Logged in successfully", "success")
                return redirect("/")
            else:
                flash("Invalid username or password", "danger")

    return render_template("authentication.html")


@application.route("/logout")
def logout():
    session.clear()
    flash("Logged out successfully", "success")
    return redirect("/")


@application.route("/register", methods=['GET', 'POST'])
def register():
    session.clear()

    if request.method == 'POST':
        username = request.form.get('registerUsername').lower()
        email = request.form.get('registerEmail').lower()
        password = request.form.get('registerPassword')
        # confirmation = request.form.get("confirmation")

        # Check if the username or email is already taken
        if Users.query.filter_by(username=username).first():
            flash("Username is already taken, please choose another one", "danger")
        elif Users.query.filter_by(email=email).first():
            flash("Email is already registered, please use another email", "danger")
        # elif password != confirmation:
        #     flash("Passwords do not match. Please confirm your password.", "danger")
        else:
            # Create a new user record and store it in the database
            new_user = Users(username=username, email=email, password=generate_password_hash(password))
            db.session.add(new_user)
            db.session.commit()
            flash("Registration successful! You can now log in.", "success")
            return redirect("/login")

    return render_template("authentication.html")


# Define a function to create initial SavedAnimation rows
def create_sample_animations(user_id):

    sample_animation1 = {
        "userId": user_id,
        "animationNumber": 1,
        "spanColor": "#00e9ff",
        "spanCount": 180,
        "styles": {
            'animationDelay': '0.5s',
            'animationSpeed': '10s',
            'borderPixel': '4px',
            'borderRadius': '50%',
            'boxHeight': '0px',
            'boxWidth': '0px',
            'rotateDegree': '68deg',
            'shadowPixelX': '100px',
            'shadowPixelY': '100px',
            'spanHeight': '11px',
            'spanShade': '20px',
            'spanWidth': '11px',
            'transformOriginX': '98.5px',
            'transformOriginY': '12.5px'
        }
    }
    # Use session.execute to insert the data
    db.session.execute(SavedAnimation.__table__.insert().values(**sample_animation1))

    sample_animation2 = {
            "userId": user_id,
            "animationNumber": 2,
            "spanColor": "#ff0000",
            "spanCount": 120,
            "styles": {
                "animationDelay": "9.5s",
                "animationSpeed": "10s",
                "borderPixel": "4px",
                "borderRadius": "50%",
                "boxHeight": "300px",
                "boxWidth": "300px",
                "rotateDegree": "129deg",
                "shadowPixelX": "100px",
                "shadowPixelY": "35px",
                "spanHeight": "20px",
                "spanShade": "20px",
                "spanWidth": "20px",
                "transformOriginX": "161.5px",
                "transformOriginY": "12.5px"
            }
        }

    db.session.execute(SavedAnimation.__table__.insert().values(**sample_animation2))

    sample_animation3 = {
        "userId": user_id,
        "animationNumber": 3,
        "spanColor": "#ff0000",
        "spanCount": 120,
        "styles": {
            "animationDelay": "9.5s",
            "animationSpeed": "10s",
            "borderPixel": "4px",
            "borderRadius": "50%",
            "boxHeight": "116px",
            "boxWidth": "129px",
            "rotateDegree": "129deg",
            "shadowPixelX": "100px",
            "shadowPixelY": "0px",
            "spanHeight": "100px",
            "spanShade": "0px",
            "spanWidth": "0px",
            "transformOriginX": "0px",
            "transformOriginY": "-42.5px"
        }
    }

    db.session.execute(SavedAnimation.__table__.insert().values(**sample_animation3))

    sample_animation4 = {
        "userId": user_id,
        "animationNumber": 4,
        "spanColor": "#e000b0",
        "spanCount": 120,
        "styles": {
            "animationDelay": "0.75s",
            "animationSpeed": "10s",
            "borderPixel": "3px",
            "borderRadius": "50%",
            "boxHeight": "107px",
            "boxWidth": "300px",
            "rotateDegree": "129deg",
            "shadowPixelX": "0px",
            "shadowPixelY": "0px",
            "spanHeight": "100px",
            "spanShade": "5px",
            "spanWidth": "100px",
            "transformOriginX": "1px",
            "transformOriginY": "-66px"
        }
    }

    db.session.execute(SavedAnimation.__table__.insert().values(**sample_animation4))

    sample_animation5 = {
        "userId": user_id,
        "animationNumber": 5,
        "spanColor": "#4a0df2",
        "spanCount": 360,
        "styles": {
            "animationDelay": "0.75s",
            "animationSpeed": "10s",
            "borderPixel": "3px",
            "borderRadius": "0%",
            "boxHeight": "292px",
            "boxWidth": "0px",
            "rotateDegree": "188deg",
            "shadowPixelX": "0px",
            "shadowPixelY": "0px",
            "spanHeight": "100px",
            "spanShade": "5px",
            "spanWidth": "100px",
            "transformOriginX": "-83.5px",
            "transformOriginY": "300px"
        }
    }

    db.session.execute(SavedAnimation.__table__.insert().values(**sample_animation5))


# Event listener to create initial SavedAnimation rows when a new user is created
@event.listens_for(Users, 'after_insert')
def create_initial_sample_animations(mapper, connection, target):
    create_sample_animations(target.id)


if __name__ == '__main__':
    application.run()
