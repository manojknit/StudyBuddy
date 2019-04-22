package msse.com.studybuddyapp.model;

public class Course {

    private String course_name;
    private String author;
    private int thumbnail;
    private String course_id;
    private String course_desc;
    private  int course_rating;
    private String course_instruction;
    private String course_category;
    private String short_text;


    public Course() {
    }

    public Course(String course_name, String author, int thumbnail) {
        this.course_name = course_name;
        this.author = author;
        this.thumbnail = thumbnail;
        // this.course_id = course_id;
    }

    public Course(String course_name, String author, int thumbnail, String course_id, String course_desc, int course_rating, String course_instruction, String course_category, String short_text) {
        this.course_name = course_name;
        this.author = author;
        this.thumbnail = thumbnail;
        this.course_id = course_id;
        this.course_desc = course_desc;
        this.course_rating = course_rating;
        this.course_instruction = course_instruction;
        this.course_category = course_category;
        this.short_text = short_text;
    }


    public String getCourse_desc() {
        return course_desc;
    }

    public void setCourse_desc(String course_desc) {
        this.course_desc = course_desc;
    }

    public int getCourse_rating() {
        return course_rating;
    }

    public void setCourse_rating(int course_rating) {
        this.course_rating = course_rating;
    }

    public String getCourse_instruction() {
        return course_instruction;
    }

    public void setCourse_instruction(String course_instruction) {
        this.course_instruction = course_instruction;
    }

    public String getCourse_category() {
        return course_category;
    }

    public void setCourse_category(String course_category) {
        this.course_category = course_category;
    }

    public String getShort_text() {
        return short_text;
    }

    public void setShort_text(String short_text) {
        this.short_text = short_text;
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

    public String getCourse_id() {
        return course_id;
    }

    public void setCourse_id(String course_id) {
        this.course_id = course_id;
    }

    @Override
    public String toString() {
        return "Course{" +
                "course_name='" + course_name + '\'' +
                ", author='" + author + '\'' +
                ", thumbnail=" + thumbnail +
                ", course_id=" + course_id +
                ", course_desc='" + course_desc + '\'' +
                ", course_rating=" + course_rating +
                ", course_instruction='" + course_instruction + '\'' +
                ", course_category='" + course_category + '\'' +
                ", short_text='" + short_text + '\'' +
                '}';
    }
}
