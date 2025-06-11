import Movie from "./movie.model";
import Actor from "./actor.model";
import User  from "./user.model";
import MovieActor from "./movie-actor.model";

Movie.belongsToMany(Actor, {through: MovieActor, foreignKey: 'movieId', otherKey: 'actorId'})
Actor.belongsToMany(Movie, {through: MovieActor, foreignKey: 'actorId', otherKey: 'movieId'})

MovieActor.belongsTo(Movie, { foreignKey: 'movieId' });
MovieActor.belongsTo(Actor, { foreignKey: 'actorId' });
Movie.hasMany(MovieActor, { foreignKey: 'movieId' });
Actor.hasMany(MovieActor, { foreignKey: 'actorId' });

export { Movie, Actor, User, MovieActor }