package msse.com.studybuddyapp;

public class VideoPlayerConfig {
    //Minimum Video you want to buffer while Playing
    public static final int MIN_BUFFER_DURATION = 500;
    //Max Video you want to buffer during PlayBack
    public static final int MAX_BUFFER_DURATION = 1000;
    //Min Video you want to buffer before start Playing it
    public static final int MIN_PLAYBACK_START_BUFFER = 500;
    //Min video You want to buffer when user resumes video
    public static final int MIN_PLAYBACK_RESUME_BUFFER = 1000;

    public static String getDefaultVideoUrl() {
        return DEFAULT_VIDEO_URL;
    }

    // public static final String DEFAULT_VIDEO_URL = "https://androidwave.com/media/androidwave-video-3.mp4";
   public static final String DEFAULT_VIDEO_URL = "https://didxxojhwcpu7.cloudfront.net/outputfiles/hls/";
}
