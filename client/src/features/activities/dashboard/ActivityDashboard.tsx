import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../detail/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectedActivity?: Activity;
  selectActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  openForm: (id?: string) => void;
  closeForm: () => void;
  editMode: boolean
};

export default function ActivityDashboard({ activities, selectedActivity, selectActivity, onCancelSelectActivity, editMode, openForm, closeForm}: Props) {
  return (
    <Grid2 container spacing={3}>
          <Grid2 size={7}>
              <ActivityList 
                activities={activities}
                selectActivity={selectActivity}
              />
              
        </Grid2>
        <Grid2 size={5}>
          {selectedActivity && !editMode && (
            <ActivityDetail 
              selectActivity={selectedActivity}
              onCancelSelectActivity={onCancelSelectActivity}
              openForm={openForm}
            />
          )}

          {editMode && <ActivityForm 
          closeForm={closeForm} 
          activity={selectedActivity} 
          />}
        </Grid2>
    </Grid2>
  )
}
