import { Request, Response } from "express";
import Page from "../models/page.models";
import pool from "../database";

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

module.exports = {
  postPage,
  getPages,
  getPageDetail,
  getManageDetail,
  putAboutPaage,
};
