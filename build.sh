git pull
pyinstaller -w -F --add-data "templates:templates" --add-data "static:static" app.py --paths ./venv/lib/python*/site-packages