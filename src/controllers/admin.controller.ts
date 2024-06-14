import { Request, Response } from "express";
import pool from "../database";

export async function getNewProject(request: Request, response: Response) {
  try {
    let result = (await pool.query("Select * from get_project_display()")).rows;
    console.log(result);
    if (result) {
      return response.json({
        data: result,
        message: "Get new Project",
        status: 200,
      });
    } else {
      return response.json({
        status: 400,
        message: "Cannot get new Project",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return response.json({
      status: 400,
      message: "Cannot get new Project",
      data: null,
    });
  }
}

export async function getUsers(request: Request, response: Response) {
  try {
    let result = (await pool.query("Select u.*, pg.* from users u left join lateral (select * from get_page(u.id)) as pg on true;")).rows;
    console.log(result);
    if (result) {
      return response.json({
        data: result,
        message: "Get users",
        status: 200,
      });
    } else {
      return response.json({
        status: 400,
        message: "Cannot get user",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return response.json({
      status: 400,
      message: "Cannot get user",
      data: null,
    });
  }
}

export async function getAgencyPage(request: Request, response: Response) {
  try {
    let result = (await pool.query(`select p.*, p.description as pdes, u.*, ac.description as contact_description, s.services, pp.portfolios, aw.awards from page p 
                                    join users u on u.id = p.create_by 
                                    left join page_contact pc on p.page_id = pc.page_id
                                    left join additional_contact ac on pc.contact_id::uuid = ac.contactid 
                                    join lateral (select json_agg(s) as services from get_services(p.page_id) s) s on true
                                    join lateral (select json_agg(pp) as portfolios from get_portfolios(p.page_id) pp) pp on true 
                                    join lateral (select json_agg(aw) as awards from get_awards(p.page_id) aw) aw on true;`)).rows;
    console.log(result);
    if (result) {
      return response.json({
        data: result,
        message: "Get agency page data",
        status: 200,
      });
    } else {
      return response.json({
        status: 400,
        message: "Cannot get agency page data",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return response.json({
      status: 400,
      message: "Cannot get agency page data",
      data: null,
    });
  }
}

export async function getData(request: Request, response: Response) {
  try {
    const result = (await pool.query(`with user_ratings as (
                                          select 
                                              count(*) as user_rating_count,
                                              avg(rating) as user_rating_avg
                                          from (
                                              select cast(json_extract_path_text(json_array_elements(unnest(performance)), 'value') as float) as rating
                                              from feedbacks
                                              union all
                                              select cast(feedback_rating as float) as rating
                                              from feedbacks
                                          ) as subquery
                                      ),
                                      agency_ratings as (
                                          select 
                                              count(*) as agency_rating_count,
                                              avg(rating) as agency_rating_avg
                                          from (
                                              select cast(json_extract_path_text(json_array_elements(unnest(client_rate)), 'value') as float) as rating
                                              from user_feedback
                                              union all
                                              select cast(feedback_rating as float) as rating
                                              from user_feedback
                                          ) as subquery
                                      ),
                                      client_ratings as (
                                          select 
                                              count(*) as client_rating_count,
                                              avg(rating) as client_rating_avg
                                          from (
                                              select cast(json_extract_path_text(json_array_elements(unnest(client_rate)), 'value') as float) as rating
                                              from user_feedback 
                                              join (
                                                  select distinct on (users.id) users.id 
                                                  from users 
                                                  join projects on projects.post_by = users.id
                                              ) u on user_feedback.user_id = u.id
                                              union all
                                              select cast(feedback_rating as float) as rating
                                              from user_feedback 
                                              join (
                                                  select distinct on (users.id) users.id 
                                                  from users 
                                                  join projects on projects.post_by = users.id
                                              ) u on user_feedback.user_id = u.id
                                          ) as subquery
                                      ),
                                      completed_project_ratings_user as (
                                          select 
                                              count(*) as completed_project_rating_count,
                                              avg(rating) as completed_project_rating_avg
                                          from (
                                              select cast(json_extract_path_text(json_array_elements(unnest(performance)), 'value') as float) as rating
                                              from feedbacks
                                              union all
                                              select cast(feedback_rating as float) as rating
                                              from feedbacks
                                          ) as subquery
                                      ),
                                      completed_project_ratings_agency as (
                                          select 
                                              count(*) as completed_project_rating_count,
                                              avg(rating) as completed_project_rating_avg
                                          from (
                                              select cast(json_extract_path_text(json_array_elements(unnest(client_rate)), 'value') as float) as rating
                                              from user_feedback
                                              union all
                                              select cast(feedback_rating as float) as rating
                                              from user_feedback
                                          ) as subquery
                                      ),
                                      completed_project_ratings as (
                                          select 
                                              sum(completed_project_rating_count) as completed_project_rating_count,
                                              avg(completed_project_rating_avg) as completed_project_rating_avg
                                          from (
                                              select * from completed_project_ratings_user
                                              union all
                                              select * from completed_project_ratings_agency
                                          ) as subquery
                                      )
                                      select 
                                          (select count(*) from users) as user_count,
                                          (select count(*) from page) as agency_count,
                                          (select count(*) from page where created_date >= date_trunc('week', current_date)) as new_agency_pages,
                                          (select count(*) from projects) as all_briefings,
                                          (select count(*) from projects where created_date >= date_trunc('week', current_date)) as new_briefings,
                                          (select count(*) from projects where project_status = 0) as briefings_received,
                                          (select count(*) from projects where project_status = 2) as briefings_rejected,
                                          (select count(*) from projects where project_status = 1) as open_projects,
                                          (select count(*) from projects where project_status = 1 and created_date >= date_trunc('week', current_date)) as current_open_projects,
                                          (select count(*) from proposal) as proposals_received,
                                          (select count(*) from proposal where accepted = 1) as proposals_rejected,
                                          (select count(*) from proposal where accepted = 2) as projects_won,
                                          (select count(*) from proposal where accepted = 2 and proposal_date >= date_trunc('week', current_date)) as new_projects_won,
                                          (select count(*) from proposal where accepted > 2) as completed_projects,
                                          (select count(*) from proposal where accepted > 2 and completed_date >= date_trunc('week', current_date)) as new_completed_projects,
                                          user_ratings.user_rating_count,
                                          user_ratings.user_rating_avg,
                                          agency_ratings.agency_rating_count,
                                          agency_ratings.agency_rating_avg,
                                          client_ratings.client_rating_count,
                                          client_ratings.client_rating_avg,
                                          completed_project_ratings.completed_project_rating_count,
                                          completed_project_ratings.completed_project_rating_avg,
                                          (select count(*) from feedbacks) as user_feedback_count,
                                          (select count(*) from user_feedback) as agency_feedback_count,
                                          (select count(distinct users.id) from users 
                                              join projects on projects.post_by = users.id) as client_count,
                                          (select count(*) from user_feedback 
                                              join (
                                                  select distinct on (users.id) users.id 
                                                  from users 
                                                  join projects on projects.post_by = users.id
                                              ) u on user_feedback.user_id = u.id) as client_feedback_count,
                                          (select count(*) from feedbacks) + (select count(*) from user_feedback) as completed_project_feedback_count
                                      from user_ratings, agency_ratings, client_ratings, completed_project_ratings;`)).rows[0];

    if (!result) {
      return response.status(400).json({
        status: 400,
        message: "Cannot get admin data",
        data: null,
      });
    }

    const calculatePercentage = (part: number, total: number): number | null => total ? Math.round((part / total) * 100) : null;
    const calculateAverage = (part: number, total: number): number | null => total ? parseFloat((part / total).toFixed(3)) : null;
    const averageBriefingsPerUser = result.user_count ? parseFloat((result.all_briefings / result.user_count).toFixed(3)) : null;
    const projectsPerThousandBriefings = result.all_briefings ? parseFloat((result.completed_projects / result.all_briefings).toFixed(3)) * 1000 : null;
    
    const data = {
      user_count: result.user_count,
      agency_count: result.agency_count,
      new_agency_pages: result.new_agency_pages,
      all_briefings: result.all_briefings,
      new_briefings: result.new_briefings,
      briefings_received: result.briefings_received,
      briefings_rejected: result.briefings_rejected,
      open_projects: result.open_projects,
      current_open_projects: result.current_open_projects,
      proposals_received: result.proposals_received,
      proposals_rejected: result.proposals_rejected,
      projects_won: result.projects_won,
      new_projects_won: result.new_projects_won,
      completed_projects: result.completed_projects,
      new_completed_projects: result.new_completed_projects,
      agency_growth: calculatePercentage(result.new_agency_pages, result.agency_count),
      briefings_growth: calculatePercentage(result.new_briefings, result.all_briefings),
      briefings_rejection_rate: calculatePercentage(result.briefings_rejected, result.all_briefings),
      open_new_percentage: calculatePercentage(result.open_projects, result.briefings_received),
      proposals_rejection_rate: calculatePercentage(result.proposals_rejected, result.proposals_received),
      projects_won_rate: calculatePercentage(result.new_projects_won, result.projects_won),
      completed_projects_growth: calculatePercentage(result.new_completed_projects, result.completed_projects),
      average_briefings_per_user: averageBriefingsPerUser,
      projects_per_thousand_briefings: projectsPerThousandBriefings,
      user_rating_count: result.user_rating_count,
      user_rating_avg: result.user_rating_avg.toFixed(3),
      agency_rating_count: result.agency_rating_count,
      agency_rating_avg: result.agency_rating_avg.toFixed(3),
      client_rating_count: result.client_rating_count,
      client_rating_avg: result.client_rating_avg.toFixed(3),
      completed_project_rating_count: result.completed_project_rating_count,
      completed_project_rating_avg: result.completed_project_rating_avg.toFixed(3),
      user_feedback_count: result.user_feedback_count,
      user_feedback_avg: calculateAverage(result.user_feedback_count, result.user_count),
      agency_feedback_count: result.agency_feedback_count,
      agency_feedback_avg: calculateAverage(result.agency_feedback_count, result.agency_count),
      client_feedback_count: result.client_feedback_count,
      client_feedback_avg: calculateAverage(result.client_feedback_count, result.client_count),
      completed_project_feedback_count: result.completed_project_feedback_count,
      completed_project_feedback_avg: calculateAverage(result.completed_project_feedback_count, result.completed_projects),
    };
    console.log(data);
    return response.status(200).json({
      data: data,
      message: "Get admin data",
      status: 200,
    });

  } catch (e) {
    console.error('Error fetching admin data:', e);
    return response.status(500).json({
      status: 500,
      message: "Cannot get admin data",
      data: null,
    });
  }
}

export async function getProjectsData(request: Request, response: Response) {
  try {
    let result = (await pool.query(`select pro.*, proposal.*, page.page_id, page.company_name, page.team_members, page.address, page.email_address, page.phone_number, page.rating as prating, users.id, users.email, users.lname, users.fname, users.rating from projects pro 
                                    join proposal on (proposal.project_id = pro.project_id and proposal.accepted >= 2) 
                                    join users on users.id = pro.post_by
                                    join page_proposal on proposal.proposal_id = page_proposal.proposal_id 
                                    join page on page.page_id = page_proposal.page_id
                                    where pro.project_status >= 1;`)).rows;
    console.log(result);
    if (result) {
      return response.json({
        data: result,
        message: "Get projects data",
        status: 200,
      });
    } else {
      return response.json({
        status: 400,
        message: "Cannot get projects data",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return response.json({
      status: 400,
      message: "Cannot get projects data",
      data: null,
    });
  }
}

export async function getBriefingsSent(request: Request, response: Response) {
  try {
    let result = (await pool.query("select u.fname, u.lname, u.email, u.rating, p.* from projects p join users u on p.post_by = u.id")).rows;
    console.log(result);
    if (result) {
      return response.json({
        data: result,
        message: "Get briefings sent by client",
        status: 200,
      });
    } else {
      return response.json({
        status: 400,
        message: "Cannot get briefings sent by client",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return response.json({
      status: 400,
      message: "Cannot get briefings sent by client",
      data: null,
    });
  }
}

export async function getBriefingsAccepted(request: Request, response: Response) {
  try {
    let result = (await pool.query(`select page.company_name, page.page_id, page.address, page.team_members, page.rating as prating, pro.*, pp.price, pp.completed_date, u.id, u.lname, u.fname, u.rating, u.email from projects pro 
                                    join proposal pp on (pp.project_id = pro.project_id and pp.accepted >= 2) 
                                    join users u on u.id = pro.post_by
                                    join page_proposal on pp.proposal_id = page_proposal.proposal_id 
                                    join page on page.page_id = page_proposal.page_id;`)).rows;
    console.log(result);
    if (result) {
      return response.json({
        data: result,
        message: "Get briefings accepted by agency",
        status: 200,
      });
    } else {
      return response.json({
        status: 400,
        message: "Cannot get briefings accepted by agency",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return response.json({
      status: 400,
      message: "Cannot get briefings accepted by agency",
      data: null,
    });
  }
}

export async function getProposalsSent(request: Request, response: Response) {
  try {
    let result = (await pool.query(`select page.company_name, page.address, page.team_members, page.page_id, page.phone_number, page.rating as prating, pro.*, pp.description, pp.price, pp.duration, pp.proposal_date, pp.attachments, u.id, u.lname, u.fname, u.rating, u2.lname as contact_lname, u2.fname as contact_fname, u2.email as contact_email from projects pro 
                                    join proposal pp on pp.project_id = pro.project_id
                                    join users u on u.id = pro.post_by
                                    join page_proposal on pp.proposal_id = page_proposal.proposal_id 
                                    join page on page.page_id = page_proposal.page_id
                                    join users u2 on page.create_by = u2.id`)).rows;
    console.log(result);
    if (result) {
      return response.json({
        data: result,
        message: "Get proposals sent by agency to client’s briefing",
        status: 200,
      });
    } else {
      return response.json({
        status: 400,
        message: "Cannot get proposals sent by agency to client’s briefing",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return response.json({
      status: 400,
      message: "Cannot get proposals sent by agency to client’s briefing",
      data: null,
    });
  }
}

export async function getProposalsAccepted(request: Request, response: Response) {
  try {
    let result = (await pool.query(`select page.company_name, page.address, page.team_members, page.page_id, page.rating as prating, pro.*, pp.description, pp.price, pp.duration, pp.completed_date, u.id, u.lname, u.fname, u.email, u.rating from projects pro  
                                    join proposal pp on (pp.project_id = pro.project_id and pp.accepted >= 2) 
                                    join users u on u.id = pro.post_by
                                    join page_proposal on pp.proposal_id = page_proposal.proposal_id 
                                    join page on page.page_id = page_proposal.page_id;`)).rows;
    console.log(result);
    if (result) {
      return response.json({
        data: result,
        message: "Get proposals sent by agency to client’s briefing",
        status: 200,
      });
    } else {
      return response.json({
        status: 400,
        message: "Cannot get proposals sent by agency to client’s briefing",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return response.json({
      status: 400,
      message: "Cannot get proposals sent by agency to client’s briefing",
      data: null,
    });
  }
}

export async function getCompletedProjects(request: Request, response: Response) {
  try {
    let result = (await pool.query(`select page.company_name, page.address, page.team_members, page.page_id, page.rating as prating, page.email_address, page.phone_number,
                                    pro.*, 
                                    pp.description, pp.price, pp.duration, pp.completed_date, 
                                    u.id, u.lname, u.fname, u.email, u.rating, 
                                    uf.feedback_id as ufeedback_id, uf.note, uf.feedback_rating as ufeedback_rating, uf.client_rate, uf.rated_date as urated_date, 
                                    f.feedback_id as pfeedback_id, f.feedback_description, f.feedback_rating as pfeedback_rating, f.performance, f.rated_date as prated_date
                                    from projects pro  
                                    join proposal pp on (pp.project_id = pro.project_id and pp.accepted >= 3) 
                                    join users u on u.id = pro.post_by
                                    join page_proposal on pp.proposal_id = page_proposal.proposal_id 
                                    join page on page.page_id = page_proposal.page_id
                                    left join user_feedback uf on uf.project_id = pro.project_id 
                                    left join feedbacks f on f.project_id = pro.project_id 
                                    where pro.project_status = 4;`)).rows;
    console.log(result);
    if (result) {
      return response.json({
        data: result,
        message: "Get proposals sent by agency to client’s briefing",
        status: 200,
      });
    } else {
      return response.json({
        status: 400,
        message: "Cannot get proposals sent by agency to client’s briefing",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return response.json({
      status: 400,
      message: "Cannot get proposals sent by agency to client’s briefing",
      data: null,
    });
  }
}