from flask import Flask, request
from pymongo import MongoClient
import random
import string

app = Flask(__name__)

mongoclient = MongoClient()

database = mongoclient["db"]

cards = database["cards"]

idlength = 16

@app.route("/api/getid", methods=["POST", "GET"])
def getid():
    id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=idlength)).lower()
    print(id)
    print(cards.find_one({'id': id}))
        #id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=idlength))
    return id

@app.route("/api/makecard",methods=["POST"])
def makecard():
    requestinput = request.get_json()
    print(requestinput)
    if requestinput["id"] and requestinput["title"] and requestinput["description"] and requestinput["difficulty"]:
        id = requestinput["id"]
        title = requestinput["title"]
        description = requestinput["description"]
        difficulty = requestinput["difficulty"]
    else:
        return "missingkey"
    return "success"