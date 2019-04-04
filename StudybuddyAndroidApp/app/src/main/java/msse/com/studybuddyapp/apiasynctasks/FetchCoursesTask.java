package msse.com.studybuddyapp.apiasynctasks;

import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

import msse.com.studybuddyapp.MlabConfig;
import msse.com.studybuddyapp.R;
import msse.com.studybuddyapp.model.Course;

public class FetchCoursesTask extends AsyncTask<Course, Void, ArrayList<Course>> {
    static String server_output = null;
    static String temp_output = null;


    @Override
    protected ArrayList<Course> doInBackground(Course... objects) {

        ArrayList<Course> courseList = new ArrayList<Course>();




            URL url = null;

                MlabConfig ml = new MlabConfig();
        try {
            Log.d("urls ", ml.getCoursesFetchURL());
          //  url = new URL("https://api.mlab.com/api/1/databases/studybuddydb/collections/course?q={%22user_name%22:%20%22manoj.kumar@sjsu.edu%22}&apiKey=duEozg9yLd3XprCPPvh1zzOfRddpTcRM");
            url = new URL(ml.getCoursesFetchURL());
            HttpURLConnection conn = (HttpURLConnection) url
                    .openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream())));

            while ((temp_output = br.readLine()) != null) {
                server_output = temp_output;
            }

            JSONArray jsonArray = new JSONArray(server_output);
            for(int i=0; i < jsonArray.length(); i++) {
                JSONObject jsonobject = jsonArray.getJSONObject(i);
                String id       = jsonobject.getJSONObject("_id").getString("$oid");
                String title    = jsonobject.getString("course_title");
                String courseDesc  = jsonobject.getString("course_desc");
                String category = jsonobject.getString("category");
                Log.d("course id",id);
                Log.d("course name",title);
                Log.d("course desc",category);
                Course temp = new Course();
                temp.setCourse_id(id);

                temp.setCourse_name(title);
                temp.setAuthor(courseDesc);
                temp.setThumbnail(R.drawable.mobile_development);
                courseList.add(temp);
            }
          //  JSONObject jsonobject = reader.getJSONObject(0);
         //   JSONObject course_id =  jsonobject.getJSONObject("_id");




/*
            // create a basic db list
            String mongoarray;
            mongoarray = "{ DB_output: "+server_output+"}";
            Log.d("mongo",mongoarray +"");
            Object o = JSON.parse(mongoarray);


            DBObject dbObj = (DBObject) o;
            BasicDBList contacts = (BasicDBList) dbObj.get("DB_output");
            for (Object obj : contacts) {
                DBObject userObj = (DBObject) obj;

                Course temp = new Course();
                JSONObject subObj = (JSONObject) userObj.get("_id");
                temp.setCourse_id(subObj.get("$oid").toString());
                temp.setCourse_name(userObj.get("course_title").toString());
                temp.setCourse_desc(userObj.get("course_desc").toString());
                courseList.add(temp);

            } */



        }

        catch (MalformedURLException e ) {
            e.printStackTrace();
        }

        catch(IOException i) {
            i.printStackTrace();
        }

        catch(Exception e) {
            e.printStackTrace();
        }

        return courseList;
    }
}
