import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  selectedFiles: FileList;
   
  constructor(private route: ActivatedRoute,
    private router: Router,private quizService: QuizService) { }

  ngOnInit() {
    
  }
  upload() {
    const reader = new FileReader();
    const file = this.selectedFiles.item(0);
    const fileName = this.selectedFiles.item(0).name;
    console.log('file name' + fileName);
    let json;
    reader.readAsText(file);
    const courseid = '5c9f12cc456fe90901ac7418';
    reader.onload = () => {
      let text = reader.result;
      //console.log('CSV: ', text.substring(0, 100) + '...');
      
      //convert text to json here
       json = this.csvJSON(text);
      console.log('JSON' + json);
      this.quizService.addQuiz(courseid, fileName, json);
    };
    
    
   // this.uploadQuizService.uploadQuiz(file, courseid);
    }
    uploadxlsx() {
      let workBook = null;
      let jsonData = null;
      let sheetname = null;
      //const courseid = '5c9f12cc456fe90901ac7418';
      const reader = new FileReader();
      const file = this.selectedFiles.item(0);
      const fileName = this.selectedFiles.item(0).name;
      const flname = fileName.split(".")[0];
      console.log('file name ' + flname);
      reader.readAsBinaryString(file);
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          sheetname = name;
          console.log('name is ' + sheetname);
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          console.log('initial' + initial);
          return initial;
        }, {});
        const dataString = JSON.stringify(jsonData);
        console.log(dataString);
        console.log("json obj" +  JSON.stringify(jsonData[sheetname]));
        this.route.params.subscribe(params => {
          console.log('course id' + params['id']);
          this.quizService.addQuiz(params['id'], fileName, jsonData[sheetname]);
        });
         //Redirect to courses
           this.router.navigate(["/course"],);
        
       // return jsonData[]
        //console.log(dataString);
      //  document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      //  this.setDownload(dataString);
      }


    }
    
    selectFile(event) {
    this.selectedFiles = event.target.files;
    
    }

    public csvJSON(csv) {
      var lines = csv.split("\n");
  
      var result = [];
  
      var headers = lines[0].split(",");
  
      for (var i = 1; i < lines.length; i++) {
  
          var obj = {};
          var currentline = lines[i].split(",");
  
          for (var j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
          }
  
          result.push(obj);
  
      }
  
      return result; //JavaScript object
     //return JSON.stringify(result); //JSON
  }

}
