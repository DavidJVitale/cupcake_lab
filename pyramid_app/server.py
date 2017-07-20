from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response

#CORS stuff for JSON
def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '1728000',
        })
    event.request.add_response_callback(cors_headers)

from pyramid.events import NewRequest

def sprinkles(request):
    return {"name" : "Sprinkles",
            "url" : "/static/sprinkles.png",
            "details" : "Delicious and colorful!"}

def cherry(request):
    return {"name" : "Cherry",
            "url" : "/static/cherry.png",
            "details" : "Try to tie the stem into a knot"}

def flag(request):
    return {"name" : "Flag",
            "url" : "/static/flag.png",
            "details" : "'These little flags are so cute!'"}

if __name__ == '__main__':
    print("Flask server started!")
    with Configurator() as config:
	config.add_subscriber(add_cors_headers_response_callback, NewRequest)

        config.add_route('sprinkles', '/api/toppings/sprinkles')
        config.add_view(sprinkles, route_name='sprinkles', renderer='json')
        
        config.add_route('cherry', '/api/toppings/cherry')
        config.add_view(cherry, route_name='cherry', renderer='json')
        
        config.add_route('flag', '/api/toppings/flag')
        config.add_view(flag, route_name='flag', renderer='json')
        
        config.add_static_view(name='static', path='static/')

        app = config.make_wsgi_app()
    server = make_server('0.0.0.0', 6500, app)
    server.serve_forever()
