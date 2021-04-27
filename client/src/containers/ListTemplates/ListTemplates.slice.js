import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const listTemplatesSlice = createSlice({
  name: 'listTemplate',
  initialState: {
    templates: [],
    listTemplatesInProgress: false,
    deleteTemplateInProgress: false,
    updateTemplateInProgress: false
  },
  reducers: {
    listTemplatesRequest: (state) => {
      state.listTemplatesInProgress = true;
    },
    listTemplatesSuccess: (state, action) => {
      state.templates = action.payload;
      state.listTemplatesInProgress = false;
    },
    listTemplatesFailure: (state) => {
      state.listTemplatesInProgress = false;
    },
    deleteTemplateRequest: (state) => {
      state.deleteTemplateInProgress = true;
    },
    deleteTemplateSuccess: (state, action) => {
      state.templates = state.templates.filter((t) => t._id !== action.payload);
      state.deleteTemplateInProgress = false;
    },
    deleteTemplateFailure: (state) => {
      state.deleteTemplateInProgress = false;
    },
    updateTemplateRequest: (state) => {
      state.updateTemplateInProgress = true;
    },
    updateTemplateSuccess: (state, action) => {
      state.templates = state.templates.map((t) =>
        t._id === action.payload._id ? action.payload : t
      );
      state.updateTemplateInProgress = false;
    },
    updateTemplateFailure: (state) => {
      state.updateTemplateInProgress = false;
    }
  }
});

const {
  listTemplatesRequest,
  listTemplatesSuccess,
  listTemplatesFailure,
  deleteTemplateRequest,
  deleteTemplateSuccess,
  deleteTemplateFailure,
  updateTemplateRequest,
  updateTemplateSuccess,
  updateTemplateFailure
} = listTemplatesSlice.actions;

export const listTemplates = () => async (dispatch) => {
  try {
    dispatch(listTemplatesRequest());
    const res = await axios.get('/api/templates');

    if (res.status === 200) {
      dispatch(listTemplatesSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(listTemplatesFailure());

    if (error.response.status !== 401) {
      toast.error(error.message);
    }
  }
};

export const deleteTemplate = (templateId) => async (dispatch) => {
  try {
    dispatch(deleteTemplateRequest());
    const res = await axios.delete(`/api/templates/${templateId}`);

    if (res.status === 200) {
      dispatch(deleteTemplateSuccess(templateId));
    }
  } catch (error) {
    console.log(error);
    dispatch(deleteTemplateFailure());
    toast.error(error.message);
  }
};

export const updateTemplate = (templateId, templateData, onClose) => async (
  dispatch
) => {
  try {
    dispatch(updateTemplateRequest());
    const res = await axios.put(`/api/templates/${templateId}`, templateData);

    if (res.status === 200) {
      dispatch(updateTemplateSuccess(res.data));
      onClose();
    }
  } catch (error) {
    console.log(error);
    dispatch(updateTemplateFailure());
    toast.error(error.message);
  }
};

export default listTemplatesSlice.reducer;
