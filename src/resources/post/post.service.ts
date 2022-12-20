import PostModel from './post.model';
import Post from './post.interface';
import App from './../../app';
import { appendFile } from 'fs';
class PostService {
    private post = PostModel;
    
    public async create(title: string, fileName: string, fileContent: string, filePath:string, calculationResult: number ): Promise<Post> {
        try {
            const post = await this.post.create({ title, fileName, fileContent, filePath, calculationResult });
            console.log(post);
            
            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }

    public async getAll(): Promise<Post[]> {
        try {
            const allCalculation = await this.post.find();
            return allCalculation;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }
}

export default PostService;