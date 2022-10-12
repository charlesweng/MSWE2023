from flask import render_template, request, redirect, url_for
from __main__ import app
from dbconfig import CONFIG
import mysql.connector

@app.route("/enroll_course_form")
def enroll_course_form():
  students = []
  courses = []
  try:
    cnx = mysql.connector.connect(**CONFIG)
    cursor = cnx.cursor()
    query = ("SELECT student_id, first_name, last_name "
             "FROM students")
    cursor.execute(query)
    for (student_id, first_name, last_name) in cursor:
      students.append([student_id, first_name, last_name])
    query = ("SELECT course_id, course_name, course_day_time "
             "FROM courses")
    cursor.execute(query)
    for (course_id, course_name, course_day_time) in cursor:
      courses.append([course_id, course_name, course_day_time])
    cursor.close()
  except mysql.connector.Error as err:
    return redirect(url_for("enroll_course_form", result_message=str(err)))
  else:
    cnx.close()
  return render_template('enroll_course_form.html', students=students, courses=courses, result_message=request.args.get('result_message'))

@app.route("/enroll_course", methods=['POST'])
def enroll_course():
  student_id = request.form['student_id'].strip()
  course_id = request.form['course_id'].strip()
  try:
    student_id = int(student_id)
    course_id = int(course_id)
  except Exception as ex:
    return redirect(url_for("enroll_course_form", result_message=str(ex)))
  try:
    cnx = mysql.connector.connect(**CONFIG)
    cursor = cnx.cursor()
    add_students_courses = ("INSERT INTO students_courses "
                   "(student_id, course_id) "
                   "VALUES (%s, %s)")
    data_students_courses = (student_id, course_id)
    cursor.execute(add_students_courses, data_students_courses)
    cnx.commit()
    cursor.close()
  except mysql.connector.Error as err:
    return redirect(url_for("enroll_course_form", result_message=str(err)))
  else:
    cnx.close()
  return redirect(url_for("enroll_course_form", result_message="Success"))
