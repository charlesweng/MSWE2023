from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
  return render_template('index.html')

import enroll_student
import introduce_course
import enroll_course
import find_students_in_courses
import find_courses_from_students

if __name__ == "__main__":
  app.run()
