package msse.com.studybuddyapp.model;

public class Video {
    public String courseId;
    public String videoId;
    public String videoTitle;
    public String videoFileName;

    public Video() {
    }
    public Video(String courseId, String videoId, String videoTitle) {
        this.courseId = courseId;
        this.videoId = videoId;
        this.videoTitle = videoTitle;

    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public String getVideoTitle() {
        return videoTitle;
    }

    public void setVideoTitle(String videoTitle) {
        this.videoTitle = videoTitle;
    }

    public String getVideoFileName() {
        return videoFileName;
    }

    public void setVideoFileName(String videoFileName) {
        this.videoFileName = videoFileName;
    }

    @Override
    public String toString() {
        return "Video{" +
                "courseId='" + courseId + '\'' +
                ", videoId='" + videoId + '\'' +
                ", videoTitle='" + videoTitle + '\'' +
                ", videoFileName='" + videoFileName + '\'' +
                '}';
    }

}
