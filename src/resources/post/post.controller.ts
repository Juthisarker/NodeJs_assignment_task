import { Router, Request, Response, NextFunction } from 'express';
import Controller from  './../../utils/interfaces/controller.interface';
import HttpException from './../../utils/exceptions/http.exception';
import validationMiddleware  from './../../middleware/validation.middleware';
import PostService from './post.service';
import validate from './post.validation';
import * as fs from 'fs';
class PostController implements Controller {

    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(`${this.path}`,validationMiddleware(validate.create), this.create);
        this.router.get(`${this.path}/all`,validationMiddleware(validate.create), this.getAll);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
           const { title, fileName, fileContent, calculationResult } = req.body;
            let filePath = `https://${req.get("host")}/files/${fileName}`;              
           const post = await this.PostService.create(title, fileName, fileContent, filePath, calculationResult );
            if(post){                
                fs.writeFileSync(
                    fileName,
                    fileContent
                  );
            }
        res.status(200).json({ post });
        } catch (error) {
            next(new HttpException(400, 'Cannot create post'));
        }
    };

    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {          
        const allresult = await this.PostService.getAll();
        res.status(200).json(allresult);
        } catch (error) {
            console.log(req.body);
            next(new HttpException(400, 'Cannot create post'));
        }
    };
}

export default PostController;