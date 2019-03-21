# Cupcake Lab

This project chains 3 independent Python web services together in a style similar to modern web-based microservices. Each of the web instances is created using a different Python web framework: Django, Flask, and Pyramid.

Ift also makes delicious looking cupcakes:
![](https://raw.githubusercontent.com/DavidJVitale/python_microservices/master/pics/1.gif)

## About

The above gif shows 3 seperate web instances running on different ports on my local computer (in a production environment, they would be hosted on different servers somewhere). 

The information between the 3 instances is connected through arbitrary rules, such as carrot cake cupcakes don't get neon blue frosting, sprinkles only go on vanilla and chocolate, etc. Although these 3 instances are constantly communicating to each other through JSON endpoints, they remain completely seperate. When I kill the cupcake topping service, I can still access the cupcake body and cupcake frosting service.

This has enormous advantages for large-scale enterprise applications: teams aren't managing segmented sections of code in an unweildly codebase, they're managing their own complete web APIs and distributions. This also means that portions of the production web application to still function if other services go down.

# Project Structure Breakdown
* django/
    * All the django project components. This includes the HTML/CSS/Javascript, as well as the Cupcake Body endpoints
    * /react_frontend/
        * The react-based front-end used to visualize these backend interactions. Forked from [node_react_boilerplate](https://github.com/DavidJVitale/node_react_boilerplate)
* flask/
    * All the flask project components. This includes the Cupcake Frosting components.
* pyramid/
    * All the pyramid project components. This includes the Cupcake topping components.
* build.sh
    * A build script that starts all 3 web instances
* requirements.txt
    * A pip-freeze instance of all necessary Python packages
* README.md
    * This file
