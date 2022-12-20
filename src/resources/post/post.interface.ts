import { Document } from "mongoose";

export default interface Post extends Document {
    title: string;
    fileName: string;
    fileContent: string;
    filePath: string;
    calculationResult: string;
}