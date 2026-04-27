# CS 351 Final Project

This is my and Blake Brownlee's submission for the website portion of the final project for CS351. In order to run this project, you will need to have Python installed on your system, along with the following:

**Node Package Manager**: <br />
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

**Vite**: <br />
``npm install vite``

**pip**: <br />
On Linux, this should come with your python install. <br />
On Windows:
https://www.geeksforgeeks.org/installation-guide/how-to-install-pip-on-windows/

When all of the above is installed, do the following to run the website:
1. Open a terminal in both frontend and backend
2. Run pip install in the backend, create a venv if it asks you to
   * In Linux, this is how you create the venv:
       * Open a terminal in backend
       * run 'source venv/bin/activate'
       * run 'pip install -r ./requirements.txt'
   * On Windows, this is how you do it:
       * Navigate to 'backend' in cmd
       * Delete 'venv' folder if it exists
       * run 'python -m venv venv'
       * run 'venv\Scripts\activate'
       * run 'pip install -r ./requirements.txt'
3. After pip is done, run the main.py file to start the backend server
4. In the frontend terminal, run npm run dev

NOTE: This website was developed and tested in Linux, as it is what both I and Blake primarily use. If you are testing this website in Windows and run into problems getting it set up, please reach out and I will be happy to help you troubleshoot.

Multiple Employees are provided for testing purposes. To login, you will need their employee IDs. They are below:
* Oliver Keller, Mechanic: 1
* Jessie Henderson, Billing: 2
* Whittney Silvertongue, Sales: 3

After logging in, you should see the dashboard and be able to begin testing.




