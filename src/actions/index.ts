
import {createAction} from 'redux-actions'

const SET_ARTICLE = "SET_ARTICLE";

/**
 * 所有action的名称
 */
export const actionNames = {
  SET_ARTICLE
}

const setArticle = createAction('SET_ARTICLE')

/**
 * 所有的action
 */
export const actions = {
  setArticle
}