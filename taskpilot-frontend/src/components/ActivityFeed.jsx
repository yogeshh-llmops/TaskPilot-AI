export default function ActivityFeed() {
  const activities = [
    "Employee added successfully",
    "Project updated",
    "Analytics synced",
    "Task assigned",
    "Dashboard refreshed",
  ];

  return (
    <div className="card">
      <h3>📢 Recent Activities</h3>

      <div className="activity-list">
        {activities.map((item, index) => (
          <div
            key={index}
            className="activity-item"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}