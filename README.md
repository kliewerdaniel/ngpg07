PersonaGen is an open-source tool designed to streamline the creation of detailed and realistic personas for various applications, including marketing, game development, and UX design. By leveraging advanced AI algorithms, it enables users to generate comprehensive persona profiles tailored to specific project requirements.

**Key Features:**

- **Customizable Persona Generation:** Create personas that align with your project's unique needs by adjusting various attributes.
- **Diverse Templates:** Utilize a selection of templates suitable for different industries and use cases.
- **Real-Time Updates:** Modify persona attributes dynamically and observe immediate changes.
- **User-Friendly Interface:** Navigate through an intuitive design that enhances productivity and ease of use.

<img width="942" alt="Screen Shot 2024-12-05 at 1 52 05 PM" src="https://github.com/user-attachments/assets/51012138-77da-4b0a-91fc-48371a43c10e">
<img width="942" alt="Screen Shot 2024-12-05 at 1 52 13 PM" src="https://github.com/user-attachments/assets/b22a52e7-23d2-4519-a308-71144f1c0915">
<img width="942" alt="Screen Shot 2024-12-05 at 1 52 29 PM" src="https://github.com/user-attachments/assets/cec1793d-b0aa-4dd9-b34e-5ce4ccee7f12">
<img width="942" alt="Screen Shot 2024-12-05 at 1 52 51 PM" src="https://github.com/user-attachments/assets/cba53248-7b64-4214-8dbc-b92884102634">

<img width="942" alt="Screen Shot 2024-12-05 at 3 42 39 PM" src="https://github.com/user-attachments/assets/299570cc-ec5c-4cb7-ba96-51968f35e103">
<img width="942" alt="Screen Shot 2024-12-05 at 4 33 58 PM" src="https://github.com/user-attachments/assets/b1b742cb-df38-4b05-936e-97ee3815b96b">





**Installation:**

To install PersonaGen, follow these steps:

# Step 1: Set up a Python virtual environment

python3 -m venv venv

source venv/bin/activate

pip install --upgrade pip

# Step 2: Create a .env file

echo "# Environment variables go here" > .env

# Step 3: Create a .gitignore file with appropriate entries

cat <<EOL > .gitignore

.env

node_modules

venv

__pycache__/

*.pyc

*.pyo

db.sqlite3

EOL

# Step 4: Clone the repository

git clone https://github.com/kliewerdaniel/PersonaGen.git

cd PersonaGen05/backend

# Step 5: Set up the Django backend

python3 manage.py createsuperuser!

python3 manage.py makemigrations

python3 manage.py migrate

python3 manage.py runserver 


# Step 6: Set up the frontend

cd ../ghost-writer-frontend

npm install

npm run dev



