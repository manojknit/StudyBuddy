package msse.com.studybuddyapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class LaunchActivity extends AppCompatActivity {

    private Button Loginbutton;
    private Button Registerbutton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launch);
        Loginbutton = (Button) findViewById(R.id.btn_existing_login);
        Registerbutton = (Button) findViewById(R.id.btn_register);
        Loginbutton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {

                // Start Login activity.class
                Intent myIntent = new Intent(LaunchActivity.this, LoginActivity.class);
                startActivity(myIntent);
            }
        });
        Registerbutton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {


                Intent myIntent = new Intent(LaunchActivity.this, LoginActivity.class);
                startActivity(myIntent);
            }
        });


    }

}
