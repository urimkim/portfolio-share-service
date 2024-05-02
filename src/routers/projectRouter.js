import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { ProjectService } from '../services/projectService';

const projectRouter = Router();
projectRouter.use(login_required);

projectRouter.post('/project/create', async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const content = req.body.content;

    // 위 데이터를 유저 db에 추가하기
    const newProject = await ProjectService.addProject({
      user_id,
      title,
      content,
    });

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get('/projects/:id', async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const projectId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 찾기
    const project = await ProjectService.getProject({ projectId });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).send(projcet);
  } catch (error) {
    next(error);
  }
});

projectRouter.put('/projects/:id', async function (req, res, next) {
  try {
    // URI로부터 프로젝트 데이터 id를 추출함.
    const projectId = req.params.id;

    // body data 로부터 업데이트할 프로젝트 정보를 추출함.
    const title = req.body.title ?? null;
    const content = req.body.content ?? null;

    const toUpdate = { title, content };

    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const project = await ProjcetService.setProject({ projectId, toUpdate });

    if (project.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
});

projectRouter.delete('/projects/:id', async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const projectId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await ProjcetService.deleteProjcet({ projcetId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

projectRouter.get('/projcetlist/:user_id', async function (req, res, next) {
  try {
    // 특정 사용자의 전체 프로젝트 목록을 얻음
    // @ts-ignore
    const user_id = req.params.user_id;
    const projcetList = await ProjcetService.getProjcetList({ user_id });
    res.status(200).send(projcetList);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
