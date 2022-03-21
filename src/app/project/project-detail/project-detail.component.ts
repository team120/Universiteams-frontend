import { Project } from "../../model/project/project";

import { ProjectsService } from "../projects-service/projects.service";
import { UniversitiesService } from "../universities-service/universities.service";

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"],
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log("detail on init called")
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get("id"));
      if (id !== null)
        this.projectsService.getOneProject(id).subscribe((project) => {
          this.project = project;
        });
    });
  }

  goBackToProjects() {
    this.router.navigate(["projects"]);
  }
}
