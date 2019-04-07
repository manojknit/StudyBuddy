package msse.com.studybuddyapp;

import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Movie;
import android.graphics.Rect;
import android.support.annotation.NonNull;
import android.support.design.widget.NavigationView;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.ActionBarDrawerToggle;
import android.os.Bundle;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.util.TypedValue;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;
import msse.com.studybuddyapp.apiasynctasks.FetchCoursesTask;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import msse.com.studybuddyapp.adapter.MycoursesAdapter;
import msse.com.studybuddyapp.listener.RecyclerTouchListener;
import msse.com.studybuddyapp.model.Course;

public class HomeActivity extends AppCompatActivity {

    private RecyclerView recyclerView, frrecRecyclerView;
    private MycoursesAdapter courseadapter;
    private List<Course> courseList;
    private DrawerLayout dl;
    private ActionBarDrawerToggle t;
    private NavigationView nv;
    ArrayList<Course> returnValues = new ArrayList<Course>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        dl = (DrawerLayout)findViewById(R.id.drawer_layout);
        t = new ActionBarDrawerToggle(this, dl,R.string.Open, R.string.Close);
        dl.addDrawerListener(t);
        t.syncState();

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        nv = (NavigationView)findViewById(R.id.nav_view);
        nv.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                int id = item.getItemId();
                switch(id)
                {
                    case R.id.account:
                        Toast.makeText(HomeActivity.this, "Search Catalog",Toast.LENGTH_SHORT).show();
                    case R.id.settings:
                        Toast.makeText(HomeActivity.this, "Full Catalog",Toast.LENGTH_SHORT).show();
                    case R.id.mycart:
                        Toast.makeText(HomeActivity.this, "My courses",Toast.LENGTH_SHORT).show();
                    default:
                        return true;
                }




            }
        });
      //setting recycler view

        recyclerView = (RecyclerView) findViewById(R.id.rv_free_courses);
      //  frrecRecyclerView = (RecyclerView) findViewById(R.id.rv_in_demand);
        courseList = new ArrayList<Course>();

        fetch();
        RecyclerView.LayoutManager mLayoutManager = new GridLayoutManager(this, 3);
        recyclerView.setLayoutManager(mLayoutManager);
        recyclerView.addItemDecoration(new GridSpacingItemDecoration(2, dpToPx(15), true));
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setNestedScrollingEnabled(false);
        recyclerView.setAdapter(courseadapter);
        recyclerView.addOnItemTouchListener(new RecyclerTouchListener(getApplicationContext(), recyclerView,  new RecyclerTouchListener.ClickListener() {
            @Override
            public void onClick(View view, int position) {
                Course course = courseList.get(position);
                Toast.makeText(getApplicationContext(), course.getCourse_name() + " is selected!", Toast.LENGTH_SHORT).show();
                Intent mIntent = ExoPlayerActivity.getStartIntent(getApplicationContext(), VideoPlayerConfig.DEFAULT_VIDEO_URL);
                startActivity(mIntent);
            }

            @Override
            public void onLongClick(View view, int position) {

            }
        }));

      //  prepareCourses();

    }

    private void prepareCourses() {
        int[] covers = new int[]{
                R.drawable.catalog,
                R.drawable.my_enrollment,
                R.drawable.mobile_development,
                R.drawable.udacity_logo,
                R.drawable.facebook_logo
                };

        Course a = new Course("True Romance", "ANC", covers[0]);
        courseList.add(a);

        a = new Course("Xscpae", "and", covers[1]);
        courseList.add(a);

        a = new Course("Maroon 5", "Jan", covers[2]);
        courseList.add(a);

        a = new Course("Born to Die", "qwew", covers[3]);
        courseList.add(a);

        a = new Course("Honeymoon", "fvv", covers[4]);
        courseList.add(a);


        courseadapter.notifyDataSetChanged();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        if(t.onOptionsItemSelected(item))
            return true;

        return super.onOptionsItemSelected(item);
    }

    /**
     * RecyclerView item decoration - give equal margin around grid item
     */
    public class GridSpacingItemDecoration extends RecyclerView.ItemDecoration {

        private int spanCount;
        private int spacing;
        private boolean includeEdge;

        public GridSpacingItemDecoration(int spanCount, int spacing, boolean includeEdge) {
            this.spanCount = spanCount;
            this.spacing = spacing;
            this.includeEdge = includeEdge;
        }

        @Override
        public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
            int position = parent.getChildAdapterPosition(view); // item position
            int column = position % spanCount; // item column

            if (includeEdge) {
                outRect.left = spacing - column * spacing / spanCount; // spacing - column * ((1f / spanCount) * spacing)
                outRect.right = (column + 1) * spacing / spanCount; // (column + 1) * ((1f / spanCount) * spacing)

                if (position < spanCount) { // top edge
                    outRect.top = spacing;
                }
                outRect.bottom = spacing; // item bottom
            } else {
                outRect.left = column * spacing / spanCount; // column * ((1f / spanCount) * spacing)
                outRect.right = spacing - (column + 1) * spacing / spanCount; // spacing - (column + 1) * ((1f /    spanCount) * spacing)
                if (position >= spanCount) {
                    outRect.top = spacing; // item top
                }
            }
        }
    }

    /**
     * Converting dp to pixel
     */
    private int dpToPx(int dp) {
        Resources r = getResources();
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, r.getDisplayMetrics()));
    }

    public void fetch(){
        FetchCoursesTask fetchCoursesTask = new FetchCoursesTask();

        try {
            courseList = fetchCoursesTask.execute().get();
          /*  MyContact FetchedData = (MyContact) returnValues.toArray()[0];

            editText_fname.setText(FetchedData.getFirst_name());
            editText_lname.setText(FetchedData.getLast_name());
            editText_phonenumber.setText(FetchedData.getPhone_nubmer());
            */
            Log.d("log fetch value", courseList.toString() + courseList.size() );
            Toast.makeText(this, "Fetched from MongoDB!!", Toast.LENGTH_SHORT).show();
            courseadapter = new MycoursesAdapter(this, courseList);
            courseadapter.notifyDataSetChanged();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

    }
}
