import { Request, Response } from "express";
import Page from "../models/page.models";
import pool from "../database";
import { Award } from "../models/award.models";
import { Service } from "../models/service.model";
import { Address } from "../models/address.models";
import Company from "../models/company.models";
const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};

const cloudinary = require("cloudinary").v2;
cloudinary.config(cloudinaryConfig);
async function handleUpload(file: any) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

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

//#region Additional Address
async function postPageAdditionAddress(request: Request, response: Response) {
  let { pageId } = request.params;
  let { description } = request.body;

  let result = await new Address(description).AddAddress(pageId);

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

async function putPageAdditionAddress(request: Request, response: Response) {
  let { contactId } = request.params;
  let { description } = request.body;

  let result = await new Address(description).UpdateAddress(contactId);

  if (result) {
    return response.json({
      message: "Update address sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "Update address failed",
      data: null,
    });
  }
}

async function deletePageAdditionAddress(request: Request, response: Response) {
  let { contactId } = request.params;

  let result = await Address.deleteAddress(contactId);

  if (result) {
    return response.json({
      message: "Update address sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "Update address failed",
      data: null,
    });
  }
}

async function getPageAdditionAddresses(request: Request, response: Response) {
  let { pageId } = request.params;

  console.log(pageId);
  let result = await Address.GetAddresses(pageId);

  if (result) {
    return response.json({
      message: "get address sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "get address failed",
      data: null,
    });
  }
}
//#endregion

//#region Page Awards
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
//#endregion

//#region Page Service
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
  console.log(service_tags);
  let result = await new Service(
    service_tags,
    service_description,
    price,
    skills_tags
  ).updateService(serviceId);

  if (result) {
    return response.json({
      message: "Update service sucessfully",
      data: result.rows[0],
    });
  } else {
    return response.json({
      message: "Update service failed",
      data: null,
    });
  }
}

async function deletePageService(request: Request, response: Response) {
  let { serviceId } = request.params;

  let result = await Service.deleteService(serviceId);

  if (result) {
    return response.json({
      message: "delete service sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "delete service failed",
      data: null,
    });
  }
}

async function getPageService(request: Request, response: Response) {
  let { serviceId } = request.params;

  console.log(serviceId);
  let result = await Service.getService(serviceId);

  if (result) {
    return response.json({
      message: "get service sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "get service failed",
      data: null,
    });
  }
}

async function getPageServices(request: Request, response: Response) {
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
//#endregion

//#region Company information

async function getCompany(request: Request, response: Response) {
  const { pageId } = request.params;
  let result = await new Company(pageId).GetCompany();
  if (result) {
    return response.json({
      message: "get company sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "get company failed",
      data: null,
    });
  }
}

async function postCompanyPicture(request: Request, response: Response) {
  const { pageId } = request.params;
  console.log(request.file);
  try {
    const b64 = Buffer.from(request.file.buffer).toString("base64");
    let dataURI = "data:" + request.file.mimetype + ";base64," + b64;
    const team_cover = await handleUpload(dataURI);
    let result = await new Company(
      pageId,
      "",
      "",
      team_cover.url
    ).AddTeamCover();
    if (result) {
      return response.json({
        message: "post company team cover sucessfully",
        data: result,
      });
    } else {
      return response.json({
        message: "post company team cover failed",
        data: null,
      });
    }
  } catch (error: any) {
    await pool.query("SELECT * FROM add_company_picture($1,$2)", [pageId, ""]);
    console.log(error);
    response.send({
      message: error.message,
    });
  }
}
async function postCompanyStory(request: Request, response: Response) {
  const { pageId } = request.params;
  const { story } = request.body;
  let result = await new Company(pageId, "", "", "", story).AddStory();

  if (result) {
    return response.json({
      message: "post company story sucessfully",
      data: result,
    });
  } else {
    return response.json({
      message: "post company story failed",
      data: null,
    });
  }
}
async function postCompanyLogo(request: Request, response: Response) {
  const { pageId } = request.params;

  try {
    const b64 = Buffer.from(request.file.buffer).toString("base64");
    let dataURI = "data:" + request.file.mimetype + ";base64," + b64;
    const logo = await handleUpload(dataURI);
    console.log(logo);

    let result = await new Company(pageId, logo.url).AddLogo();

    if (result) {
      return response.json({
        message: "post company logo sucessfully",
        data: result,
      });
    } else {
      await pool.query("SELECT * FROM add_company_logo($1,$2)", [pageId, ""]);
      return response.json({
        message: "post company logo failed",
        data: null,
      });
    }
  } catch (error: any) {
    console.log(error);
    response.send({
      message: error.message,
    });
  }
}
async function postCompanyCover(request: Request, response: Response) {
  const { pageId } = request.params;
  try {
    const b64 = Buffer.from(request.file.buffer).toString("base64");
    let dataURI = "data:" + request.file.mimetype + ";base64," + b64;
    const cover = await handleUpload(dataURI);
    let result = await new Company(pageId, "", cover.url).AddCover();

    if (result) {
      return response.json({
        message: "post company cover sucessfully",
        data: result,
      });
    } else {
      await pool.query("SELECT * FROM add_company_cover($1,$2)", [pageId, ""]);
      return response.json({
        message: "post company cover failed",
        data: null,
      });
    }
  } catch (error: any) {
    console.log(error);
    response.send({
      message: error.message,
    });
  }
}
//#endregion
module.exports = {
  getCompany,
  postCompanyPicture,
  postCompanyStory,
  postCompanyLogo,
  postCompanyCover,
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
  getPageServices,
  getPageAdditionAddresses,
  deletePageAdditionAddress,
  putPageAdditionAddress,
  postPageAdditionAddress,
};
