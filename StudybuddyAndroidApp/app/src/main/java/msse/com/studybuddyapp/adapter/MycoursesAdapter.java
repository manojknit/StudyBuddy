package msse.com.studybuddyapp.adapter;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.List;

import msse.com.studybuddyapp.R;
import msse.com.studybuddyapp.model.Course;

public class MycoursesAdapter extends RecyclerView.Adapter<MycoursesAdapter.MyViewHolder> {

    private Context mContext;
    private List<Course> courseList;

    public MycoursesAdapter(Context mContext, List<Course> courseList) {
        this.mContext = mContext;
        this.courseList = courseList;
    }

    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView coursetitle, course_author;
        public com.joooonho.SelectableRoundedImageView thumbnail;

        public MyViewHolder(View view) {
            super(view);
            coursetitle = (TextView) view.findViewById(R.id.course_name);
            course_author = (TextView) view.findViewById(R.id.course_author);
            thumbnail = (com.joooonho.SelectableRoundedImageView) view.findViewById(R.id.courseImageview);

        }
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder( ViewGroup parent, int viewType) {

        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.layout_free_courses, parent, false);

        return new MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(final MyViewHolder holder, int position) {
        Course course = courseList.get(position);
        holder.coursetitle.setText(course.getCourse_name());
        holder.course_author.setText(course.getAuthor());
        holder.thumbnail.setImageResource(course.getThumbnail());
      //  holder.count.setText(course.getNumOfSongs() + " songs");


    }

    @Override
    public int getItemCount() {
        return 5;
    }





}
