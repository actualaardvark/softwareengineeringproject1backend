# Task Management Web App

## Description

A simple app for managing tasks with Flask

## File Structure

### setup.sh

``setup.sh`` contains a simple script to set up a python virtual environment and install the dependencies outlined in ``requirements.txt``.

### environment.sh

``environment.sh`` is activated using the command ``source environment.sh`` and activates the virtual machine created by ``setup.sh``. It also sets two Flask environment variables to enable debug mode.

### build.sh

``build.sh`` is a temporary script to build a pyinstaller executable.

``requirements.txt`` contains a list of all the python3 dependencies. It can be used as an install list using ``python3 -m pip install -r requirement.txt``.

### app.py

The primary Flask app backend code.

### static

The folder containing the css/js frontend code.

### static/js/index.js

The primary frontend javascript code. Planning to split into several files later.

### static/css/index.css

The primary frontend css code. Planning to split into several files later.

### testcases

The folder containing the API testcases.

### apitests.sh (Broken Due to API Changes)

A script for running the API tests. API tests ``echo`` pass or fail, and that is used to determine whether a test has passed. New API tests can be added as shell scripts categorized by folders.

### nixenv.sh

A script that enables a suitable environment for developing this codebase on NixOS. Not useful for most devs.

## Tasks

- [ ] Javascript-powered modal dialogues
- [ ] Fix CSS scaling issues
- [ ] Retool API testing framework
- [ ] Port database to sqlite3 from tinydb/tinyrecord
- [ ] Move to full web app from flaskwebgui
- [ ] Document API
- [ ] Move frontend to nodejs
- [ ] Remove dependence on Flask templates