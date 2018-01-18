from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
import json
import db as db
from urllib.parse import unquote


class Server(BaseHTTPRequestHandler):

    def __init__(self, request, client_address, server):
        super().__init__(request, client_address, server)
        # SWAP TO USE CONFIG
        self.conn = db.connect_to_db(host='localhost', dbname='sdsa', user='postgres', password='password')

    def fetchTestNames(self):
        """ fetch names of all test options """
        print('Fetching Test Names')
        return ['SDSA', 'Trail Making']

    def fetchLocalisationNames(self):
        """ fetch names of all test options """
        print('fetching Localisation Presets')
        return db.select_localisation_presets(self.conn)

    ######
    #   
    #   GETS
    #
    ######
    
    def participant_request_GET(self, components, component_count):
        """ process participant requests """
        
        if component_count == 1:
            self.send_response(400)
            return 'invalid request'

        if component_count == 2:
            self.send_response(200)
            return json.dumps({'p_id: ' : components[1]}, indent=2)

        self.send_response(404)
        return 'Not sure what you want...'


    def clinician_request_GET(self, components, component_count):
        """ process clinician requests """

        self.send_response(404)
        return 'Not sure what you want...'

    def localisation_request_GET(self, components, component_count):
        """ localisation requests """

        if component_count == 1:
            self.send_response(200)
            return json.dumps({'locales': self.fetchLocalisationNames()})

        self.send_response(404)
        return 'Not sure what you want...'


    def login_request_GET(self, components, component_count):
        """ localisation requests """

        self.send_response(404)
        return 'Not sure what you want...'

    def tests_request_GET(self, components, component_count):
        """ Tests requests """
        if component_count == 1:
            self.send_response(200)
            return json.dumps({'tests': self.fetchTestNames()})

    ######
    #   
    #   POSTS
    #
    ######
    
    def participant_request_POST(self, components, component_count):
        """ process participant requests """
        
        if component_count == 1:
            self.send_response(400)
            return json.dumps({'p_id': 'Making a participant...'}, indent=2)

        if component_count == 2:
            self.send_response(200)
            return json.dumps({'p_id':components[1]}, indent=2)

        self.send_response(404)
        return 'Not sure what you want...'

    def clinician_request_POST(self, components, component_count):
        """ process clinician requests """

        self.send_response(404)
        return 'Not sure what you want...'

    def localisation_request_POST(self, components, component_count):
        """ localisation requests """

        self.send_response(404)
        return 'Not sure what you want...'

    def login_requests_POST(self, components, component_count):
        """ localisation requests """

        self.send_response(404)
        return 'Not sure what you want...'

    def tests_request_POST(self, components, component_count):
        """ Tests Requests """
        print('Processing Test POST request')
        if component_count == 5 and components[2] == 'localisation' and components[4] == 'participant':
            testType = components[1]
            locale = components[3]
            participant_id = db.create_participant(self.db)
            test_id = db.create_participant_test(self.db, participant_id)
            print('Initialising new test of type:', testType, 'With locale of:', locale)
            self.send_response(200)
            return json.dumps({'test': testType, 'locale': locale, 'p_id': participant, 't_id' : test_id)}, indent=2)
            

    ######
    #   
    #   Routing
    #
    ######
    

    def process_GET(self, url):
        """ parse an incoming url """

        components = url.lower().strip('/').split('/')

        comp_len = len(components)

        if comp_len == 0:
            self.send_response(400)
            return 'INVALID URL RECIEVED'

        if components[0] == 'participant':
            return self.participant_request_GET(components, comp_len)

        if components[0] == 'clinician':
            return self.clinician_request_GET(components, comp_len)

        if components[0] == 'localisation':
            return self.localisation_request_GET(components, comp_len)

        if components[0] == 'login':
            return self.login_request_GET(components, comp_len)

        if components[0] == 'tests':
            return self.tests_request_GET(components, comp_len)

        self.send_response(404)
        return 'Not sure what you want...'

    def process_POST(self, url):
        """ processess URL from POST Request """

        components = url.lower().strip('/').split('/')

        comp_len = len(components)

        if comp_len == 0:
            self.send_response(400)
            return 'INVALID URL RECIEVED'

        if components[0] == 'participant':
            return self.participant_request_POST(components, comp_len)

        if components[0] == 'clinician':
            return self.clinician_request_POST(components, comp_len)

        if components[0] == 'localisation':
            return self.localisation_request_POST(components, comp_len)

        if components[0] == 'login':
            return self.login_requests_POST(components, comp_len)

        if components[0] == 'tests':
            return self.tests_request_POST(components, comp_len)

        self.send_response(404)
        return 'Not sure what you want...'


    #####
    #
    #   do_GET and do_POST
    #
    #####

    def do_GET(self):
        url = urlparse(self.path)
        output = self.process_GET(url.geturl())
        
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('content-type','application/json')
        self.end_headers()
        
        self.wfile.write(bytes(output + '\n', "utf8"))
        return

    def do_POST(self):
        url = urlparse(self.path)
        output = self.process_POST(url.geturl())
        
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-type','application/json')
        self.end_headers()

        self.wfile.write(bytes(output + '\n', "utf8"))
        return

def main():
    """ main """
    server = HTTPServer(('localhost', 8080), Server)
    print('Starting server at http://localhost:8080')
    server.serve_forever()


if __name__ == '__main__':
    main()