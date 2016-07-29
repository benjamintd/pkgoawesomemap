# Mobile Friendly Pokemon Go app.

This is a variation on https://github.com/AHAAAAAAA/PokemonGo-Map/ with Pokemon Go styling and easy deployment via Heroku.

# Deployment via Heroku

Clone this repository and change `Procfile` to put a Pokemon Trainer Club username and password. You can also fill in an address or coordinates that will be fed to the geocoder as default address. Commit your changes.

Create a new app on Heroku.com - if you have never done this before, head to their website for more documentation.

Add a new remote to the repo pointing to the git URL you will be given (something like https://git.heroku.com/yourProjectName.git).

Push to this repository, and tadaaa, you are good to go! Your app should be live soon.

Note that the Geolocate button is only available in `https`, which is available by default on Heroku.

# Issues

Currently, the app stops working after a few hours. This may be due to expiring access tokens or some other issue that I have not identified yet. Restart your Heroku dynos if you encounter this problem.
