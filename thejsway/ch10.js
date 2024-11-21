import { cl, title, bigTitle, prompt } from "./util.js";
bigTitle("Chapter 10: Discover functional programming");
{
  title("Older movies");
  // Improve the example movie program from above so that it shows the titles of movies released
  // before year 2000, using functional programming.
  let movieList = [
    {
      title: "Batman",
      year: 1989,
      director: "Tim Burton",
      imdbRating: 7.6,
    },
    {
      title: "Batman Returns",
      year: 1992,
      director: "Tim Burton",
      imdbRating: 7.0,
    },
    {
      title: "Batman Forever",
      year: 1995,
      director: "Joel Schumacher",
      imdbRating: 5.4,
    },
    {
      title: "Batman & Robin",
      year: 1997,
      director: "Joel Schumacher",
      imdbRating: 3.7,
    },
    {
      title: "Batman Begins",
      year: 2005,
      director: "Christopher Nolan",
      imdbRating: 8.3,
    },
    {
      title: "The Dark Knight",
      year: 2008,
      director: "Christopher Nolan",
      imdbRating: 9.0,
    },
    {
      title: "The Dark Knight Rises",
      year: 2012,
      director: "Christopher Nolan",
      imdbRating: 8.5,
    },
  ];
}
{
  title("Government forms");
  // Complete the following program to compute and show the names of political forms ending with "cy".
  let governmentForms = [
    {
      name: "Plutocracy",
      definition: "Rule by the wealthy",
    },
    {
      name: "Oligarchy",
      definition: "Rule by a small number of people",
    },
    {
      name: "Kleptocracy",
      definition: "Rule by the thieves",
    },
    {
      name: "Theocracy",
      definition: "Rule by a religious elite",
    },
    {
      name: "Democracy",
      definition: "Rule by the people",
    },
    {
      name: "Autocracy",
      definition: "Rule by a single person",
    },
  ];
}
{
  title("Arrays sum");
  // Complete the following program to compute and show the total sum of the values in each of the arrays.
  let arrays = [[1, 4], [11], [3, 5, 7]];
  // TODO: compute the value of the arraysSum variable
  /*
    cl(arraysSum); // Should show 31
  */
}
{
  title("Refactor Student results");
  // Here's a program that shows female students results (name and average grade).
  let students = [
    {
      name: "Anna",
      sex: "f",
      grades: [4.5, 3.5, 4],
    },
    {
      name: "Dennis",
      sex: "m",
      country: "Germany",
      grades: [5, 1.5, 4],
    },
    {
      name: "Martha",
      sex: "f",
      grades: [5, 4, 2.5, 3],
    },
    {
      name: "Brock",
      sex: "m",
      grades: [4, 3, 2],
    },
  ];
  // Compute female student results
  // Refactor it using functional programming. Make sure the result is correct.
}
