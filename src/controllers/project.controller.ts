import { Request, Response } from "express";
import { Project } from "../models/project.models";

async function getProject(request: Request, response: Response) {
  if (request.user) {
    let data = await Project.getAllUserProject(request.user.id);
    return response.json({
      message: "Successfully get project",
      data: data,
    });
  }
  return response.status(500);
}

async function getUserProjects(request: Request, response: Response) {
  if (request.user) {
    let data = await Project.getAllUserProject(request.user.id);
    return response.json({
      message: "Successfully get user's project",
      data: data,
    });
  }
  return response.status(500);
}

async function getProjectDetail(request: Request, response: Response) {
  let { project_id } = request.params;
  if (request.user) {
    let data = await Project.getProjectDetail(project_id, request.user.id);

    if (data) {
      return response.json({
        message: "Successfully get project detail",
        data: data,
      });
    } else {
      return response.status(400).json({
        message: "Fail get project detail",
        data: null,
      });
    }
  } else {
    return response.status(500);
  }
}

async function getProjectDetailAgency(request: Request, response: Response) {
  let { project_id } = request.params;
  if (request.user) {
    let data = await Project.getProjectDetailAgency(project_id);

    if (data) {
      return response.json({
        message: "Successfully  get project detail",
        data: data,
      });
    } else {
      return response.status(400).json({
        message: "Fail get project detail",
        data: null,
      });
    }
  } else {
    return response.status(500);
  }
}

async function getUserProjectDetail(request: Request, response: Response) {
  let { project_id } = request.params;
  if (request.user) {
    let data = await Project.getUserProjectDetail(project_id);

    if (data) {
      return response.json({
        message: "Successfully  get user project detail",
        data: data,
      });
    } else {
      return response.status(400).json({
        message: "Fail get project user detail",
        data: null,
      });
    }
  } else {
    return response.status(500);
  }
}

async function postProject(request: Request, response: Response) {
  let {
    bugetRange,
    companyName,
    companySize,
    companylocation,
    industry,
    languages,
    localization,
    location,
    position,
    projectDescription,
    projectDuration,
    projectTitle,
    services,
    skills,
  } = request.body;

  if (request.user) {
    let project = new Project(
      bugetRange,
      companyName,
      companySize,
      companylocation,
      industry,
      languages,
      localization,
      location,
      position,
      projectDescription,
      projectDuration,
      projectTitle,
      services,
      skills,
      request.user.id
    );

    let data = await project.postProject();

    if (data) {
      return response.json({
        message: "post project sucessfully",
        data: data,
      });
    }
  }
  return response.status(500);
}

module.exports = {
  getProject,
  postProject,
  getProjectDetail,
  getProjectDetailAgency,
  getUserProjects,
  getUserProjectDetail,
};
