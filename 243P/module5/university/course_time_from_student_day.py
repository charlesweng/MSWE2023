from flask import render_template, request, redirect, url_for
from __main__ import app
from dbconfig import CONFIG
import mysql.connector

@app.route("/course_time_from_student_day_form")
def course_time_from_student_day_form():
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
    return redirect(url_for("course_time_from_student_day_form", result_message=str(err)))
  else:
    cnx.close()
  return render_template('course_time_from_student_day_form.html', students=students, courses=courses, result_message=request.args.get('result_message'))

@app.route("/course_time_from_student_day", methods=['GET'])
def course_time_from_student_day():
  student = []
  courses = []
  try:
    student_id = int(request.args.get('student_id'))
    day = str(request.args.get('day'))
  except Exception as ex:
    return redirect(url_for("course_time_from_student_day_form", result_message=str(ex)))
  try:
    cnx = mysql.connector.connect(**CONFIG)
    cursor = cnx.cursor()
    query = ("SELECT student_id, first_name, last_name "
             "FROM students WHERE student_id = %s")
    cursor.execute(query, (student_id,))
    for (student_id, first_name, last_name) in cursor:
      student.append({"student_id": student_id, "first_name": first_name, "last_name": last_name, "day": day})
    query = ("SELECT c.course_id, course_name, course_day_time "
             "FROM students s JOIN students_courses sc ON s.student_id = sc.student_id "
             "JOIN courses c ON sc.course_id = c.course_id "
             "WHERE s.student_id = %s AND c.course_day_time LIKE %s")
    cursor.execute(query, (student_id, '%'+day+'%'))
    for (course_id, course_name, course_day_time) in cursor:
      courses.append({"course_id": course_id, "course_name": course_name, "course_day_time": course_day_time})
    cursor.close()
  except mysql.connector.Error as err:
    return redirect(url_for("course_time_from_student_day_form", result_message=str(err)))
  else:
    cnx.close()
  if len(student) == 0:
    return redirect(url_for("course_time_from_student_day_form", result_message="Student not found"))
  return render_template('course_time_from_student_day.html', student=student, courses=courses)
