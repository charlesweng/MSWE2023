from flask import render_template, request, redirect, url_for
from __main__ import app
from dbconfig import CONFIG
import mysql.connector

@app.route("/find_courses_from_students_form")
def find_courses_from_students_form():
  students = []
  try:
    cnx = mysql.connector.connect(**CONFIG)
    cursor = cnx.cursor()
    query = ("SELECT student_id, first_name, last_name "
             "FROM students")
    cursor.execute(query)
    for (student_id, first_name, last_name) in cursor:
      students.append([student_id, first_name, last_name])
    cursor.close()
  except mysql.connector.Error as err:
    return redirect(url_for("find_courses_from_students_form", result_message=str(err)))
  else:
    cnx.close()
  return render_template('find_courses_from_students_form.html', students=students, result_message=request.args.get('result_message'))

@app.route("/find_courses_from_students", methods=['GET'])
def find_courses_from_students():
  student = []
  courses = []
  try:
    student_id = int(request.args.get('student_id'))
  except Exception as ex:
    return redirect(url_for("find_courses_from_students_form", result_message=str(ex)))
  try:
    cnx = mysql.connector.connect(**CONFIG)
    cursor = cnx.cursor()
    query = ("SELECT student_id, first_name, last_name "
             "FROM students WHERE student_id = %s")
    cursor.execute(query, (student_id,))
    for (student_id, first_name, last_name) in cursor:
      student.append({"student_id": student_id, "first_name": first_name, "last_name": last_name})
    query = ("SELECT c.course_id, course_name, course_day_time "
             "FROM students s JOIN students_courses sc ON s.student_id = sc.student_id "
             "JOIN courses c ON sc.course_id = c.course_id "
             "WHERE s.student_id = %s")
    cursor.execute(query, (student_id,))
    for (course_id, course_name, course_day_time) in cursor:
      courses.append({"course_id": course_id, "course_name": course_name, "course_day_time": course_day_time})
    cursor.close()
  except mysql.connector.Error as err:
    return redirect(url_for("find_courses_from_students_form", result_message=str(err)))
  else:
    cnx.close()
  if len(student) == 0:
    return redirect(url_for("find_courses_from_students_form", result_message="Student not found"))
  return student + courses
