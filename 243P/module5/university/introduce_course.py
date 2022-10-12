from flask import render_template, request, redirect, url_for
from __main__ import app
from dbconfig import CONFIG
import mysql.connector

@app.route("/introduce_course_form")
def introduce_course_form():
  return render_template('introduce_course_form.html', result_message=request.args.get('result_message'))

@app.route("/introduce_course", methods=['POST'])
def introduce_course():
  course_name = request.form['course_name'].strip()
  course_day_time = request.form['course_day_time'].strip()
  if course_name == "" or course_day_time == "":
    return redirect(url_for("introduce_course_form", result_message="Course Name and Course Day Time must not be empty."))
  try:
    cnx = mysql.connector.connect(**CONFIG)
    cursor = cnx.cursor()
    add_course = ("INSERT INTO courses "
                   "(course_name, course_day_time) "
                   "VALUES (%s, %s)")
    data_course = (course_name, course_day_time)
    cursor.execute(add_course, data_course)
    cnx.commit()
    cursor.close()
  except mysql.connector.Error as err:
    return redirect(url_for("enroll_student_form", result_message=str(err)))
  else:
    cnx.close()
  return redirect(url_for("introduce_course_form", result_message="Success"))
