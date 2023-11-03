import sqlite3

class sqliteWrapper():
    def __init__(self):
        databaseconnection = sqlite3.connect("cards.db")
        cursor = databaseconnection.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS cards (id TEXT, title TEXT, difficulty TEXT, description TEXT);")
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