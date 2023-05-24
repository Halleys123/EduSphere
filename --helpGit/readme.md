
# Pushing Changes to Master Branch - Collaborative Team Workflow
1.  **Switch to your branch**: Create a new branch or switch to an existing branch dedicated to your feature or bug fix. Use a descriptive name for your branch that reflects the purpose of your changes.
    
2.  **Pull on your branch**: Before starting your work, pull the latest changes from the remote repository to your local branch. This ensures that your branch is up to date with the latest changes made by other team members. Run the following command:
```bash
`git pull origin <your-branch-name>`
```
Replace `<your-branch-name>` with the actual name of your branch.
    
3.  **Work on your branch**: Make the necessary changes and improvements on your local branch. Write code, fix bugs, or implement new features as required.
    
4.  **Commit your changes**: Once you have made the desired changes, commit them to your local branch. Committing is a way of saving your changes and creating a checkpoint for your work. Use meaningful commit messages that describe the changes made. Run the following command:
```bash
`git commit -m <your commit message>`
```
Replace `"Your commit message"` with a concise and descriptive message.
    
5.  **Push your branch to GitHub**: Push your local branch to the remote repository on GitHub to make your changes available for others to review. Run the following command:
```bash
`git push origin <your-branch-name>`
```
6.  Replace `<your-branch-name>` with the actual name of your branch.
    
7.  **Create a pull request**: After pushing your branch to GitHub, go to the repository's GitHub page and navigate to the "Pull Requests" tab. Click on the "New pull request" button. In the pull request interface, select your branch as the "compare" branch and the "master" branch as the "base" branch. Provide a clear title and description for your pull request, outlining the changes made and their purpose.
    
8.  **Wait for others to review and approve your changes**: Once the pull request is created, notify your team members and wait for them to review your changes. They will provide feedback, suggestions, and approve the changes if everything looks good. Collaborate with the team and address any necessary changes or discussions.
    
9.  **Merge the pull request to the master branch**: If your changes are approved and meet the project's requirements, a team member with the necessary permissions will merge your branch into the master branch. They will handle the merge process while ensuring the stability and integrity of the master branch.

---
For further reading please refer to 
[Creating a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) 

