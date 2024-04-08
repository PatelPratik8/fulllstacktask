import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.less',
})
export class TaskComponent {
  constructor(private taskService: TaskService) {}
  tasks: any[] = [];
  newTaskTitle: string = '';
  newTaskText: string = '';
  fileName = '';
  updateTask(tasks: any[]) {
    return tasks.map((e) => {
      e.isDisabled = true;
      return e;
    });
  }

  ngOnInit() {
    this.taskService.getLists().subscribe((data: any) => {
      this.tasks = this.updateTask(data.data);
    });
  }
  // isEnable = true;

  edit(id: any) {
    this.tasks = this.tasks.map((e) => {
      if (e._id === id) e.isDisabled = false;
      else e.isDisabled = true;
      return e;
    });
    console.log('Edit call');
    console.log(id);
  }
  update(id: string, task: object) {
    this.taskService.updateList(id, task).subscribe((data: any) => {
      console.log(data);
      this.tasks = this.tasks.map((e) => {
        if (e._id === id) {
          e = data?.data;
          e.isDisabled = true;
          console.log(e);
        }

        return e;
      });
    });
    // console.log(data);
  }
  deleteTask(id: any) {
    console.log('deleteTask');
    this.taskService.deleteTask(id).subscribe((data) => {
      this.tasks = this.tasks.filter((e) => {
        if (e._id === id) return false;
        return true;
      });
    });
    console.log(id);
  }
  add() {
    this.taskService
      .createTask({ title: this.newTaskTitle, text: this.newTaskText })
      .subscribe((data: any) => {
        // console.log(data);
        let newTaskDate = data?.data;
        newTaskDate.isDisabled = true;
        this.tasks.push(newTaskDate);
        this.newTaskTitle = '';
        this.newTaskText = '';
      });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('excel', file);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);
      this.taskService.excelUpload(formData).subscribe((data: any) => {
        // this.tasks = this.updateTask(data.data);
        alert('file upload successfully');
      });

      // upload$.subscribe();
    }
  }
}
