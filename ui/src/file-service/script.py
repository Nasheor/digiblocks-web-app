import csv
import tkinter as tk
from tkinter import filedialog
import pandas as pd
from datetime import datetime
import codecs

def main(): 
    data = ""
    valid_file = False
    while not valid_file:
        root = tk.Tk()
        root.withdraw()

        # Opening the File
        filename = filedialog.askopenfilename(initialdir = ".",title = "Input KPI file",filetypes = (("Excel files","*.xlsx"), ("CSV files", "*.csv")))
        destination_path = "/".join(filename.split("/")[0:len(filename.split("/"))-1])
        file = filename.split("/")[-1].split(".")[0]
        file_type = filename.split("/")[-1].split(".")[1]
        # print(file+".csv file located at", destination_path)

        # Checking if its a Valid file, and if it is reading it into a dataframe
        # if file_type == "csv":
        #     dateparse = lambda x: datetime.strptime(x, '%m-%d-%Y %H:%M:%S')
        #     data = pd.read_csv(filename, header=0, parse_dates=[0, 1], date_parser=dateparse)
        #     valid_file = True
        #     break
        # elif file_type == "xlsx":
        #     data = pd.read_excel(filename, sheet_name="Sheet0")
        #     valid_file = True
        #     break
        # else:
        #     print("Invalid File Type. Supported file types are .csv and .xlsx")
        print(open(filename, encoding='ISO-8859-1').read().index('\0'))
        with open(filename, mode='r',newline='', encoding='ISO-8859-1') as f:
            csvFile = csv.reader(x.replace('\0', '') for x in codecs.open(filename, 'rU', 'utf-32'))
            for lines in csvFile:
                print(lines[0][0])


                



if __name__ == '__main__':
    main()