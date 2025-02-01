import sys
import requests

filename = input("filename=")

line = "http://localhost:3000"

output = open(filename, "w")

sys.stdout = output

print("__________________________________")
print()

print("testing getting the about")
print("-------------------------")

try:
    text = ""
    # getting details of team manager
    url = line + "/api/about/"
    data = requests.get(url)
    print("url=" + url)
    print("data.status_code=" + str(data.status_code))
    print(data.content)
    print("data.text=" + data.text)
    print(data.json())
except Exception as e:
    print("problem")
    print(e)

print()

print("adding a cost item for the user")
print("-------------------------------")

try:
    text = ""
    url = line + "/api/add/"
    data = requests.post(url, json={'userId': '123123', 'description': 'test item', 'category': 'food', 'sum': 50, 'date': '2025-02-15T00:00:00.000Z'})
    print("url=" + url)
    print("data.status_code=" + str(data.status_code))
    print(data.content)
except Exception as e:
    print("problem")
    print(e)

print()

print("testing getting the report - 1")
print("------------------------------")

try:
    text = ""
    # getting the report
    url = line + "/api/report/?userId=123123&year=2025&month=2"
    data = requests.get(url)
    print("url=" + url)
    print("data.status_code=" + str(data.status_code))
    print(data.content)
    print("data.text=" + data.text)
    print(text)
except Exception as e:
    print("problem")
    print(e)

print()

print("testing adding cost item")
print("----------------------------------")

try:
    text = ""
    url = line + "/api/add/"
    data = requests.post(url, json={'userId': '123123', 'description': 'milk 9', 'category': 'food', 'sum': 8, 'date': '2025-02-15T00:00:00.000Z'})
    print("url=" + url)
    print("data.status_code=" + str(data.status_code))
    print(data.content)
except Exception as e:
    print("problem")
    print(e)

print()

print("testing getting the report - 2")
print("------------------------------")

try:
    text = ""
    # getting the report
    url = line + "/api/report/?userId=123123&year=2025&month=2"
    data = requests.get(url)
    print("url=" + url)
    print("data.status_code=" + str(data.status_code))
    print(data.content)
    print("data.text=" + data.text)
    print(text)
except Exception as e:
    print("problem")
    print(e)

print()