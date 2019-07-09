
import { StoreState, ArticleType } from './../../types/index';
import { handleActions, Action } from 'redux-actions';
import { actionNames } from 'actions';

const initialState:StoreState ={
  editingArticle : {
    _id:'',
    content:'',
    title:'',
    tags:[],
    author:'',
    createTime:''
  }
}


export default handleActions<StoreState,ArticleType>({
  [actionNames.SET_ARTICLE]:(state:StoreState,action:Action<ArticleType>):StoreState=>{
    return {...state,editingArticle:{...state.editingArticle,...action.payload}}
  }
},
  initialState
)