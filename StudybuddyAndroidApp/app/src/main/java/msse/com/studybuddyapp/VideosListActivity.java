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
import java.util.ArrayList;
import java.util.List;

import msse.com.studybuddyapp.adapter.MyVideosAdapter;
import msse.com.studybuddyapp.model.Video;

public class VideosListActivity extends AppCompatActivity {
    private List<Video> videoList = new ArrayList<>();
    private RecyclerView videorecyclerView;
    private MyVideosAdapter vAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_videos_list);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        videorecyclerView = (RecyclerView) findViewById(R.id.vrecycler_view);

        vAdapter = new MyVideosAdapter(videoList);
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(getApplicationContext());
        videorecyclerView.setLayoutManager(mLayoutManager);
        videorecyclerView.setItemAnimator(new DefaultItemAnimator());
        videorecyclerView.setAdapter(vAdapter);

        prepareVideoData();
    }
    public static Intent getStartIntent(Context context) {
        Intent intent = new Intent(context, VideosListActivity.class);
        //intent.putExtra(KEY_VIDEO_URI, videoUri);
        return intent;
    }

    private void prepareVideoData() {
        Video video = new Video("Mad Max: Fury Road", "Action & Adventure", "2015");
        videoList.add(video);

        video = new Video("Inside Out", "Animation, Kids & Family", "2015");
        videoList.add(video);

        video = new Video("Star Wars: Episode VII - The Force Awakens", "Action", "2015");
        videoList.add(video);

        video = new Video("Shaun the Sheep", "Animation", "2015");
        videoList.add(video);

        video = new Video("The Martian", "Science Fiction & Fantasy", "2015");
        videoList.add(video);

        video = new Video("Mission: Impossible Rogue Nation", "Action", "2015");
        videoList.add(video);

        video = new Video("Up", "Animation", "2009");
        videoList.add(video);

        video = new Video("Star Trek", "Science Fiction", "2009");
        videoList.add(video);



        vAdapter.notifyDataSetChanged();
    }
}

