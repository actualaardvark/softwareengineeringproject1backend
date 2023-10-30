# Flask Web Framework
from flask import Flask, request, render_template, jsonify
# Tinydb JSON Database
from tinydb import TinyDB, Query, where
# Marshmallow for API Validation
from marshmallow import Schema, fields, ValidationError
# Random for Generating Random Numbers
import random
# String for generating ids and general string manipulation
import string
# TinyRecord as a Wrapper to Prevent Flask's Multithreading from Breaking TinyDB
from tinyrecord import transaction
# Webbrowser for Browser Tab Opening
import webbrowser
# flask ui framework (hooks into chromium install)
from flaskwebgui import FlaskUI

import sqlite3


#Instantiate flask app
app = Flask(__name__)
# Create/Register new tinydb
db = TinyDB('db.json')

databaseconnection = sqlite3.connect("cards.db")
cursor = databaseconnection.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS cards (id TEXT, title TEXT, difficulty TEXT, description TEXT);")

class sqliteWrapper():
    def writeCards(self, id, title, difficulty, description):
        databaseconnection = sqlite3.connect("cards.db")
        cursor = databaseconnection.cursor()
        cursor.execute("INSERT INTO cards VALUES (?, ?, ?, ?)", (id, title, difficulty, description,))
        databaseconnection.commit()
        print(databaseconnection.total_changes)
    def getCards(self):
        databaseconnection = sqlite3.connect("cards.db")
        cursor = databaseconnection.cursor()
        rows = cursor.execute("SELECT id, title, difficulty, description FROM cards ORDER BY difficulty DESC;").fetchall()
        dictrows = []
        print(rows)
        for i in rows:
            dictrows.append({
                "id": i[0], 
                "title": i[1], 
                "difficulty:": i[2], 
                "description": i[3]
                })
        return dictrows
    def deleteCard(self, id):
        databaseconnection = sqlite3.connect("cards.db")
        cursor = databaseconnection.cursor()
        cursor.execute("DELETE FROM cards WHERE id = ?", (id,))
        databaseconnection.commit()
    def editCard(self, id, title, difficulty, description):
        databaseconnection = sqlite3.connect("cards.db")
        cursor = databaseconnection.cursor()
        cursor.execute("DELETE FROM cards WHERE id = ?", (id,))
        databaseconnection.commit()
        cursor.execute("INSERT INTO cards VALUES (?, ?, ?, ?)", (id, title, difficulty, description,))
        databaseconnection.commit()

# Set length of card ids
idlength = 16
# Validation schemes for marshmallow
class CardSchema(Schema):
    id = fields.String(required=True)
    difficulty = fields.Integer(required=True)
    description = fields.String(required=True)
    title = fields.String(required=True)
class RemoveCardSchema(Schema):
    id = fields.String(required=True)
#Return main page
@app.route("/")
def index():
    return render_template("index.html")
# Gets valid id for card. Could be replaced later
@app.route("/api/getid", methods=["POST"])
def getid():
    id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=idlength)).lower()
    search = Query()
    while db.search(search.id == id):
        id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=idlength)).lower()
    output = {"id": id}
    print(output)
    return jsonify(output)
# API for removing card from database by id
@app.route("/api/removecard", methods=["POST"])
def removecard():
    wrapper = sqliteWrapper()
    search = Query()
    requestinput = request.get_json()
    validationschema = RemoveCardSchema()
    try:
        validationresult = validationschema.load(requestinput)
    except ValidationError as err:
        return "keyschemavalidationerror", 400
    if len(requestinput["id"]) != 16:
        return "idlengtherror", 400
    print(requestinput)
    with transaction(db) as tr:
        tr.remove(where("id") == requestinput["id"])
    wrapper.deleteCard(requestinput["id"])
    return jsonify({"error":"success"}), 200
# API for getting a complete list of cards. Returns as JSON to by parsed by JS
@app.route("/api/getcards", methods=["POST"])
def getcards():
    wrapper = sqliteWrapper()
    print(wrapper.getCards())
    # data = db.all()
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
    wrapper = sqliteWrapper()
    requestinput = request.get_json()
    validationschema = CardSchema()
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
    if db.search(search.id == id):
        print("invalididerror")
        return jsonify({"error":"invalididerror"}), 400
    # with transaction(db) as tr:
    #     tr.insert({
    #         "id": id,
    #         "title": title,
    #         "description": description,
    #         "difficulty": difficulty
    #     })
    wrapper.writeCards(id, title, difficulty, description)
    return jsonify({"error":"success"}), 200
# Slightly modified new card api for editing
@app.route("/api/editcard",methods=["POST"])
def editcard():
    wrapper = sqliteWrapper()
    requestinput = request.get_json()
    validationschema = CardSchema()
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
# if __name__ == "__main__":
#     app.run()
if __name__ == "__main__":
  # If you are debugging you can do that in the browser:
  # app.run()
  # If you want to view the flaskwebgui window:
  FlaskUI(app=app, server="flask", port=5052).run()