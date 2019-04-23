package msse.com.studybuddyapp;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
import android.support.v7.app.AlertDialog;

public class LaunchActivity extends AppCompatActivity {

    private Button Loginbutton;
    private Button Registerbutton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launch);
        Loginbutton = (Button) findViewById(R.id.btn_existing_login);
        Registerbutton = (Button) findViewById(R.id.btn_register);
        if(!isOnline())  {
            showAlertDialogButtonClicked();
           // Loginbutton.setEnabled(false);
          //  Registerbutton.setEnabled(false);

        }

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

    public boolean isOnline() {
        ConnectivityManager conMgr = (ConnectivityManager) getApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = conMgr.getActiveNetworkInfo();

        if(netInfo == null || !netInfo.isConnected() || !netInfo.isAvailable()){
            Toast.makeText(this, "No Internet connection!", Toast.LENGTH_LONG).show();
            return false;
        }
        return true;
    }

    public void showAlertDialogButtonClicked() {
        // setup the alert builder
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("AlertDialog");
        builder.setMessage("No Internet Connected");
        // add the buttons
        builder.setPositiveButton("OK", null);
        builder.setNegativeButton("Cancel", null);
        // create and show the alert dialog
        AlertDialog dialog = builder.create();
        dialog.show();
    }


}
