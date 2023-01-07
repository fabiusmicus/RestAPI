from flask import Flask, jsonify, request
from engines import Engine, EngineDatabase


app = Flask(__name__, static_folder='.', static_url_path='')
engine_store = EngineDatabase()

@app.route('/engines', methods=['GET'])
def get_engines():
    engines = engine_store.get_engines()
    return jsonify([engine.__dict__ for engine in engines])

@app.route('/engines/<int:id>', methods=['PUT'])
def update_engine(id):
    data = request.get_json()
    manufacture_date = data['manufacture_date']
    success = engine_store.update_engine(id, manufacture_date)
    return jsonify({'success': success})

@app.route('/')
def root():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run()
