from datetime import datetime

from collections import namedtuple

VANILLA_BODY = "vanilla"
CHOCOLATE_BODY = "chocolate"
CARROT_BODY = "carrot"

CHOCOLATE_FROSTING = {"name" : "Chocolate",
                      "image_url" : "static/chocolate.png",
                      "info" : "Pairs well with Chocolate and Vanilla bodies",
                      "pub_date" : datetime(1995, 3, 11),
                      "appropriate_toppings" : ["sprinkles", "cherry", "flag"]}

VANILLA_FROSTING = { "name" : "Vanilla",
                     "image_url" : "static/vanilla.png",
                     "info" : "A classic! Goes well with all cupcake bodies",
                     "pub_date" : datetime(1995, 3, 11),
                     "appropriate_toppings" : ["sprinkles", "cherry", "flag"]}

STRAWBERRY_FROSTING = { "name" : "Strawberry",
                        "image_url" : "static/strawberry.png",
                        "info" : "Pairs well with Vanilla bodies",
                        "pub_date" : datetime(1995, 3, 11),
                        "appropriate_toppings" : ["cherry", "flag"]}

NEON_FROSTING = { "name" : "Neon",
                  "image_url" : "static/neonblue.png",
                  "info" : "Pairs well with Vanilla bodies. May contain radium",
                  "pub_date" : datetime(1995, 3, 11),
                  "appropriate_toppings" : ["sprinkles"]}

ALL_FROSTINGS = [ CHOCOLATE_FROSTING,
                  VANILLA_FROSTING,
                  STRAWBERRY_FROSTING,
                  NEON_FROSTING ]

def frostings_for(body):
    if body == VANILLA_BODY:
        return ALL_FROSTINGS
    elif body == CHOCOLATE_BODY:
        return [ CHOCOLATE_FROSTING, VANILLA_FROSTING ]
    elif body == CARROT_BODY:
        return [ VANILLA_FROSTING ]
    else:
        return []
