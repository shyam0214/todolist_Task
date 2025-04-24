const fs = require("fs");
const path = require("path");
const { fetchCompleteTodoistTree } = require("./services/apiService");
const { writeDataToFile } = require("./utils/writeToFile");
async function main() {
  try {
    console.log("start sever and fetch data from todoist api .....");

    const data = await fetchCompleteTodoistTree();

    console.log("Data fetched successfully from Todoist API");
    const transformedResponse = data.map(project => ({
      id: parseInt(project.id), // Convert the ID to an integer if needed
      name: project.name,
      sections: project.sections.map(section => ({
        id: parseInt(section.id),
        name: section.name,
        tasks: section.tasks.map(task => ({
          id: parseInt(task.id),
          content: task.content,
          comments: task.comments.map(comment => ({
            id: parseInt(comment.id),
            content: comment.content
          }))
        }))
      }))
    }));
    const filePath = writeDataToFile(transformedResponse, "todoistData.json", "data");
    console.log(` Data saved successfully to ${filePath}`);
  } catch (error) {
    console.log(" Error fetching or saving data:", error.message);
    return error
  }
}

main();
