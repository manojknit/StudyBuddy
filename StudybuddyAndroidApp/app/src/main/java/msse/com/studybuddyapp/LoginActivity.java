package msse.com.studybuddyapp;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.support.annotation.NonNull;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.app.LoaderManager.LoaderCallbacks;

import android.content.CursorLoader;
import android.content.Loader;
import android.database.Cursor;
import android.net.Uri;
import android.os.AsyncTask;

import android.os.Build;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.EditorInfo;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import static android.Manifest.permission.READ_CONTACTS;

/**
 * A login screen that offers login via email/password.
 */
public class LoginActivity extends AppCompatActivity  {

    /**
     * Id to identity READ_CONTACTS permission request.
     */
    private static final int REQUEST_READ_CONTACTS = 0;

    /**
     * A dummy authentication store containing known user names and passwords.
     * TODO: remove after connecting to a real authentication system.
     */
    private static final String[] DUMMY_CREDENTIALS = new String[]{
            "foo@example.com:hello", "bar@example.com:world"
    };
    /**
     * Keep track of the login task to ensure we can cancel it if requested.
     */
   // private UserLoginTask mAuthTask = null;

    // UI references.

    private EditText emailEdittext;
    private EditText pswdEdittext;
    private Button signInButton;
    private Button fbButton;
    public static final String MyPREFERENCES = "MyPrefs";
    SharedPreferences sharedpreferences;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        emailEdittext = (EditText) findViewById(R.id.edt_email);
        pswdEdittext = (EditText) findViewById(R.id.edt_password);
        signInButton =(Button)  findViewById(R.id.btn_login);
        pswdEdittext = (EditText) findViewById(R.id.edt_password);
        sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
        // Set up the login form.
       /* mEmailView = (AutoCompleteTextView) findViewById(R.id.email);
        populateAutoComplete();

        mPasswordView = (EditText) findViewById(R.id.password);
        mPasswordView.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView textView, int id, KeyEvent keyEvent) {
                if (id == EditorInfo.IME_ACTION_DONE || id == EditorInfo.IME_NULL) {
                    attemptLogin();
                    return true;
                }
                return false;
            }
        });
          */


        signInButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {

                if((emailEdittext.getText().toString().equals("Yamini")) || (emailEdittext.getText().toString().equals("Shalini")) || (emailEdittext.getText().toString().equals("Gyanesh")) && pswdEdittext.getText().toString().equals("Pass@123")) {
                    final SharedPreferences.Editor editor = sharedpreferences.edit();
                    editor.putString("username", emailEdittext.getText().toString());
                    editor.commit();
                    Intent myIntent = new Intent(LoginActivity.this, HomeActivity.class);
                    startActivity(myIntent);
                }
                else
                {
                    Toast.makeText(getApplicationContext(), "Incorrect User name or password", Toast.LENGTH_SHORT).show();
                }
            }
        });


    }


}

