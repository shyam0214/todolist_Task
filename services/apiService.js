const fetchWithRateLimit = require("./rateLimiter");

async function fetchCompleteTodoistTree() {
  try {
    // Fetching all projects
    const projects = await fetchWithRateLimit("/projects");

    const projectData = await Promise.all(
      projects.map(async (project) => {
        try {
          // Fetching sections for each project
          const sections = await fetchWithRateLimit(`/sections?project_id=${project.id}`);

          // Enrich each section with tasks
          const enrichedSections = await Promise.all(
            sections.map(async (section) => {
              try {
                // Fetching tasks for each section
                const tasks = await fetchWithRateLimit(`/tasks?section_id=${section.id}`);

                // Enrich each task with comments
                const enrichedTasks = await Promise.all(
                  tasks.map(async (task) => {
                    try {
                      const comments = await fetchWithRateLimit(`/comments?task_id=${task.id}`);
                      return { ...task, comments }; // Attach comments to the task
                    } catch (taskError) {
                      console.error(`Error fetching comments for task ${task.id}:`, taskError);
                      return { ...task, comments: [] }; // Return task with no comments on error
                    }
                  })
                );

                // Return enriched section
                return { ...section, tasks: enrichedTasks };
              } catch (sectionError) {
                console.error(`Error fetching tasks for section ${section.id}:`, sectionError);
                return { ...section, tasks: [] }; // Return section with no tasks on error
              }
            })
          );

          // Return enriched project data
          return { ...project, sections: enrichedSections };
        } catch (projectError) {
          console.error(`Error fetching sections for project ${project.id}:`, projectError);
          return { ...project, sections: [] }; // Return project with no sections on error
        }
      })
    );

    // Return the complete nested structure
    return projectData;
  } catch (error) {
    console.error("Error fetching Todoist tree:", error);
    return []; // Return an empty array if the entire fetch operation fails
  }
}

module.exports = {fetchCompleteTodoistTree};
