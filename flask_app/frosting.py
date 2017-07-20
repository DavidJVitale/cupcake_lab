from datetime import datetime

from collections import namedtuple

VANILLA_BODY = "vanilla"
CHOCOLATE_BODY = "chocolate"
CARROT_BODY = "carrot"

CHOCOLATE_FROSTING = {"name" : "chocolate",
                      "image_url" : "static/chocolate.png",
                      "info" : "Pairs well with Chocolate and Vanilla bodies",
                      "pub_date" : datetime(1995, 3, 11)}

VANILLA_FROSTING = { "name" : "vanilla",
                     "image_url" : "static/vanilla.png",
                     "info" : "A classic! Goes well with all cupcake bodies",
                     "pub_date" : datetime(1995, 3, 11)}

STRAWBERRY_FROSTING = { "name" : "strawberry",
                        "image_url" : "static/vanilla.png",
                        "info" : "Pairs well with Vanilla bodies",
                        "pub_date" : datetime(1995, 3, 11)}

NEON_FROSTING = { "name" : "neon",
                  "image_url" : "static/neonblue.png",
                  "info" : "Pairs well with Vanilla bodies",
                  "pub_date" : datetime(1995, 3, 11)}

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
