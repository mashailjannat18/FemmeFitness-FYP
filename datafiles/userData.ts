import { supabase } from '@/lib/supabase';

export type UserData = {
  username: string; // Added username field
  age: number;
  weight: number;
  height: number;
  diseases: string[];
  goal: number | string;
  areasOfFocus: string | string[];
  activityLevel: number;
  intensityLevel: string;
  challengeDays: string;
  email: string;
  password: string;
};

let userData: UserData = {
  username: '', // Initialize username field
  age: 0,
  weight: 0,
  height: 0,
  diseases: [],
  goal: '',
  areasOfFocus: '',
  activityLevel: 0,
  intensityLevel: '',
  challengeDays: '',
  email: '',
  password: '',
};

export const setUserData = (screenKey: keyof UserData, data: number | string | string[]): void => {
  userData = {
    ...userData,
    [screenKey]: data,
  };
};

export const getUserData = (): UserData => {
  return { ...userData };
};

export const addUserToSupabase = async (): Promise<void> => {
  try {
    const { data, error } = await supabase.from('User').insert([
      {
        username: userData.username, // Insert username
        email: userData.email,
        password: userData.password,
        age: userData.age,
        weight: userData.weight,
        height: userData.height,
        diseases: Array.isArray(userData.diseases)
          ? userData.diseases.join(', ')
          : userData.diseases,
        goal: userData.goal,
        areas_of_focus: Array.isArray(userData.areasOfFocus)
          ? userData.areasOfFocus.join(', ')
          : userData.areasOfFocus,
        activity_level: userData.activityLevel,
        intensity_level: userData.intensityLevel,
        challenge_days: userData.challengeDays,
      },
    ]);

    if (error) {
      console.error('Error saving user data:', error.message);
    } else {
      console.log('Data successfully saved:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};
