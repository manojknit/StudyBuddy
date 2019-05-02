package msse.com.studybuddyapp;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
//import org.mockito.runners.MockitoJUnitRunner;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import okhttp3.mockwebserver.MockWebServer;

import static org.junit.Assert.*;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
//@RunWith(MockitoJUnitRunner.class)
public class ExampleUnitTest {
    @Rule
    public final MockWebServer server = new MockWebServer();
    MlabConfig mlabConfig = new MlabConfig();
    @Test
    public void testfetchCourses() throws Exception {
        URL url = server.url(mlabConfig.getAllCoursesFetchURL()).url();
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("Accept-Language", "en-US");
        InputStream in = connection.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        assertEquals(HttpURLConnection.HTTP_OK, connection.getResponseCode());
    }

    @Test
    public void testfetchVideos() throws Exception {
        URL url = server.url(mlabConfig.getVidoesFetchURL()).url();
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("Accept-Language", "en-US");
        InputStream in = connection.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        assertEquals(HttpURLConnection.HTTP_OK, connection.getResponseCode());
    }
    @Test
    public void testvalidApiKey() throws Exception {
        URL url = server.url(mlabConfig.getQuerywithvalidApiKey()).url();
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("Accept-Language", "en-US");
        InputStream in = connection.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        assertEquals(HttpURLConnection.HTTP_OK, connection.getResponseCode());
    }



}