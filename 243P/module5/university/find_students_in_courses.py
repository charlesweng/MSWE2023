from flask import render_template, request, redirect, url_for
from __main__ import app
from dbconfig import CONFIG
import mysql.connector

@app.route("/find_students_in_course_form")
def find_students_in_course_form():
  courses = []
  try:
    cnx = mysql.connector.connect(**CONFIG)
    cursor = cnx.cursor()
    query = ("SELECT course_id, course_name, course_day_time "
             "FROM courses")
    cursor.execute(query)
    for (course_id, course_name, course_day_time) in cursor:
      courses.append([course_id, course_name, course_day_time])
    cursor.close()
  except mysql.connector.Error as err:
    return redirect(url_for("find_students_in_course_form", result_message=str(err)))
  else:
    cnx.close()
  return render_template('find_students_in_course_form.html', courses=courses, result_message=request.args.get('result_message'))

@app.route("/find_students_in_course", methods=['GET'])
def find_students_in_course():
  course = []
  students = []
  try:
    course_id = int(request.args.get('course_id'))
  except Exception as ex:
    return redirect(url_for("find_students_in_course_form", result_message=str(ex)))
  try:
    cnx = mysql.connector.connect(**CONFIG)
    cursor = cnx.cursor()
    query = ("SELECT course_id, course_name "
             "FROM courses WHERE course_id = %s")
    cursor.execute(query, (course_id,))
    for (course_id, course_name) in cursor:
      course.append({"course_id": course_id, "course_name": course_name})
    query = ("SELECT s.student_id, first_name, last_name "
             "FROM students s JOIN students_courses sc ON s.student_id = sc.student_id "
             "JOIN courses c ON sc.course_id = c.course_id "
             "WHERE c.course_id = %s")
    cursor.execute(query, (course_id,))
    for (student_id, first_name, last_name) in cursor:
      students.append({"student_id": student_id, "first_name": first_name, "last_name": last_name})
    cursor.close()
  except mysql.connector.Error as err:
    return redirect(url_for("find_students_in_course_form", result_message=str(err)))
  else:
    cnx.close()
  if len(course) == 0:
    return redirect(url_for("find_students_in_course_form", result_message="Course not found"))
  return render_template('students_in_course.html', courses=course, students=students)
