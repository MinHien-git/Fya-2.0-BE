import { Request, Response } from "express";
import Page from "../models/page.models";
import pool from "../database";

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

export async function AddSavePage(request: Request, response: Response) {
  try {
    if (request.user.id) {
      let { pageId } = request.params;
      pool.query("select * from add_favorite_list($1,$2)", [
        request.user.id,
        pageId,
      ]);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function RemoveSavePage(request: Request, response: Response) {
  try {
    if (request.user.id) {
      let { pageId } = request.params;
      pool.query("select * from remove_page_favorite_list($1,$2)", [
        request.user.id,
        pageId,
      ]);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function GetSavePage(request: Request, response: Response) {
  try {
    if (request.user.id) {
      let { pageId } = request.params;
      pool.query("select * from get_save_page($1)", [request.user.id]);
    }
  } catch (e) {
    console.log(e);
  }
}
