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
        return "?q={'user_name':'shalini.narang@sjsu.edu'}&";
    }

    public String getAdminUsernamequery() {
        return "?q={'user_name':'Admin-User'}&";
    }

    public String getCourseidquery() {
        return "?q={'CourseId':'5cbf625a4d689136b4bc39f6'}&";
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
    public String getAllCoursesFetchURL()
    {
        return getBaseUrl()+getCoursecollectionName()+ getAdminUsernamequery() + apiKeyUrl();
    }

    public String getVidoesFetchURL()
    {
        return getBaseUrl()+getVideocollectionName()+ getCourseidquery() + apiKeyUrl();
    }

    public String getQuerywithvalidApiKey() {

        return getBaseUrl() + "?" + apiKeyUrl();
    }

    public String getQuerywithinvalidApiKey() {

        return getBaseUrl() + "?" + "apiKey=yourapi";
    }


   /* public String createContact(Course course) {
        return String
                .format("{\"first_name\": \"%s\", "
                                + "\"last_name\": \"%s\", " + "\"phone\": \"%s\"}",
                        contact.getFirst_name(), contact.getLast_name(), contact.getPhone_nubmer());
    } */
}