
export interface UserType  {
  _id:string;
  username:string;
  password:string
}
export interface ArticleType {
  _id:string;
  content:string;
  title:string;
  tags:string[];
  author:string;
  createTime:string
}

export interface StoreState {
  editingArticle:ArticleType;
}