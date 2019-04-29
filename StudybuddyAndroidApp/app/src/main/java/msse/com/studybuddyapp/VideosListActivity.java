package msse.com.studybuddyapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Movie;
import android.preference.PreferenceManager;
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
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import msse.com.studybuddyapp.adapter.MyVideosAdapter;
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
    private List<Integer> percentList = new ArrayList<>();
    private int percent =0;
    private int lasttouched = 0;
    public static final String MyPREFERENCES = "MyPrefs" ;
    SharedPreferences sharedpreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_videos_list);

        videorecyclerView = (RecyclerView) findViewById(R.id.vrecycler_view);
        videoList = new ArrayList<Video>();
        fetchVideos();
        sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);

      //  vAdapter = new MyVideosAdapter(videoList);
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(getApplicationContext());
        videorecyclerView.setLayoutManager(mLayoutManager);
        videorecyclerView.setItemAnimator(new DefaultItemAnimator());
        videorecyclerView.setAdapter(vAdapter);
       // final SharedPreferences prefs = PreferenceManager.get(this);
       // prepareVideoData();
        videorecyclerView.addOnItemTouchListener(new RecyclerTouchListener(getApplicationContext(), videorecyclerView, new RecyclerTouchListener.ClickListener() {
            @Override
            public void onClick(View view, int position) {
                progressBar =  view.findViewById(R.id.progressBar_item);
                checkImage = view.findViewById(R.id.checkMarkImgview);
                checkImage.setVisibility(View.VISIBLE);
                Video v = videoList.get(position);
                String videoUrl = VideoPlayerConfig.getDefaultVideoUrl() + v.getVideoFileName().split("\\.")[0] +".m3u8";
                Toast.makeText(getApplicationContext(), v.getVideoTitle() + " is selected!", Toast.LENGTH_SHORT).show();
                //progressBar.setProgress(progressBar.getProgress() + percent);
                lasttouched = position;
                Log.d("percentage", "position " + String.valueOf(lasttouched) + " value " + sharedpreferences.getInt(Integer.toString(lasttouched),0));
                Log.d("percentage" , "percent fr that position" + sharedpreferences.getInt(String.valueOf(lasttouched),0));
                Log.d("videourlssssss",videoUrl);
                Intent mIntent = ExoPlayerActivity.getStartIntent(getApplicationContext(), videoUrl);
                startActivityForResult(mIntent, 100);

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
        videothumnails.add(R.drawable.course_img7);
        videothumnails.add(R.drawable.course_img3);
        videothumnails.add(R.drawable.course_img16);
        videothumnails.add(R.drawable.course_img4);
        videothumnails.add(R.drawable.course_img5);

        List<String> videoTitlelist = new ArrayList<String>();
        videoTitlelist.add("Life Cycle Events");
        videoTitlelist.add("Android Services");
        videoTitlelist.add("Introduction to Android");
        videoTitlelist.add("Intents");
        videoTitlelist.add("Optimizations");
        List<String>  videoDescription = new ArrayList<String>();
        videoDescription.add("  ");
        videoDescription.add(" ");
        videoDescription.add("Components are basically classes that interact with the .html file of the component, which gets displayed on the browser.");
        videoDescription.add("Routing basically means navigating between pages. You have seen many sites with links that direct you to a new page. ");
        videoDescription.add("Materials offer a lot of built-in modules for your project. Features such as autocomplete, datepicker, slider, menus, grids, and toolbar are available for use with materials in Angular");
        percentList.add(0,0);
        percentList.add(1,0);
        percentList.add(2,0);
        percentList.add(3,0);
        percentList.add(4,0);
        try {
            videoList = fetchVideosTask.execute().get();
          /*  MyContact FetchedData = (MyContact) returnValues.toArray()[0];

            editText_fname.setText(FetchedData.getFirst_name());
            editText_lname.setText(FetchedData.getLast_name());
            editText_phonenumber.setText(FetchedData.getPhone_nubmer());
            */
            Log.d("log fetch value", videoList.toString() + videoList.size() );
            Toast.makeText(this, "Fetched from MongoDB!!", Toast.LENGTH_SHORT).show();
            vAdapter = new MyVideosAdapter(this, videoList, videothumnails, videoTitlelist, videoDescription,percentList);
            vAdapter.notifyDataSetChanged();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Check that it is the SecondActivity with an OK result
        if (requestCode == 100) {
            if (resultCode == RESULT_OK) {

                // Get String data from Intent
                 percent = data.getIntExtra("percent",0);
                 Log.d("percentage", "percent from activtiy" + percent);
                 percentList.set(lasttouched, percent);

                final SharedPreferences.Editor editor = sharedpreferences.edit();
                editor.putInt(String.valueOf(lasttouched), percent);
                editor.commit();
                 vAdapter.notifyDataSetChanged();
                //Toast.makeText(this, "percent postiton watched" +percent     , Toast.LENGTH_SHORT).show();
            }
        }
    }
}

