package msse.com.studybuddyapp.adapter;

import android.content.Context;
import android.graphics.Movie;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import msse.com.studybuddyapp.R;
import msse.com.studybuddyapp.model.Video;
import java.util.List;


public class MyVideosAdapter extends RecyclerView.Adapter<MyVideosAdapter.MyViewHolder> {
    private Context mContext;
    private List<Video> videosList;

    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView videotitle;
        public ImageView videothumbnail;

        public MyViewHolder(View view) {
            super(view);
            videotitle = (TextView) view.findViewById(R.id.videoTitleTxtview);
            videothumbnail = (ImageView) view.findViewById(R.id.vimageView);

        }
    }


    public MyVideosAdapter(Context mContext,List<Video> videosList) {
        this.mContext = mContext;
        this.videosList = videosList;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.layout_video_item, parent, false);

        return new MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        Video video = videosList.get(position);
        holder.videotitle.setText(video.getVideoTitle());
        holder.videothumbnail.setImageResource(R.drawable.videothumb);
        //holder.year.setText(movie.getYear());
    }

    @Override
    public int getItemCount() {
        return videosList.size();
    }
}