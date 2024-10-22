const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const queries = require("./googleQueries");

passport.use(
  new GoogleStrategy(
    {
      clientID: "1098872434888-7hailgr31ou8q0tc02vsochr6ub4td7m.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8080/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Asegurarnos de que profile.emails y el primer valor de emails existan
            const email = profile.emails && profile.emails.length > 0 && profile.emails[0].value 
              ? profile.emails[0].value 
              : null;
            
            if (!email) {
              console.log("Email no encontrado en el perfil de Google");
              throw new Error("No se pudo obtener el correo electrónico del perfil de Google");
            }
            
        let user = await queries.getUser(email);

        if (!user) {
          user = await queries.createUser({
            nombre: profile.displayName,
            email: email,
            rol: "cliente", // Por defecto
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await queries.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});