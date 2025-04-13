export interface WorkoutPlan {
  id: number;
  name: string;
  createdBy: CreatedBy;
  assignedTo: AssignedTo | null;
  workoutPlanEntries: WorkoutPlanEntry[];
}

export interface CreateWorkoutPlan {
  name: string;
  createdBy: Creator;
  assignedTo: Assignee | null;
  workoutPlanEntries: WorkoutPlanEntry[];
}

export interface Creator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
}

export interface Assignee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
}

export interface WorkoutPlanEntry {
  reps: number;
  sets: number;
  weight: number;
  exercise: string;
  muscleGroup: string;
}

export interface CreatedBy {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
}

export interface AssignedTo {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
}

export interface WorkoutPlanProps {
  workoutPlan: WorkoutPlan;
}
