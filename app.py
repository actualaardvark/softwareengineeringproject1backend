# Flask Web Framework
from flask import Flask, request, render_template, jsonify
# Random for Generating Random Numbers
import random
# String for generating ids and general string manipulation
import string
# Webbrowser for Browser Tab Opening
import webbrowser

from sqlitewrapper import sqliteWrapper

from cardvalidation import *

#Instantiate flask app
app = Flask(__name__)

# Set length of card ids
idlength = 16
#Return main page
@app.route("/")
def index():
    return render_template("index.html")
# API for removing card from database by id
@app.route("/api/removecard", methods=["POST"])
def removecard():
    wrapper = sqliteWrapper()
    requestinput = request.get_json()
    validationschema = RemoveCardSchema()
    try:
        validationresult = validationschema.load(requestinput)
    except ValidationError as err:
        return "keyschemavalidationerror", 400
    if len(requestinput["id"]) != 16:
        return "idlengtherror", 400
    print(requestinput)
    wrapper.deleteCard(requestinput["id"])
    return jsonify({"error":"success"}), 200
# API for getting a complete list of cards. Returns as JSON to by parsed by JS
@app.route("/api/getcards", methods=["POST"])
def getcards():
    wrapper = sqliteWrapper()
    print(wrapper.getCards())
    data = wrapper.getCards()
    print(data)
    output = {
        "cards": data
    }
    print(jsonify(output))
    return jsonify(output)
# API for making and validating new cards
@app.route("/api/makecard",methods=["POST"])
def makecard():
    id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=idlength)).lower()
    # search = Query()
    # while db.search(search.id == id):
    #     id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=idlength)).lower()
    wrapper = sqliteWrapper()
    requestinput = request.get_json()
    validationschema = CardSchema()
    try:
        validationresult = validationschema.load(requestinput)
    except ValidationError as err:
        print("keyschemavalidationerror")
        return jsonify({"error":"keyschemavalidationerror"}), 400
    print(requestinput)
    title = requestinput["title"]
    description = requestinput["description"]
    difficulty = int(requestinput["difficulty"])
    if not difficulty <= 10 or not difficulty > 0:
        print("difficultyvalueerror")
        return jsonify({"error":"difficultyvalueerror"}), 400
    if len(id) != 16:
        print("idlengtherror")
        return jsonify({"error":"idlengtherror"}), 400
    wrapper.writeCards(id, title, difficulty, description)
    return jsonify({"error":"success"}), 200
# Slightly modified new card api for editing
@app.route("/api/editcard",methods=["POST"])
def editcard():
    wrapper = sqliteWrapper()
    requestinput = request.get_json()
    validationschema = EditCardSchema()
    try:
        validationresult = validationschema.load(requestinput)
    except ValidationError as err:
        print("keyschemavalidationerror")
        return jsonify({"error":"keyschemavalidationerror"}), 400
    print(requestinput)
    id = requestinput["id"]
    title = requestinput["title"]
    description = requestinput["description"]
    difficulty = int(requestinput["difficulty"])
    if not difficulty <= 10 or not difficulty > 0:
        print("difficultyvalueerror")
        return jsonify({"error":"difficultyvalueerror"}), 400
    if len(id) != 16:
        print("idlengtherror")
        return jsonify({"error":"idlengtherror"}), 400
    search = Query()
    wrapper.editCard(id, title, difficulty, description)
    return jsonify({"error":"success"}), 200

if __name__ == "__main__":
  # If you are debugging you can do that in the browser:
  # app.run()
  # If you want to view the flaskwebgui window:
  FlaskUI(app=app, server="flask", port=5052).run()