import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../model/project/project";
import { ProjectsService } from "../projects.service";
import { UniversitiesService } from "../universities.service";

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"],
})
export class ProjectDetailComponent {
  project: Project | undefined;

  constructor(
    private projectsService: ProjectsService,
    route: ActivatedRoute,
    private router: Router
  ) {
    route.paramMap.subscribe((params) => {
      const id = Number(params.get("id"));
      if (id !== null)
        projectsService.getOneProject(id).subscribe((project) => {
          this.project = project;
        });
    });
  }

  goBackToProjects(){
    this.router.navigate(["projects"])
  }
}
