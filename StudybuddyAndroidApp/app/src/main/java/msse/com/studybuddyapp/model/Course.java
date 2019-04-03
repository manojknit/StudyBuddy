package msse.com.studybuddyapp.model;

public class Course {

    private String course_name;
    private String author;
    private int thumbnail;
    private int course_id;


    public Course() {
    }

    public Course(String course_name, String author, int thumbnail) {
        this.course_name = course_name;
        this.author = author;
        this.thumbnail = thumbnail;
       // this.course_id = course_id;
    }



    public int getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(int thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getCourse_name() {
        return course_name;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }
}
