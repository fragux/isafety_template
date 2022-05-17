from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from flask.json import JSONEncoder
from bson.objectid import ObjectId
from flask_cors import CORS

class CustomJSONEncoder(JSONEncoder):

    def default(self, obj):
        try:
            if isinstance(obj, ObjectId):
                return str(obj)
            iterable = iter(obj)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)

app = Flask(__name__)
CORS(app)
app.json_encoder = CustomJSONEncoder

app.config['MONGO_DBNAME'] = 'restdb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/restdb'

mongo = PyMongo(app)

def replace_id(obj):
  # Replace mongodb _id parameter with an id parameter
  if obj.get('_id'):
    id = str(obj.get('_id'))
    del obj['_id']
    obj['id'] = id

  return obj

## Generic collections

@app.route('/<colname>', methods=['GET'])
def col_get_all(colname):
  col = mongo.db[colname]
  elems = []
  for elem in col.find():
    elems.append(replace_id(elem))
  return jsonify(elems)

@app.route('/<colname>/<id>', methods=['GET'])
def get_elem(colname, id):
  col = mongo.db[colname]
  elem = col.find_one({'_id' : ObjectId(id)})
  if elem:
    output = replace_id(elem)
  else:
    output = "No such element"
  return jsonify(output)

@app.route('/<colname>/<id>/<attribute>', methods=['GET'])
def get_attribute(colname, id, attribute):
  col = mongo.db[colname]
  elem = col.find_one({'_id' : ObjectId(id)})
  if elem:
    output = elem[attribute]
  else:
    output = "No such element"
  return jsonify(output)

@app.route('/<colname>', methods=['POST'])
def add_elem(colname):
  relem = request.json
  col = mongo.db[colname]

  id = relem.get('id')
  if id:
    # update
    del relem['id']
    col.find_one_and_update(
      {"_id": ObjectId(id)}, 
      {"$set": relem})
    elem = col.find_one({'_id': ObjectId(id)})
  else:
    # create
    id = col.insert(relem)
    elem = col.find_one({'_id': ObjectId(id)})
    
  return jsonify(replace_id(elem))


@app.route('/<colname>/<id>', methods=['POST', 'PUT'])
def update_elem(colname, id):
  col = mongo.db[colname]
  elem = col.find_one({'_id' : ObjectId(id)})
  if elem:
    col.find_one_and_update(
      {"_id": ObjectId(id)}, 
      {"$set": request.json})
    elem = col.find_one({'_id': ObjectId(id)})
  return jsonify(replace_id(elem))

@app.route('/<colname>/<id>', methods=['PATCH'])
def patch_elem(colname, id):
  col = mongo.db[colname]
  elem = col.find_one({'_id' : ObjectId(id)})
  if elem:
    col.find_one_and_update(
      {"_id": ObjectId(id)}, 
      {"$set": request.json})
    elem = col.find_one({'_id': ObjectId(id)})
  return jsonify(replace_id(elem))

@app.route('/<colname>/<id>/<attribute>', methods=['POST', 'PUT'])
def update_attribute(colname, id, attribute):
  col = mongo.db[colname]
  elem = col.find_one({'_id' : ObjectId(id)})
  if elem:
    col.find_one_and_update(
      {"_id": ObjectId(id)}, 
      {"$set": {attribute: request.json}})
    elem = col.find_one({'_id': ObjectId(id)})
  return jsonify(elem[attribute])

@app.route('/<colname>/<id>', methods=['DELETE'])
def delete_elem(colname, id):
  col = mongo.db[colname]
  col.delete_one({'_id': ObjectId(id)})
  return jsonify(id)

if __name__ == '__main__':
    app.run(debug=True, port=9090)