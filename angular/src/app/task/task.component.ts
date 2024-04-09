import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  constructor(private taskService: TaskService) {}
  tasks: any[] = [];
  newTaskTitle: string = '';
  newTaskText: string = '';
  fileName = '';
  status="new";
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
        this.status='view'
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
        this.status='view'
      });

      // upload$.subscribe();
    }
  }
  updateStatus(str:string){
    this.status = str
  }
  uploadDoc(id:string,event: any){
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('pdf', file);
      formData.append('id', id);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);
      this.taskService.pdfUpload(formData).subscribe((data: any) => {
        // this.tasks = this.updateTask(data.data);
        alert('file upload successfully');
        this.status='view'
      });

      // upload$.subscribe();
    }
  }
  download(id:string){
    this.taskService.download(id).subscribe((data:any) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(data);
      link.download = 'file.pdf'; // Replace with desired file name
      link.click();
  })
}
}
