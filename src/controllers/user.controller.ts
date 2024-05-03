import { Request, Response } from "express";
import Page from "../models/page.models";

export async function GetPages(request: Request, response: Response) {
  let data = await Page.getPages();
  if (data) {
    return response.json({
      message: "Successfully get pages",
      data: data,
    });
  } else {
    return response.json({
      message: "Get pages failed",
      data: data,
    });
  }
}
export async function GetPage(request: Request, response: Response) {
  let { id } = request.params;
  let result = await Page.getPage(id);
  console.log(result);
  return response.json({
    message: "get page sucessfully",
    data: result,
  });
}
export function GetPageDetail() {}
