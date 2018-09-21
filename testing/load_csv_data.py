# some io stuffs
from io import StringIO

# datatypes
import csv
import json

# http
import requests

# get the dummy csv data
csv_route = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQpzHSEDr9BL0h35-CzmUHmMJqKCq5qozPbyFMvaY2wvIrpFMdhWVUZaWIhvrVPfeAtef0ZRFk8smTu/pub?gid=0&single=true&output=csv"

# get the csv request
request = requests.get(csv_route)

# get the csv text

print (request.encoding)
# reads the csv text
csv_text = request.content.decode('utf-8')
# @param csv must be string
# returns array of dictionaries

def read_csv(csv_text):
    data = []
    fields = []

    csv_file = StringIO(csv_text)
    csvreader = csv.reader(csv_file, delimiter = ",")
    print (csvreader)

    firstrow = True
    for row in csvreader:

        if (firstrow):
            fields = row
            firstrow = False
        else:    
            formatted_row = []

            i = 0
            for item in row:
                formatted_row.append((fields[i], item))
                i+=1

            formatted_row_dict = dict(formatted_row)
            data.append(formatted_row_dict)

    return data

# save_json
# @param data
# data to save into file as json
# @param filepath
# path of file to save

def save_json(data, filepath):

    with open(filepath, 'w') as file:
        json.dump(data, file)
        file.close()

        print ("file saved")
        return True

csv_data = read_csv(csv_text)

# saves data to a file
save_json(csv_data, "./data/paintings.json")
