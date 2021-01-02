import os
from os import path

from flask import Flask, render_template
from sparder import get_popular_data
from flask import jsonify
from test import get_server_time
from flask_cors import *
CORS_ORIGIN_ALLOW_ALL = True
TEMPLATES_AUTO_RELOAD = True
app = Flask(__name__)
app.jinja_env.auto_reload = True

#CORS_ORIGIN_ALLOW_ALL = True
CORS(app, supports_credentials=True)
CORS(app, resources=r'/*')
@app.route('/')
# @cross_origin()
def hello_world():
    return render_template('index.html')
@app.route('/get_time')
def get_time():
    return get_server_time()
@app.route('/get_data')
def get_data():
    data = get_popular_data()
    #return get_server_time()
    #print(data)
    print("11111111111111111111111")

    dic={"data":data}
    #print(dic)
    #print(jsonify({"data": data}))
  #  return data
    return jsonify(data)
    #return jsonify({"data": data})

if __name__ == '__main__':
    app.jinja_env.auto_reload = True
    # extra_dirs = ['static/js', ]
    # extra_files = extra_dirs[:]
    # for extra_dir in extra_dirs:
    #     for dirname, dirs, files in os.walk(extra_dir):
    #         for filename in files:
    #             filename = path.join(dirname, filename)
    #             if path.isfile(filename):
    #                 extra_files.append(filename)

    app.run(debug=True)
