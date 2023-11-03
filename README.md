# Task Management Web App

## Screenshots
![Screenshot from 2023-10-24 13 20 27@2x](https://github.com/actualaardvark/softwareengineeringproject1backend/assets/114784410/fe43e95a-b2a3-4d18-925c-6b4704e051d2)
![Screenshot from 2023-10-24 13 19 54@2x](https://github.com/actualaardvark/softwareengineeringproject1backend/assets/114784410/030bf1be-ee04-440a-8ab7-8d2b1376badf)
![Screenshot from 2023-10-24 13 19 47@2x](https://github.com/actualaardvark/softwareengineeringproject1backend/assets/114784410/46b87427-f1c8-49d9-a75e-b46297ed8a00)
![Screenshot from 2023-10-24 13 19 39@2x](https://github.com/actualaardvark/softwareengineeringproject1backend/assets/114784410/4f9f8f55-2e36-4fff-a854-43ae22cec8e3)


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
- [x] Port database to sqlite3 from tinydb/tinyrecord
- [ ] Move to full web app from flaskwebgui
- [ ] Document API
- [ ] Move frontend to nodejs
- [ ] Remove dependence on Flask templates
