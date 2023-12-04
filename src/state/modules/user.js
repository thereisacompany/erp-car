export const state = {
  UserID: 0,
  LoginName:'',  
  Username: '',
  Token: '',
  TreeList:[],
  UserObj:[],
}

export const mutations = {
  CHANGE_UserID(state, value) { state.UserID = value; },
  CHANGE_LoginName(state, value) { state.LoginName = value; },
  CHANGE_Username(state, value) { state.Username = value; },
  CHANGE_Token(state, value) { state.Token = value; },
  CHANGE_TreeList(state, value) { state.TreeList = value; },
  UserReset(state) { 
    state.UserID= 0;
    state.LoginName='';
    state.Username= '';
    state.Token= '';    
    state.TreeList=[];
   },
   CHANGE_UserObj(state, value) {
    console.log("Change Userobj",value)
    state.UserObj = value; },
 
}

export const actions = {
  changeUserID({ commit }, { value }) { commit('CHANGE_UserID', value); },
  changeLoginName({ commit }, { value }) { commit('CHANGE_LoginName', value); },
  changeUsername({ commit }, { value }) { commit('CHANGE_Username', value); },
  changeToken({ commit }, { value }) { commit('CHANGE_Token', value); },  
  changeTreeList({ commit }, { value }) { commit('CHANGE_TreeList', value); },
  UserReset({ commit }) { commit('UserReset'); },
  changeUserObj({ commit }, { value }) { commit('CHANGE_UserObj', value); },
 
}
