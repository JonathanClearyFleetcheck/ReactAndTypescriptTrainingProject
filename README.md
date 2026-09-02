# FleetCheck React And Typescript Training Project
This project gives you a template project with tasks and resource links that will help you get  to grips with React and Typescript

# Installation

### Installation
- First you will need node and node packet manager installed
- Then you will pull the latest version of main and create your own branch to start completing tasks. Please leave main unchanged so that others can start with a nearly blank canvas.
- Open up your repo folder in the console and run npm install to get the latest versions of the npm packages that this project uses. Check the list in package.json before installing to see a list of these packages and their versions.

### Running the Project
- Your now ready to run the project!
- Go back into package.json and take a look at the "scripts" object.
- There you will see some commands that you can run to utilise some of the dev tools in this project. The one you'll need is "build".
- You can run these commands by going back into your console (navigating to your repo folder that contains the packages.json file) and typing "npm run {your-command}" in this case "npm run build".

# Learning Tasks

Here are some tasks you can undertake to improve your understanding of the following concepts each task should have a learning resource associated with it to assist you in understanding the process I'd recommend having a read before attempting each task.

#### General Resources:
- [Learning React](https://react.dev/learn)
- [Typescript Documentation](https://www.typescriptlang.org/docs/)
- [Typescript Tutorial](https://www.w3schools.com/typescript/typescript_intro.php)
- [NPM - Documentation](https://docs.npmjs.com/)

### Tasks
- Add a footer that is always visible similar to the Header(style this as you please). [Helpful Resource](https://react.dev/learn/your-first-component)
- When you click the edit button on a task the task name input should be focused. [Helpful Resource](https://react.dev/reference/react/useRef#manipulating-the-dom-with-a-ref)
- Remove the Edit, Save & Cancel buttons replacing them with events to improve the user experience. You can use onClick, onBlur, onKeyPress(esc & enter) bonus points if you update the styling to help indicate the interactive element. [Helpful Resource](https://react.dev/learn/responding-to-events)
- Add max length validation to the task name input this should include an indicator that appears when the element is focused and styling to indicate when the length is too long or short. It should also prevent unfocusing the element & saving the task name when it is invalid. (Combine what you've learned so far to complete this task)
- Add pagination to the task list. You may notice there are already current page and page size consts in the TaskList component these will need to become state variables. focus first on the pagination and we can worry about page sizing later. You may need to redo some of the styling to support this.
- When adding a new task it would be good to display that new task on the page. Since the new task will always appear last in the list set the current page to the last page so that it is visible. Consider using useMemo to cache the lastPage index so that you don't need to recaculate it on every render. Consider what this will mean when adding an item that would create a new page.
- Add a page size dropdown this should cause any cached calculations that you may have used to recalculate and should set the current page to the first page when it is changed.
- Add a search bar that will filter the tasks by their names. How will you prevent it from recalculating the filtered list each time a render occurs? As this would likely degrade the apps performance.
- Add a select checkbox to each task that allows you to select a task in the list. The selected task should be styled to show that it has been selected and there should be a count of the selected tasks that appears when at least one task is selected. [Helpful Resource](https://react.dev/learn/managing-state)
