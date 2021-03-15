import { Component, OnInit } from '@angular/core';
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
    private projectsService: ProjectsService,
    private universitiesService: UniversitiesService
  ) {}

  ngOnInit(): void {
  }

}
