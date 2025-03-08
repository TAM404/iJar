import { defineStore } from 'pinia';
import { signUp, signIn, signOut } from '../utils/database/users/usersAuth';
import { getUserById as fetchUser, updateUserProfile } from '../utils/database/users/usersAPI';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async signUp({ email, password, userData }) {
      try {
        this.loading = true;
        this.error = null;

        // Call the signUp function from usersAuth.js which handles both auth and user data
        const { user, data } = await signUp(email, password, {
          name: userData.name,
          phonenumber: userData.phonenumber,
          birthday: userData.birthday,
          locations: userData.locations || [],
          favorites: userData.favorites || []
        });

        if (!user) {
          throw new Error('Failed to create user account');
        }

        // Set the user state with combined auth and profile data
        this.user = {
          id: user.id,  // Changed from uid to id
          email: user.email,
          ...data
        };

        return { success: true };
      } catch (error) {
        console.error('Signup error:', error);
        this.error = error.message;
        return { error: error.message };
      } finally {
        this.loading = false;
      }
    },

    async signIn(email, password) {
      try {
        this.loading = true;
        this.error = null;

        // Call the signIn function from usersAuth.js
        const { user, userData } = await signIn(email, password);

        if (!user) {
          throw new Error('Invalid login credentials');
        }

        // Combine auth user and profile data
        this.user = {
          id: user.id,  // Changed from uid to id
          email: user.email,
          ...userData
        };

        return { success: true };
      } catch (error) {
        console.error('Sign in error:', error);
        this.error = error.message;
        return { error: error.message };
      } finally {
        this.loading = false;
      }
    },

    async signOut() {
      try {
        this.loading = true;
        await signOut();
        this.user = null;
        return { success: true };
      } catch (error) {
        console.error('Sign out error:', error);
        this.error = error.message;
        return { error: error.message };
      } finally {
        this.loading = false;
      }
    },

    async fetchUser(userId) {
      try {
        this.loading = true;
        const userData = await fetchUser(userId);
        if (userData) {
          this.user = userData;
        }
        return userData;
      } catch (error) {
        console.error('Fetch user error:', error);
        this.error = error.message;
        return null;
      } finally {
        this.loading = false;
      }
    },

    async updateUserProfile(name, phone, birthday, locations, favorites) {
      try {
        this.loading = true;
        if (!this.user?.id) {
          throw new Error('No user logged in');
        }

        const updatedUser = await updateUserProfile(this.user.id, {
          name,
          phonenumber: phone,
          birthday,
          locations,
          favorites
        });

        this.user = {
          ...this.user,
          ...updatedUser
        };

        return { success: true };
      } catch (error) {
        console.error('Update profile error:', error);
        this.error = error.message;
        return { error: error.message };
      } finally {
        this.loading = false;
      }
    }
  }
});
