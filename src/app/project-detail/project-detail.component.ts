import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from "../model/project/project";
import { University } from "../model/university/university";
import { ProjectsService } from "../projects.service";
import { UniversitiesService } from "../universities.service";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  projects: Project[] = [];
  universities: University[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public project: Project,
    private projectsService: ProjectsService,
    private universitiesService: UniversitiesService,
  ) {}

  ngOnInit(): void {
  }

}
