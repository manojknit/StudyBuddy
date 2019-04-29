package msse.com.studybuddyapp;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.AppCompatDelegate;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.DefaultLoadControl;
import com.google.android.exoplayer2.DefaultRenderersFactory;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.LoadControl;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.Timeline;
import com.google.android.exoplayer2.extractor.ts.DefaultTsPayloadReaderFactory;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.source.hls.DefaultHlsExtractorFactory;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.trackselection.AdaptiveTrackSelection;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelection;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
import com.google.android.exoplayer2.trackselection.TrackSelector;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.upstream.BandwidthMeter;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultAllocator;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Util;

import java.util.concurrent.TimeUnit;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class ExoPlayerActivity extends AppCompatActivity implements Player.EventListener {
    private static final String TAG = "ExoPlayerActivity";

    private static final String KEY_VIDEO_URI = "video_uri";
    private static final String KEY_VIDEO_POS = "video_pos";
    private boolean durationSet = false;
    public long total_seconds, watch_seconds;
    public int percentwatched;
    @BindView(R.id.videoFullScreenPlayer)
    PlayerView videoFullScreenPlayer;
    @BindView(R.id.spinnerVideoDetails)
    ProgressBar spinnerVideoDetails;
    @BindView(R.id.imageViewExit)
    ImageView imageViewExit;

    String videoUri;
    int video_position;
    SimpleExoPlayer player;
    Handler mHandler;
    Runnable mRunnable;
    long total_duration;
    boolean haveStartPosition;
    public static Intent getStartIntent(Context context, String videoUri, int position) {
        Intent intent = new Intent(context, ExoPlayerActivity.class);
        intent.putExtra(KEY_VIDEO_URI, videoUri);
        intent.putExtra(KEY_VIDEO_POS, position);
        return intent;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_exo_player);
        ButterKnife.bind(this);
        AppCompatDelegate.setCompatVectorFromResourcesEnabled(true);
        getSupportActionBar().hide();

        if (getIntent().hasExtra(KEY_VIDEO_URI)) {
           videoUri = getIntent().getStringExtra(KEY_VIDEO_URI);

           // videoUri=  "https://didxxojhwcpu7.cloudfront.net/outputfiles/hls/AndroidLecture1.m3u8";
        }
        if (getIntent().hasExtra(KEY_VIDEO_POS)) {
            video_position = getIntent().getIntExtra(KEY_VIDEO_POS,0);

        }
        Log.d("exo player postion"," " + " inside create");
        setUp();
        haveStartPosition = false;
    }

    private void setUp() {
        Log.d("exo player postion"," " + " inside setup");
        initializePlayer();
        player.seekToDefaultPosition();
        if (videoUri == null) {
            return;
        }
        buildMediaSource(Uri.parse(videoUri));
    }

    @OnClick(R.id.imageViewExit)
    public void onViewClicked() {
        Intent intent = new Intent();
        intent.putExtra("percent", percentwatched);
        setResult(RESULT_OK, intent);
        finish();
    }

    private void initializePlayer() {
        if (player == null) {
            // 1. Create a default TrackSelector
            LoadControl loadControl = new DefaultLoadControl(
                    new DefaultAllocator(true, 16),
                    VideoPlayerConfig.MIN_BUFFER_DURATION,
                    VideoPlayerConfig.MAX_BUFFER_DURATION,
                    VideoPlayerConfig.MIN_PLAYBACK_START_BUFFER,
                    VideoPlayerConfig.MIN_PLAYBACK_RESUME_BUFFER, -1, true);

            BandwidthMeter bandwidthMeter = new DefaultBandwidthMeter();
            TrackSelection.Factory videoTrackSelectionFactory =
                    new AdaptiveTrackSelection.Factory(bandwidthMeter);
            TrackSelector trackSelector =
                    new DefaultTrackSelector(videoTrackSelectionFactory);
            // 2. Create the player
            player = ExoPlayerFactory.newSimpleInstance(getApplicationContext(), trackSelector, loadControl);
            videoFullScreenPlayer.setPlayer(player);
        }


    }

    private void buildMediaSource(Uri mUri) {
        // Measures bandwidth during playback. Can be null if not required.
        DefaultBandwidthMeter bandwidthMeter = new DefaultBandwidthMeter();
        // Produces DataSource instances through which media data is loaded.
        DataSource.Factory dataSourceFactory = new DefaultDataSourceFactory(this,
                Util.getUserAgent(this, getString(R.string.app_name)), bandwidthMeter);
        DefaultHlsExtractorFactory defaultHlsExtractorFactory = new DefaultHlsExtractorFactory();
        // This is the MediaSource representing the media to be played.
      //  MediaSource videoSource = new ExtractorMediaSource.Factory(dataSourceFactory)
    //            .createMediaSource(mUri);
        MediaSource videoSource = new HlsMediaSource.Factory(dataSourceFactory).setExtractorFactory(defaultHlsExtractorFactory).createMediaSource(mUri);
        // Prepare the player with the source.

      //  boolean haveStartPosition = video_position != C.INDEX_UNSET;

        player.prepare(videoSource);
        player.setPlayWhenReady(true);
        player.addListener(this);


    }

    private void releasePlayer() {
        Log.d("exo player postion"," " + player.getContentPosition());
        if (player != null) {
            player.release();
            player = null;
        }
    }

    private void pausePlayer() {
        Log.d("exo player postion"," " + " inside pause player");

        if (player != null) {
            player.setPlayWhenReady(false);
            player.getPlaybackState();
        }
    }

    private void resumePlayer() {
        Log.d("exo player postion"," " + " inside resume player");
        if (player != null) {
            player.setPlayWhenReady(true);
            player.getPlaybackState();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();

        pausePlayer();
        if (mRunnable != null) {
            mHandler.removeCallbacks(mRunnable);
        }
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        resumePlayer();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        releasePlayer();
    }

    @Override
    public void onTimelineChanged(Timeline timeline, Object manifest, int reason) {

    }

    @Override
    public void onTracksChanged(TrackGroupArray trackGroups, TrackSelectionArray trackSelections) {

    }

    @Override
    public void onLoadingChanged(boolean isLoading) {

    }


    @Override
    public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
        switch (playbackState) {

            case Player.STATE_BUFFERING:
                spinnerVideoDetails.setVisibility(View.VISIBLE);

               // player.seekTo(5 * 1000);
                break;
            case Player.STATE_ENDED:
                player.seekTo(0);
                player.setPlayWhenReady(true);
                break;
            case Player.STATE_IDLE:

                break;
            case Player.STATE_READY:
                spinnerVideoDetails.setVisibility(View.GONE);
                total_duration = player.getDuration();
                total_seconds = TimeUnit.MILLISECONDS.toSeconds(total_duration);
                if (!haveStartPosition) {

                    Log.d("totalduration" ,total_duration + " ");
                    long watch_time_sec  = (long)((video_position * total_seconds)/100);
                    Log.d("watched", " " + watch_time_sec + " video_position " +  video_position  + " total " + total_seconds );

                    player.seekTo((watch_time_sec + 1) * 1000);
                    haveStartPosition = true;
                }

                long watched_duration = player.getCurrentPosition();
                Log.d("video duration", " s" + total_duration);
                Toast.makeText(this, "total video duration" + " s" + total_duration, Toast.LENGTH_SHORT).show();
                watch_seconds = TimeUnit.MILLISECONDS.toSeconds(watched_duration);

                Toast.makeText(this, "video postiton watched" + watched_duration + " in seconds =" + watch_seconds    , Toast.LENGTH_SHORT).show();
                percentwatched = (int) ((watch_seconds * 100) / total_seconds);
                Toast.makeText(this,  total_seconds + " in seconds " + watch_seconds + " percent postiton watched " + percentwatched    , Toast.LENGTH_SHORT).show();
                break;
            default:
                // status = PlaybackStatus.IDLE;
                break;
        }
    }

    @Override
    public void onRepeatModeChanged(int repeatMode) {

    }

    @Override
    public void onShuffleModeEnabledChanged(boolean shuffleModeEnabled) {

    }

    @Override
    public void onPlayerError(ExoPlaybackException error) {

    }

    @Override
    public void onPositionDiscontinuity(int reason) {

    }

    @Override
    public void onPlaybackParametersChanged(PlaybackParameters playbackParameters) {

    }

    @Override
    public void onSeekProcessed() {

    }
}
