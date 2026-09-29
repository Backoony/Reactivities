import { Box, Grid2, Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react"
import ProfileUserActivities from "./ProfileUserActivities";

export default function ProfileEvent() {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  const tabContent = [
    { label: 'Future Events', content: <ProfileUserActivities activeTab={value} /> },
    { label: 'Past Events', content: <ProfileUserActivities activeTab={value} /> },
    { label: 'Hosting', content: <ProfileUserActivities activeTab={value} /> }
  ]

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Tabs orientation="horizontal" value={value} onChange={handleChange}  >
            {tabContent.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Grid2>
      </Grid2>
      {tabContent[value].content}
    </Box>
  )
}