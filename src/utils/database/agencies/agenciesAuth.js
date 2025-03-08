import supabase from '../supabase';
import { insertAgency, getAgencyById, updateAgency, deleteAgency, updateAgencyAdmins } from './agenciesAPI';

// Function to create a new agency
const createAgency = async (agencyData) => {
  const { data, error } = await insertAgency(agencyData);

  if (error) {
    throw error;
  }

  return data;
};

// Function to retrieve an agency by ID
const getAgency = async (agencyId) => {
  const { data, error } = await getAgencyById(agencyId);

  if (error) {
    throw error;
  }

  return data;
};

// Function to update an agency
const editAgency = async (agencyId, updates) => {
  const { data, error } = await updateAgency(agencyId, updates);

  if (error) {
    throw error;
  }

  return data;
};

// Function to delete an agency
const removeAgency = async (agencyId) => {
  const { data, error } = await deleteAgency(agencyId);

  if (error) {
    throw error;
  }

  return data;
};

// Function to add or remove admins for an agency
const manageAgencyAdmins = async (agencyId, userId, action) => {
  const { data, error } = await updateAgencyAdmins(agencyId, userId, action);

  if (error) {
    throw error;
  }

  return data;
};

export { createAgency, getAgency, editAgency, removeAgency, manageAgencyAdmins };
