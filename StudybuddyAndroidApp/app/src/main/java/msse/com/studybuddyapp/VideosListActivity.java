package msse.com.studybuddyapp;

import android.content.Context;
import android.content.Intent;
import android.graphics.Movie;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import msse.com.studybuddyapp.adapter.MyVideosAdapter;
import msse.com.studybuddyapp.adapter.MycoursesAdapter;
import msse.com.studybuddyapp.apiasynctasks.FetchVideosTask;
import msse.com.studybuddyapp.listener.RecyclerTouchListener;
import msse.com.studybuddyapp.model.Course;
import msse.com.studybuddyapp.model.Video;

public class VideosListActivity extends AppCompatActivity {
    private List<Video> videoList = new ArrayList<>();
    private RecyclerView videorecyclerView;
    private MyVideosAdapter vAdapter;
    private ProgressBar progressBar;
    private ImageView checkImage;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_videos_list);
      //  Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
       // setSupportActionBar(toolbar);


        videorecyclerView = (RecyclerView) findViewById(R.id.vrecycler_view);
        videoList = new ArrayList<Video>();
        fetchVideos();
      //  vAdapter = new MyVideosAdapter(videoList);
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(getApplicationContext());
        videorecyclerView.setLayoutManager(mLayoutManager);
        videorecyclerView.setItemAnimator(new DefaultItemAnimator());
        videorecyclerView.setAdapter(vAdapter);
       // prepareVideoData();
        videorecyclerView.addOnItemTouchListener(new RecyclerTouchListener(getApplicationContext(), videorecyclerView, new RecyclerTouchListener.ClickListener() {
            @Override
            public void onClick(View view, int position) {
                progressBar =  view.findViewById(R.id.progressBar_item);
                checkImage = view.findViewById(R.id.checkMarkImgview);
                checkImage.setVisibility(View.VISIBLE);
                Video v = videoList.get(position);

                Toast.makeText(getApplicationContext(), v.getVideoTitle() + " is selected!", Toast.LENGTH_SHORT).show();
                String videoUrl = VideoPlayerConfig.getDefaultVideoUrl() + v.getVideoTitle().split("\\.")[0] +".m3u8";
                Log.d("videourl",videoUrl);
                Intent mIntent = ExoPlayerActivity.getStartIntent(getApplicationContext(), videoUrl);
                startActivity(mIntent);
                progressBar.setProgress(progressBar.getProgress() + 20);
            }

            @Override
            public void onLongClick(View view, int position) {

            }
        }));

    }
  /*  public static Intent getStartIntent(Context context) {
        Intent intent = new Intent(context, VideosListActivity.class);
        //intent.putExtra(KEY_VIDEO_URI, videoUri);
        return intent;
    } */

    private void prepareVideoData() {
        Video video = new Video("Mad Max: Fury Road", "Action & Adventure", "Action & Adventure");
        videoList.add(video);

        video = new Video("Inside Out", "Animation, Kids & Family", "Animation, Kids & Family");
        videoList.add(video);

        video = new Video("Star Wars: Episode VII - The Force Awakens", "Action", "Star Wars: Episode VII - The Force Awakens");
        videoList.add(video);

        video = new Video("Shaun the Sheep", "Animation", "Shaun the Sheep");
        videoList.add(video);

        video = new Video("The Martian", "Science Fiction & Fantasy", "The Martian");
        videoList.add(video);

        video = new Video("Mission: Impossible Rogue Nation", "Action", "Mission: Impossible Rogue Nation");
        videoList.add(video);

        video = new Video("Up", "Animation", "Up");
        videoList.add(video);

        video = new Video("Star Trek", "Science Fiction", "Star Trek");
        videoList.add(video);



        vAdapter.notifyDataSetChanged();
    }

    public void fetchVideos(){
        FetchVideosTask fetchVideosTask = new FetchVideosTask();
        List<Integer> videothumnails = new ArrayList<Integer>();
        videothumnails.add(R.drawable.course_img9);
        videothumnails.add(R.drawable.course_img10);
        videothumnails.add(R.drawable.course_img18);
        videothumnails.add(R.drawable.course_img4);
        videothumnails.add(R.drawable.course_img5);

        List<String> videoTitlelist = new ArrayList<String>();
        videoTitlelist.add("Features of Single Page Apps");
        videoTitlelist.add("Examine a Framework's Source");
        videoTitlelist.add("Introduction to Angular");
        videoTitlelist.add("Routing");
        videoTitlelist.add("Optimizations");
        List<String>  videoDescription = new ArrayList<String>();
        videoDescription.add("The advantages of the single page application is presented in the video ");
        videoDescription.add("Learn to build a Single Page Application ");
        videoDescription.add("Components are basically classes that interact with the .html file of the component, which gets displayed on the browser.");
        videoDescription.add("Routing basically means navigating between pages. You have seen many sites with links that direct you to a new page. ");
        videoDescription.add("Materials offer a lot of built-in modules for your project. Features such as autocomplete, datepicker, slider, menus, grids, and toolbar are available for use with materials in Angular");

        try {
            videoList = fetchVideosTask.execute().get();
          /*  MyContact FetchedData = (MyContact) returnValues.toArray()[0];

            editText_fname.setText(FetchedData.getFirst_name());
            editText_lname.setText(FetchedData.getLast_name());
            editText_phonenumber.setText(FetchedData.getPhone_nubmer());
            */
            Log.d("log fetch value", videoList.toString() + videoList.size() );
            Toast.makeText(this, "Fetched from MongoDB!!", Toast.LENGTH_SHORT).show();
            vAdapter = new MyVideosAdapter(this, videoList, videothumnails, videoTitlelist, videoDescription);
            vAdapter.notifyDataSetChanged();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}

