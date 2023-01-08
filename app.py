from flask import Flask, jsonify, request
from engines import EngineDatabase
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__, static_folder='.', static_url_path='')
engine_database = EngineDatabase()

@app.route('/engines', methods=['GET'])
def get_engines():
    # Retrieve the list of engines from the store
    engines = engine_database.get_engines()
    # Log the request to the terminal
    logging.info('Received GET request for list of engines')
    # Return the list of engines as a JSON response
    return jsonify([engine.__dict__ for engine in engines])

@app.route('/engines/<int:id>', methods=['PUT'])
def update_engine(id):
    # Retrieve the request data
    data = request.get_json()
    manufacture_date = data['manufacture_date']
    # Update the engine with the provided data
    success = engine_database.update_engine(id, manufacture_date)
    # Log the request to the terminal
    logging.info(f'Updating manufacture date for engine {id} to {manufacture_date}')
    # Return the list of engines as a JSON response
    return jsonify({'success': success})

@app.route('/')
def root():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run()
