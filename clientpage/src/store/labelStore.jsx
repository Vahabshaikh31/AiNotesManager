import { create } from "zustand";
import {
  fetchMainLabel,
  fetchSubLabels,
  fetchSubSubLabels,
  fetchChats,
  addMainLabel,
  addSubLabel,
  addSubSubLabel,
  sendMessage,
} from "@/utils/ChatAPi";

const useLabelStore = create((set) => ({
  mainLabels: [],
  subLabels: [],
  subSubLabels: [],
  chats: [],
  selectedMainLabel: null,
  selectedSubLabel: null,
  selectedSubSubLabel: null,

  setSelectedMainLabel: (mainLabel) => {
    set({ selectedMainLabel: mainLabel });
  },

  setSelectedSubLabel: (subLabel) => {
    set({ selectedSubLabel: subLabel });
  },

  setSelectedSubSubLabel: (subSubLabel) => {
    set({ selectedSubSubLabel: subSubLabel });
  },

  // Fetch only Main Labels
  fetchMainLabels: async (username) => {
    try {
      const response = await fetchMainLabel(username);
      set({ mainLabels: response });
    } catch (error) {
      console.error("Error fetching main labels:", error);
    }
  },

  // Fetch only Sub Labels under a Main Label
  fetchSubLabels: async (mainLabelName) => {
    try {
      const response = await fetchSubLabels(mainLabelName);
      set({ subLabels: response });
    } catch (error) {
      console.error("Error fetching sub labels:", error);
    }
  },

  // Fetch only Sub-Sub Labels under a Sub Label
  fetchSubSubLabels: async (subLabelName) => {
    try {
      const response = await fetchSubSubLabels(subLabelName);
      set({ subSubLabels: response.data ?? response }); // Ensure it's an array
      console.log("Updated subSubLabels:", response.data ?? response); // Debugging log
    } catch (error) {
      console.error("Error fetching sub-sub labels:", error);
    }
  },
  // Fetch Chat History for a Sub-Sub Label
  fetchChats: async (subSubLabelName) => {
    try {
      const response = await fetchChats(subSubLabelName);
      set({ chats: response });
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  },

  // Add a Main Label
  addMainLabel: async (username, mainLabelName) => {
    try {
      const response = await addMainLabel(username, mainLabelName);
      set((state) => ({
        mainLabels: [...state.mainLabels, response.mainLabel],
      }));
    } catch (error) {
      console.error("Error adding main label:", error);
    }
  },

  // Add a Sub Label
  addSubLabel: async (mainLabelName, subLabelName) => {
    try {
      const response = await addSubLabel(mainLabelName, subLabelName);
      set((state) => ({
        subLabels: [...state.subLabels, response.subLabel],
      }));
    } catch (error) {
      console.error("Error adding sub label:", error);
    }
  },

  // Add a Sub-Sub Label
  addSubSubLabel: async (subLabelName, subSubLabelName) => {
    try {
      const response = await addSubSubLabel(subLabelName, subSubLabelName);
      set((state) => ({
        subSubLabels: [...state.subSubLabels, response.subLabel],
      }));
    } catch (error) {
      console.error("Error adding sub-sub label:", error);
    }
  },

  // Send a Chat Message
  sendMessage: async (subSubLabelName, message) => {
    try {
      const response = await sendMessage(subSubLabelName, message);
      set((state) => ({
        chats: [...state.chats, response.userMessage, response.botMessage],
      }));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },
}));

export default useLabelStore;
