
def save_json(data, filepath):

    with open(filepath, 'w') as file:
        json.dump(data,file)
        file.close()

        print ("file saved")
        return True

def save_data(data, filepath):

    with open(filepath, 'w') as file:
        file.write(data)
        file.close()
        
        print ("file saved")
        return True
