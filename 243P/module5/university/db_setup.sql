CREATE DATABASE university;
USE university;

DROP TABLE IF EXISTS students_courses;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;

CREATE TABLE IF NOT EXISTS students (
student_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
course_id INT PRIMARY KEY AUTO_INCREMENT,
course_name VARCHAR(50) NOT NULL,
course_day_time VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS students_courses (
student_id INT NOT NULL,
course_id INT NOT NULL,
CONSTRAINT students_courses_fk_students
FOREIGN KEY (student_id)
REFERENCES students (student_id),
CONSTRAINT students_courses_fk_courses
FOREIGN KEY (course_id)
REFERENCES courses (course_id)
);

SELECT * FROM students;