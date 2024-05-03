const { Router } = require("express");
const { Project } = require("../db");
const { v4: uuidv4 } = require("uuid");

const projectRouter = Router();

projectRouter.post("/projects", async function (req, res, next) {
  try {
    const { userId, title, content } = req.body;
    
    const newProject = await Project.create({
      id: uuidv4(), // 새로운 UUID 생성
      userId,
      title,
      content,
    });

    // 생성된 프로젝트를 응답으로 전송
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});


// 특정 사용자의 모든 프로젝트 조회
projectRouter.get("/projects/:userId", async function (req, res, next) {
  try {
    // 요청에서 userId 추출
    const userId = req.params.userId;

    // 해당 사용자의 모든 프로젝트를 조회
    const projects = await Project.findByUserId({ userId });

    // 조회된 프로젝트를 응답으로 전송
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

// 특정 프로젝트 수정
projectRouter.put("/projects/:userId", async function (req, res, next) {
  try {
    // 요청에서 userId 추출
    const userId = req.params.userId;

    // 요청 본문에서 수정할 데이터 추출
    const { title, content } = req.body;

    // 수정할 필드와 값을 설정
    const toUpdate = {};
    if (title) toUpdate.title = title;
    if (content) toUpdate.content = content;

    // 프로젝트 업데이트
    const updatedProject = await Project.update({
      userId,
      toUpdate,
    });

    // 업데이트된 프로젝트를 응답으로 전송
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

// 특정 프로젝트 삭제
projectRouter.delete("/projects/:userId", async function (req, res, next) {
  try {
    // 요청에서 projectId 추출
    const userId = req.params.userId;

    // 프로젝트 삭제
    const result = await Project.deleteById({ userId });

    // 삭제 결과를 응답으로 전송
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = { projectRouter };
