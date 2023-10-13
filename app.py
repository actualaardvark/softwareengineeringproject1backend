from flask import Flask, request, render_template, jsonify
from tinydb import TinyDB, Query, where
from marshmallow import Schema, fields, ValidationError
import random
import string

app = Flask(__name__)

db = TinyDB('db.json')

idlength = 16

class CardSchema(Schema):
    id = fields.String(required=True)
    difficulty = fields.Integer(required=True)
    description = fields.String(required=True)
    title = fields.String(required=True)
class RemoveCardSchema(Schema):
    id = fields.String(required=True)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/getid", methods=["POST"])
def getid():
    id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=idlength)).lower()
    search = Query()
    while db.search(search.id == id):
        id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=idlength)).lower()
    return id
@app.route("/api/removecard", methods=["POST"])
def removecard():
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
    
    return "success"

@app.route("/api/getcards", methods=["POST"])
def getcards():
    data = db.all()
    output = {
        "cards": data
    }
    print(jsonify(output))
    return jsonify(output)

@app.route("/api/makecard",methods=["POST"])
def makecard():
    requestinput = request.get_json()
    validationschema = CardSchema()
    try:
        validationresult = validationschema.load(requestinput)
    except ValidationError as err:
        return "keyschemavalidationerror", 400
    print(requestinput)
    id = requestinput["id"]
    title = requestinput["title"]
    description = requestinput["description"]
    difficulty = int(requestinput["difficulty"])
    if not difficulty <= 10 or not difficulty > 0:
        return "difficultyvalueerror", 400
    if len(id) != 16:
        return "idlengtherror", 400
    search = Query()
    if db.search(search.id == id):
        return "invalididerror", 400
    with transaction(db) as tr:
        tr.insert({
            "id": id,
            "title": title,
            "description": title,
            "difficulty": difficulty
        })
    return "success"