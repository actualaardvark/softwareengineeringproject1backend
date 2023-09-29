from flask import Flask, request
from pymongo import MongoClient

app = Flask(__name__)

mongoclient = MongoClient()

@app.route("/api/getid", methods=["POST"])
def getid():
    id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))

@app.route("/api/makecard",methods=["POST"])
def makecard():
    requestinput = request.data
    return "Card"