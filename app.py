from flask import Flask
import pymongo

app = Flask(__name__)

@app.route("/api/makecard")
def makecard():
    return "Card"