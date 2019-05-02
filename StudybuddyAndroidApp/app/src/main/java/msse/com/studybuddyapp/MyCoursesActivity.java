package msse.com.studybuddyapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import msse.com.studybuddyapp.adapter.AvailablecoursesAdapter;
import msse.com.studybuddyapp.adapter.MyCoursesAdapter;
import msse.com.studybuddyapp.adapter.MyVideosAdapter;
import msse.com.studybuddyapp.apiasynctasks.FetchCoursesTask;
import msse.com.studybuddyapp.listener.RecyclerTouchListener;
import msse.com.studybuddyapp.model.Course;

public class MyCoursesActivity extends AppCompatActivity {
    private RecyclerView courserecyclerView;
    private MyCoursesAdapter cAdapter;
    private List<Course> courseList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_courses);
        courserecyclerView = (RecyclerView) findViewById(R.id.cour_recycler_view);
        courseList = new ArrayList<Course>();
        fetchCourse();
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(getApplicationContext());
        courserecyclerView.setLayoutManager(mLayoutManager);
        courserecyclerView.setItemAnimator(new DefaultItemAnimator());
        courserecyclerView.setAdapter(cAdapter);
        // prepareVideoData();
        courserecyclerView.addOnItemTouchListener(new RecyclerTouchListener(getApplicationContext(), courserecyclerView, new RecyclerTouchListener.ClickListener() {
            @Override
            public void onClick(View view, int position) {

                Course course = courseList.get(position);
              //  Toast.makeText(getApplicationContext(), course.getCourse_name() + " is selected!", Toast.LENGTH_SHORT).show();
               // Toast.makeText(getApplicationContext(),  course.getCourse_id() + " is course id",  Toast.LENGTH_SHORT).show();
                //     Intent mIntent = ExoPlayerActivity.getStartIntent(getApplicationContext(), VideoPlayerConfig.DEFAULT_VIDEO_URL);
                //  startActivity(mIntent);
                Intent intent = new Intent(getApplicationContext(), VideosListActivity.class);
                startActivity(intent);
            }

            @Override
            public void onLongClick(View view, int position) {

            }
        }));

    }
    public void fetchCourse(){
    FetchCoursesTask fetchCoursesTask = new FetchCoursesTask();
    MlabConfig mlabConfig = new MlabConfig();
        try {
        courseList = fetchCoursesTask.execute("https://api.mlab.com/api/1/databases/studybuddydb/collections/course?q={'course_title':'Android'}&apiKey=Apikey").get();
          /*  MyContact FetchedData = (MyContact) returnValues.toArray()[0];

            editText_fname.setText(FetchedData.getFirst_name());
            editText_lname.setText(FetchedData.getLast_name());
            editText_phonenumber.setText(FetchedData.getPhone_nubmer());
            */
        Log.d("log fetch value", courseList.toString() + courseList.size() );
        //Toast.makeText(this, "Fetched from MongoDB!!", Toast.LENGTH_SHORT).show();
        cAdapter = new MyCoursesAdapter(this, courseList);
        cAdapter.notifyDataSetChanged();
    } catch (InterruptedException e) {
        e.printStackTrace();
    } catch (ExecutionException e) {
        e.printStackTrace();
    }

}
}
