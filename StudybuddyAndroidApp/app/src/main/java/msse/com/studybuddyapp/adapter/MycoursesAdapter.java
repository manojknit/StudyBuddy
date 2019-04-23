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

public class MyCoursesAdapter extends RecyclerView.Adapter<MyCoursesAdapter.MyCourseViewHolder> {
    private Context mContext;
    private List<Course> mycourseList;

    public class MyCourseViewHolder extends RecyclerView.ViewHolder {
        public TextView mycoursetitle, mycourse_author;
        public ImageView mythumbnail;

        public MyCourseViewHolder(View view) {
            super(view);
            mycoursetitle = (TextView) view.findViewById(R.id.course_TitleTxtview);
            mycourse_author = (TextView) view.findViewById(R.id.course_description);
            mythumbnail = (ImageView) view.findViewById(R.id.cimageView);

        }
    }

    @NonNull
    @Override
    public MyCourseViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.course_list_item, parent, false);

        return new MyCourseViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(final MyCourseViewHolder holder, int position) {
        Course course = mycourseList.get(position);
        holder.mycoursetitle.setText(course.getCourse_name());
        holder.mycourse_author.setText(course.getAuthor());
        holder.mythumbnail.setImageResource(course.getThumbnail());



    }

    @Override
    public int getItemCount() {
        return mycourseList.size();
    }


}
