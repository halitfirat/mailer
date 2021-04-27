import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import sendEmailReducer from './containers/SendEmail/SendEmail.slice';
import listEmailsReducer from './containers/ListEmails/ListEmails.slice';
import listTemplatesReducer from './containers/ListTemplates/ListTemplates.slice';

export default configureStore({
  reducer: {
    auth: authReducer,
    sendEmail: sendEmailReducer,
    listEmails: listEmailsReducer,
    listTemplates: listTemplatesReducer
  }
});
