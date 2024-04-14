import { Request, Response } from "express";
import Page from "../models/page.models";
import pool from "../database";
import { Award } from "../models/award.models";
import { Service } from "../models/service.model";

async function postPage(request: Request, response: Response) {
  let {
    address,
    company_name,
    description,
    email_address,
    founded_date,
    languages,
    phone_number,
    team_members,
    website,
  } = request.body;
  let createdBy = request.user.id;
  if (createdBy) {
    let page = new Page(
      address,
      company_name,
      description,
      email_address,
      founded_date,
      languages,
      phone_number,
      team_members,
      website,
      createdBy
    );
    let result = page.createPage();
    return response.json({
      message: "create page successfully",
      data: result,
    });
  }
  return response.json({
    message: "create page failed",
    data: null,
  });
}
async function getPages(request: Request, response: Response) {
  if (request.user) {
    let data = await Page.getPages();
    return response.json({
      message: "Successfully get pages",
      data: data,
    });
  }
  return response.status(500);
}

async function getPageDetail(request: Request, response: Response) {
  let { id } = request.params;
  let result = await Page.getPage(id);
  return response.json({
    message: "get page sucessfully",
    data: result,
  });
}

async function getManageDetail(request: Request, response: Response) {
  let { userId } = request.params;
  console.log(userId);
  let result = await Page.getManageDetail(userId);

  if (result) {
    return response.json({
      message: "get page sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "get page failed",
      data: null,
    });
  }
}

async function putAboutPaage(request: Request, response: Response) {
  let { pageId } = request.params;
  let {
    address,
    company_name,
    description,
    founded_date,
    languages,
    team_members,
    tagline,
    turnover,
  } = request.body;
  let page = new Page(
    address,
    company_name,
    description,
    "",
    founded_date,
    languages,
    "",
    team_members,
    "",
    "",
    tagline,
    turnover
  );
  let result = await page.UpdatePageAbout(pageId);

  if (result) {
    return response.json({
      message: "update about page sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "update about page failed",
      data: null,
    });
  }
}

async function postPageAward(request: Request, response: Response) {
  let { pageId } = request.params;
  let { catergory, date, url, award_name } = request.body;

  let result = await new Award(catergory, date, url, award_name).AddAward(
    pageId
  );

  if (result) {
    return response.json({
      message: "Add award sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "Add award failed",
      data: null,
    });
  }
}

async function putPageAward(request: Request, response: Response) {
  let { awardId } = request.params;
  let { catergory, date, url, award_name } = request.body;

  let result = await new Award(catergory, date, url, award_name).UpdateAward(
    awardId
  );

  if (result) {
    return response.json({
      message: "Update award sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "Update award failed",
      data: null,
    });
  }
}

async function deletePageAward(request: Request, response: Response) {
  let { awardId } = request.params;

  let result = await Award.deleteAwards(awardId);

  if (result) {
    return response.json({
      message: "Update award sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "Update award failed",
      data: null,
    });
  }
}

async function getPageAwards(request: Request, response: Response) {
  let { pageId } = request.params;

  console.log(pageId);
  let result = await Award.GetAwards(pageId);

  if (result) {
    return response.json({
      message: "get awards sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "get award failed",
      data: null,
    });
  }
}

async function postPageService(request: Request, response: Response) {
  let { pageId } = request.params;
  let { service_description, price, service_tags, skills_tags } = request.body;
  console.log(request.body);
  let result = await new Service(
    service_tags,
    service_description,
    Number.parseFloat(price),
    skills_tags
  ).addService(pageId);

  if (result) {
    return response.json({
      message: "Add service sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "Add service failed",
      data: null,
    });
  }
}

async function putPageService(request: Request, response: Response) {
  let { serviceId } = request.params;
  let { service_description, price, service_tags, skills_tags } = request.body;

  let result = await new Service(
    service_tags,
    service_description,
    price,
    skills_tags
  ).updateService(serviceId);

  if (result) {
    return response.json({
      message: "Update award sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "Update award failed",
      data: null,
    });
  }
}

async function deletePageService(request: Request, response: Response) {
  let { awardId } = request.params;

  let result = await Award.deleteAwards(awardId);

  if (result) {
    return response.json({
      message: "Update award sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "Update award failed",
      data: null,
    });
  }
}

async function getPageService(request: Request, response: Response) {
  let { pageId } = request.params;

  console.log(pageId);
  let result = await Service.getServices(pageId);

  if (result) {
    return response.json({
      message: "get services sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "get services failed",
      data: null,
    });
  }
}

module.exports = {
  postPage,
  getPages,
  getPageDetail,
  getManageDetail,
  getPageAwards,
  putPageAward,
  postPageAward,
  deletePageAward,
  putAboutPaage,
  postPageService,
  putPageService,
  deletePageService,
  getPageService,
};
