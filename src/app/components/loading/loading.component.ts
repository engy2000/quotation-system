import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ContentLoaderModule } from '@ngneat/content-loader';

@Component({
  selector: 'app-loading',
  imports: [ContentLoaderModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
@ViewChild('template', { static: false }) private template!: TemplateRef<any>;

  constructor() {}

  public get templateRef(): TemplateRef<any> {
    return this.template;
  }

}
