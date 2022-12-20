import { Schema, model } from "mongoose";
import Post from "./post.interface";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
    },

    fileContent: {
      type: String,
    },
  
    filePath: {
      type: String,
    },
    
    calculationResult: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<Post>("Post", PostSchema);
