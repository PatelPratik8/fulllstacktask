import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webReqService: WebRequestService) {}

  getLists() {
    return this.webReqService.getList();
  }

  getByID(id: string) {
    return this.webReqService.get(id);
  }

  createList(title: string) {
    // We want to send a web request to create a list
    return this.webReqService.post({ title });
  }

  updateList(id: string, task: object) {
    // We want to send a web request to update a list
    return this.webReqService.patch(id, task);
  }

  deleteTask(id: string) {
    return this.webReqService.delete(id);
  }

  // deleteList(id: string) {
  //   return this.webReqService.delete(`lists/${id}`);
  // }

  // getTasks(listId: string) {
  //   return this.webReqService.get(`lists/${listId}/tasks`);
  // }

  createTask(data: object) {
    return this.webReqService.post(data);
  }
  excelUpload(data: any) {
    return this.webReqService.postFile('import', data);
  }
  pdfUpload(data: any) {
    return this.webReqService.postFile('upload', data);
  }
  download(id: any) {
    return this.webReqService.download(id);
  }
}
