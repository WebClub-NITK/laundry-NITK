<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/WebClub-NITK/laundry-NITK">
    <img src="../frontend/assets/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Central Laundry NITK</h3>

  <p align="center">
    An application to automate mundane tasks done at the Central Laundry, NITK
    <br />
    <a href="https://github.com/WebClub-NITK/laundry-NITK"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/WebClub-NITK/laundry-NITK/issues">Report Bug</a>
    ·
    <a href="https://github.com/WebClub-NITK/laundry-NITK/issues">Request Feature</a>
  </p>
</p>

# Laundry Portal - Backend

A RESTful JSON API webservice for Laundry Portal NITK, written in
Django.

## Installation Instructions

1. *Recommeded:* Create and activate a virtual environment using the
   [following tutorial by Python Packaging Authority](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/).
   * Linux/OSX
      Create Environment
      ```sh
      python3 -m venv env 
      ```
      Activate Environment
      ```sh
      source env/bin/activate
      ```
   * Windows
      Create Environment
      ```sh
      py -m venv env 
      ```
      Activate Environment
      ```sh
      .\env\Scripts\activate
      ```


2. Install application-specific dependencies by:

```bash
pip3 install -r requirements.txt
```

3. Run migrations by:

```bash
python3 manage.py migrate
```

4. Start the server:

```bash
python3 manage.py runserver 8000
```

5. If everything works correctly, you should be able to access Django
site admin on http://localhost:8000/admin.
