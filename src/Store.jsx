import { configureStore } from "@reduxjs/toolkit";
import tasksSlices from "./Slice/tasksSlices";
// import other slices here if needed

export const store = configureStore({
  reducer: {
    task: tasksSlices,
    // other slices can be added here
  },
  // middleware: (getDefaultMiddleware) => 
  //   getDefaultMiddleware().concat(customMiddleware), // If you have custom middleware
});
