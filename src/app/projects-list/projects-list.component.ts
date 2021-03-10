import { Component, OnInit } from "@angular/core";
import { Project } from "../model/project/project";
import { ProjectsService } from "../projects.service";

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"],
})
export class ProjectsListComponent implements OnInit {
  projects?: Project[];

  constructor(private projectService: ProjectsService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
}
