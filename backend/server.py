from flask import Flask, render_template, request, redirect, Response
import requests as req
import json
from flask_cors import CORS, cross_origin
import time
import datetime
from datetime import date


app = Flask(__name__)
CORS(app)

date_end = int(time.time() * 1000)
date_start = date_end 


def calculate_age(born):
    today = date.today()
    return today.year - born['year'] - ((today.month, today.day) < (born['month'], born['day']))


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    # Everything above this line should look the same for each 
    # index.py. Modify lines below this to have different logic
    # for different routes.
    return Response(
        "<h1>Flask</h1><p>You visited: /%s</p>" % (path), mimetype="text/html"
    )


@app.route('/login')
def login():
    global auth_code
    global auth_state
    global auth_scope
    global access_token

    auth_code = request.args.get('code', default="code", type=str)
    auth_state = request.args.get('state', default='state', type=str)
    auth_scope = request.args.get('scope', default='scope', type=str)
    # access_token

    data_access = {"client_id": "361616255897-semmpmgjdm0h35se46gr1c13r3aqhha6.apps.googleusercontent.com",
                   "client_secret": "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",
                   "code": auth_code,
                   "grant_type": "authorization_code",
                   "redirect_uri": "http://127.0.0.1:5000/login"}

    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = req.post("https://oauth2.googleapis.com/token",
                        data=data_access, headers=headers)
    access_token = "Bearer " + json.loads(response.text)["access_token"]
    # print(access_token)
    return render_template("index.html")


@app.route("/access_token")
def access_token():

    return {"access_token": access_token}


@app.route("/step_data")
def step_data():
    headers_req = {"Content-Type": "application/json;encoding=utf-8",
                   "Authorization": access_token}

    agg_body = {
        "aggregateBy": [{
            "dataTypeName": "com.google.step_count.delta",
            "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
        }],
        "bucketByTime": {"durationMillis": 86400000},
        "startTimeMillis": (date_start- 86400000),
        "endTimeMillis": date_end
    }

    step_req = req.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
                        headers=headers_req, json=agg_body)

    step_json = json.loads(step_req.text)

    steps = {}
    for i in step_json['bucket']:

        step_date_loop = int(i['dataset'][0]['point'][0]['startTimeNanos'])
        step_loop = i['dataset'][0]['point'][0]['value'][0]['intVal']
        # steps.append(i['dataset'][0]['point'][0]['value'][0]['intVal'])
        date = datetime.datetime.fromtimestamp(
            step_date_loop/1000000000).strftime('%d-%m-%Y')
        steps[date] = step_loop

    return steps


@app.route("/heart_data")
def heart_data():
    headers_req = {"Content-Type": "application/json;encoding=utf-8",
                   "Authorization": access_token}

    agg_body = {
        "aggregateBy": [{
            "dataTypeName": "com.google.heart_rate.bpm",
            "dataSourceId": "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm"
        }],
        "bucketByTime": {"durationMillis": 86400000},
        "startTimeMillis": date_start - 86400000,
        "endTimeMillis": date_end 
    }

    heart_req = req.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
                         headers=headers_req, json=agg_body)

    heart_json = json.loads(heart_req.text)
    # print(heart_json)

    heart_date = {}

    for i in heart_json['bucket']:
        try:
            nano = int(i['dataset'][0]['point'][0]['startTimeNanos'])
            heart_loop = i['dataset'][0]['point'][0]['value'][0]['fpVal']
            date = datetime.datetime.fromtimestamp(
                nano/1000000000).strftime('%d-%m-%Y')
            heart_date[date] = heart_loop
        except:
            pass

    if heart_date == {}:
        return {"heart" : 0}
    else:
        return heart_date


@app.route("/aggregate")
def aggregate():
    step_get = req.get("http://127.0.0.1:5000/step_data")
    heart_get = req.get("http://127.0.0.1:5000/heart_data")
    sleep_get = req.get("http://127.0.0.1:5000/sleep")

    step_json = json.loads(step_get.text)
    heart_json = json.loads(heart_get.text)
    sleep_json = json.loads(sleep_get.text)

    # step_json[list(step_json)[-1]]

    step_data = step_json[list(step_json)[-1]]
    heart_data = heart_json[list(heart_json)[-1]]
    sleep_data = sleep_json[list(sleep_json)[-1]]

    return {"steps": step_data, 'heart': heart_data, "sleep" : sleep_data}


# @app.route("/pair_heart")
# def pair_heart():
#     pair_req = req.get("http://127.0.0.1:5000/heart_data")

#     recipie_json = json.loads(pair_req.text)

#     return {"heart_date": list(recipie_json.keys()), "heart_val": list(recipie_json.values())}


@app.route("/sleep")
def sleep():
    headers_req = {"Content-Type": "application/json;encoding=utf-8",
                   "Authorization": access_token}

    agg_body = {
        "aggregateBy": [
            {
                "dataTypeName": "com.google.sleep.segment"
            }
        ],
        "endTimeMillis": date_end ,
        "startTimeMillis": date_start- 86400000
    }

    heart ={}

    heart_req = req.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
                         headers=headers_req, json=agg_body)

    heart_json = json.loads(heart_req.text)

    for i in heart_json['bucket']:
        try:
            step_date_loop = int(i['dataset'][0]['point'][0]['startTimeNanos'])
            step_loop = i['dataset'][0]['point'][0]['value'][0]['intVal']
            # steps.append(i['dataset'][0]['point'][0]['value'][0]['intVal'])
            date = datetime.datetime.fromtimestamp(
                step_date_loop/1000000000).strftime('%d-%m-%Y')
            heart[date] = step_loop
        except:
            pass

    if heart == {}:
        heart["date"] = 0

    sleep_metrics = {0: "Data not Available", 1 : "Awake", 2: "Sleep", 3:"Out of bed", 4 : "Light sleep" , 5 : "Deep sleep", 6: "REM"}


    return {"sleep" : sleep_metrics[list(heart.values())[0]]}



@app.route("/calories")
def calories():
    
    headers_req = {"Content-Type": "application/json;encoding=utf-8",
                   "Authorization": access_token}
    
    agg_body = {
        "aggregateBy": [
            {
                "dataTypeName": "com.google.height",
            }
        ],
        "endTimeMillis": date_end ,
        "startTimeMillis": date_start- 7776000000
    }

    calorie_data = {}

    height_req = req.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
                         headers=headers_req, json=agg_body)
    
    height_json = json.loads(height_req.text)

    calorie_data["height"] = (height_json["bucket"][-1]['dataset'][0]['point'][0]['value'][0]['fpVal'])*100

    agg_body["aggregateBy"][0]["dataTypeName"] = "com.google.weight"

    weight_req = req.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
                         headers=headers_req, json=agg_body)
    
    weight_json = json.loads(weight_req.text)
    calorie_data["weight"] = weight_json["bucket"][-1]['dataset'][0]['point'][0]['value'][0]['fpVal']

    # print(calorie_data)

    age_req = req.get("https://people.googleapis.com/v1/people/me?personFields=birthdays", headers=headers_req)
    age_json = json.loads(age_req.text)

    # print(age_json)

    calorie_data["age"] = calculate_age(age_json['birthdays'][-1]['date'])

    calorie_data["kcal"] = int(round((10*calorie_data["weight"]) + (6.25 * calorie_data["height"]) - (5 * calorie_data["age"]) + 5, -2))

    return calorie_data

if __name__ == '__main__':
    app.run(debug=True)
