### Topics 


:small_blue_diamond: [Requirements](#Requirements)

:small_blue_diamond: [Installing dependencies](#Installing-dependencies)

:small_blue_diamond: [Running application](#Running-application)

:small_blue_diamond: [Frontend Features](#Frontend-Features)

:small_blue_diamond: [Backend Endpoints](#Backend-Endpoints)

:small_blue_diamond: [Unit tests](#Unit-tests)


## Requirements

### Python (3.12)
- Go to python.org ([here](https://www.python.org/downloads/)) and download Python version 3.12.

### NodeJs
- Go to nodejs.org ([here](https://nodejs.org/en/download)) and download latest version.

### PostgresSQL
- To enable the PostgreSQL database, you need to install it. Download [PostgreSQL](https://www.postgresql.org/download/) and install the version for your operating system.  
- You only need to create the database instance; tables will be created automatically.

## Installing dependencies

### Backend
```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

### Frontend
```sh
cd frontend
npm install
```

## Running application

### Backend
- Set up your PostgreSQL database and update the DB_URL in backend/.env. (Check backend/.env_example for configuration details.)
- Start the backend server:
```sh
cd backend
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
uvicorn main.app:app --port 8000 --reload # The frontend is configured to connect to port 8000
```
### Frontend
- Open a new terminal and run
```sh
cd frontend
npm run dev
```

## Frontend Features

### Adding Variables  
- Click the **Start** button:  
  ![image](https://github.com/user-attachments/assets/f9739bbc-6277-4fb2-8790-f0b32b8e0df4)  
- Insert the field name and its value in the opened vertical bar:  
  ![image](https://github.com/user-attachments/assets/4160e180-8cf2-45f0-b150-b8110f82f2f4)  
- Click the **Green Plus** button to add more variables:  
  ![image](https://github.com/user-attachments/assets/9be3ab1e-e5c8-4d92-89f1-2f741e558cd3)  
- Click the **Red Minus** button to remove the last variable:  
  ![image](https://github.com/user-attachments/assets/cef71e33-e6fb-4cb6-81cf-d1768defc1b5)  
- After filling all fields, click **Save**:  
  ![image](https://github.com/user-attachments/assets/bc1d68e6-8e4f-4d84-8e89-6e2c43db698b)  

### Adding New Nodes  
- Click the **Green Plus** button in the middle of other nodes:  
  ![image](https://github.com/user-attachments/assets/817540fe-245f-4385-aca5-641f3d7ec0de)  
- Click the **Diamond** to add a new conditional node:  
  ![image](https://github.com/user-attachments/assets/756df133-f5e1-4c32-89f0-ad7911a32ed5)  

### Adding Data to a Conditional Node  
- Click the **Conditional Node**:  
  ![image](https://github.com/user-attachments/assets/79aeb73d-1cbb-4cb9-98e3-d2e2f54bb753)  
- In the **first field**, add the variable name (the field inserted in the start node) to compare:  
  ![image](https://github.com/user-attachments/assets/3ceccc08-0940-4deb-899d-158c351f1331)  
- Select the **condition** to compare:  
  ![image](https://github.com/user-attachments/assets/4ba7436f-6913-443d-8fea-c22584103983)  
- Add the **value** to compare:  
  ![image](https://github.com/user-attachments/assets/95a542bd-4402-47af-b3f0-659981beab04)  
- Click **Save**:  
  ![image](https://github.com/user-attachments/assets/2255241e-8545-4106-935d-2bbd5e1378e9)  

### Adding Decision Data (End Data)  
- Click the **End Node**:  
  ![image](https://github.com/user-attachments/assets/987f5345-76a4-41ec-b252-0d4eeb70c873)  
- Add **decision data** (the data that will return if the condition is true):  
  ![image](https://github.com/user-attachments/assets/e4cc7566-c3ee-4685-a8c5-8fb875962ab9)  
- Click **Save**:  
  ![image](https://github.com/user-attachments/assets/f130f03c-6a99-48ac-b509-9b9d9f10ec29)  

### Saving the Tree  
- After configuring the tree, click **Save Tree**:  
  ![image](https://github.com/user-attachments/assets/daf43cee-df43-4a15-9499-2e14d54f964e)  
- A message will appear:  
  ![image](https://github.com/user-attachments/assets/0472f259-3d40-46e8-9bf0-1e62956a8483)  

### Executing the Decision Algorithm  
- After configuring and saving the tree, click **Execute**:  
  ![image](https://github.com/user-attachments/assets/96a688d6-42f1-474d-af69-6836fe5e15ee)  
- A modal will appear with the decision (if the end node was configured) or with a message:  
  ![image](https://github.com/user-attachments/assets/2dd903fd-25b2-4511-a151-8a008f5df973)  
  ![image](https://github.com/user-attachments/assets/d21d1df1-4172-46f1-baaa-9b2df38243e2)  
- Click outside the modal or on the **X** button to close it:  
  ![image](https://github.com/user-attachments/assets/ae72dc09-b689-4344-af60-279d38eb40cd)  

### Note:  
- The **right side** represents the **True** condition.  
- The **left side** represents the **False** condition.  
- When the condition is **True**, the application will iterate through the **right side** of the tree.  

## Backend Endpoints

### Retrieve Decision Tree
**GET** ``/decision_tree/retrieve``
- Acts as a singleton, retrieving only the first instance in the database.
- Response:
```
{
  label: '...',
  type: '...',
  right: {label: '...', type: '...', right: {}, left: {}},
  left: {label: '...', type: '...', right: {}, left: {}}
}
```

### Create or Update Decision Tree
**POST** ``/decision_tree/execute``
- Checks if an instance exists. If not, it creates one (only one instance per database).
- Request & Response:
```
{
  label: '...',
  type: '...',
  right: {label: '...', type: '...', right: {}, left: {}},
  left: {label: '...', type: '...', right: {}, left: {}}
}
```

### Execute Decision Tree
**POST** ``/decision_tree/execute``
- Request:
```
[
  { "name": "age", "value": "23" },
  { "name": "income", "value": "3000" }
]
```
- Receives input data.
- Tries to retrieve the decision tree from the database. If it does not exist, returns a message to the user.
- Iter through tree nodes, evaluating conditions to determine the correct path.
- If a condition is invalid, returns a message to the user.
- If successful, returns the decision.
- Response:
```
{
  "decision": "1000.0"
}
```

### Unit Tests

- To run the tests, execute the following command in the terminal:
```sh
pytest
```

The unit tests cover the following scenarios:

- Retrieving a decision tree when none exists.
- Creating or updating a decision tree.
- Executing a decision tree when none exists.
- Executing a decision tree with valid conditions.
- Handling invalid conditions in the decision tree.