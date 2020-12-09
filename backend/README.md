# Laundry Portal - Backend

A RESTful JSON API webservice for Laundry Portal NITK, written in
Django.

## Installation Instructions

1. *Recommeded:* Install pip, create and activate a virtual environment using the
   [following tutorial by Python Packaging Authority](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/).

2. Install application-specific dependencies by:

```bash
pip install -r requirements.txt
```

3. Run migrations by:

```bash
python manage.py migrate
```

4. Start the server:

```bash
python manage.py runserver 8000
```

5. If everything works correctly, you should be able to access Django
site admin on http://localhost:8000/admin.
