import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './css/font-awesome-4.7.0/css/font-awesome.min.css']
})
export class AppComponent implements OnInit {
  cookieValue: any;
  tasks: Taskclass[];
  newTask: string;
  forWhat: string;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.forWhat = "true";
    this.cookieValue = this.cookieService.get('storedDataList');
    if (this.cookieValue.length) {
      this.tasks = JSON.parse(this.cookieValue);
    } else {
      this.tasks = [];
    }
    window.setTimeout(function () {
    var inBox = document.getElementById("task-input");
    inBox.focus();
    },250);
  }

  editTask(task, i) {
    task.edit = !task.edit;
    task.editedTask = task.text;
    window.setTimeout(function () {
      var editField = document.getElementById("input-" + i);
      editField.focus();
    }, 250);

  };
  cancelTask(task) {
    task.edit = !task.edit;
  };
  deleteTask(task) {
    var ind;
    for (var i = 0; i < this.tasks.length; i++) {
      if (task.id === this.tasks[i].id) {
        ind = i;
        break;
      }
    }
    this.tasks.splice(ind, 1);
    this.cookieService.set('storedDataList', JSON.stringify(this.tasks));
  };
  addTask(task) {
    var obj = {
      "text": task,
      "id": this.tasks.length,
      "edit": false
    }
    this.tasks.push(obj);
    this.cookieService.set('storedDataList', JSON.stringify(this.tasks));
    this.newTask = '';
    var inBox = document.getElementById("task-input");
    inBox.focus();
  };
  saveTask(task, index) {
    this.tasks[index].text = task.editedTask;
    task.edit = !task.edit;
    this.cookieService.set('storedDataList', JSON.stringify(this.tasks));
  }
}
export class Taskclass {
  text: any;
  id: number;
  edit: boolean;
}
