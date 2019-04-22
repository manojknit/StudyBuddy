package msse.com.studybuddyapp;

import msse.com.studybuddyapp.model.Course;

public class MlabConfig {
    public String getDatabaseName() {
        return "studybuddydb";
    }

    public String getApiKey() {
        return "APIKEY";
    }

    public String getUsernamequery() {
        return "?q={'user_name':'manoj.kumar@sjsu.edu'}&";
    }

    public String getCourseidquery() {
        return "?q={'CourseId':'5c99cc9a8de74e484508cf09'}&";
    }

    public String getBaseUrl()
    {
        return "https://api.mlab.com/api/1/databases/"+getDatabaseName()+"/collections/";
    }

    public String apiKeyUrl()
    {
        return "apiKey="+getApiKey();
    }

    public String getCoursecollectionName()
    {
        return "course";
    }

    public String getVideocollectionName()
    {
        return "video";
    }

   /* public String buildContactsSaveURL()
    {
        return getBaseUrl()+getCoursecollectionName()+apiKeyUrl();
    } */

    public String getCoursesFetchURL()
    {
        return getBaseUrl()+getCoursecollectionName()+ getUsernamequery() + apiKeyUrl();
    }

    public String getVidoesFetchURL()
    {
        return getBaseUrl()+getVideocollectionName()+ getCourseidquery() + apiKeyUrl();
    }

   /* public String createContact(Course course) {
        return String
                .format("{\"first_name\": \"%s\", "
                                + "\"last_name\": \"%s\", " + "\"phone\": \"%s\"}",
                        contact.getFirst_name(), contact.getLast_name(), contact.getPhone_nubmer());
    } */
}