from flask import render_template, request, redirect, url_for
from __main__ import app
from dbconfig import CONFIG
import mysql.connector

@app.route("/enroll_student_form")
def enroll_student_form():
  return render_template('enroll_student_form.html', result_message=request.args.get('result_message'))

@app.route("/enroll_student", methods=['POST'])
def enroll_student():
  first_name = request.form['first_name'].strip()
  last_name = request.form['last_name'].strip()
  if first_name == "" or last_name == "":
    return redirect(url_for("enroll_student_form", result_message="First Name or Last Name cannot be empty strings."))
  try:
    cnx = mysql.connector.connect(**CONFIG)
    cursor = cnx.cursor()
    add_student = ("INSERT INTO students "
                   "(first_name, last_name) "
                   "VALUES (%s, %s)")
    data_student = (first_name, last_name)
    cursor.execute(add_student, data_student)
    cnx.commit()
    cursor.close()
  except mysql.connector.Error as err:
    return redirect(url_for("enroll_student_form", result_message=str(err)))
  else:
    cnx.close()
  return redirect(url_for("enroll_student_form", result_message="Success"))
