## Mobile Friendly Pokemon Go app.

This is a variation on https://github.com/AHAAAAAAA/PokemonGo-Map/ with Pokemon Go styling and easy deployment via Heroku.
Thanks to AHAAAAAAA and contributors for their wonderful API, and samanpwbb for the design tips.

![image](https://cloud.githubusercontent.com/assets/11202803/17264594/e56825f8-559c-11e6-9932-832943afe6c5.png)

## Usage
#### Installation

```
$ virtualenv env
$ source env/bin/activate
$ pip install -r requirements.txt
```

#### Run

`$ python run.py -u USERNAME -p PASSWORD -st 3 -l "37.782184, -122.391441"`, where you would replace the coordinates by your default location.

Then, click anywhere on the map to update your location (you will see a red dot). The map updates every 20 seconds and needs to make API calls to the Niantic servers, so please be patient.

## Deployment via Heroku

Clone this repository and change `Procfile` to put a Pokemon Trainer Club username and password. You can also fill in an address or coordinates that will be fed to the geocoder as default address. Prefer a latitude/longitude than an address because the geocoding API may restrict your calls. Commit your changes.

Create a new app on Heroku.com - if you have never done this before, head to their website for more documentation.

Add a new remote to the repo pointing to the git URL you will be given (something like https://git.heroku.com/yourProjectName.git).

Push to this repository, and tadaaa, you are good to go! Your app should be live soon.

Note that the Geolocate button only works in `https`, which is available by default on Heroku.

## Issues

Currently, the app stops working after a few hours. This may be due to expiring access tokens or some other issue that I have not identified yet. Restart your Heroku dynos if you encounter this problem.

There might also be issues with the geocoding API if too many calls have been made with the key. Try using lat/lon coordinates instead if that is the case.
