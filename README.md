# Python Microservices

This project chains 3 Python web services together in a style similar to modern web-based microservices. Each of the web instances is created using a different Python web framework: Django, Flask, and Pyramid.

# Project Structure Breakdown
* django/
    * All the django project components
* flask/
    * All the flask project components
* pyramid/
    * All the pyramid project components
* build.sh
    * A build script that starts all 3 web instances
* requirements.txt
    * A pip-freeze instance of all necessary Python packages (Note: for this project, doing a sudo pip install on django flask and pyramid should have the same effect)
* README.md
    * This file
