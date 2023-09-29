from flask import Flask

app = Flask(__name__)

@app.route("/api/makecard")
def makecard():
    return "test"