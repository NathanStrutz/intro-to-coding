cl = console.log;
let prompt = require("prompt-sync")({ sigint: true });
let title = (str) => cl(`${"-".repeat(str.length)}\n${str}\n${"-".repeat(str.length)}`);

{
  title("Movies before Y2K");
  // Improve the example movie program from above so that it shows the titles of movies released
  // before year 2000, using functional programming.
  const movieList = [
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

  let moviesBefore2000 = movieList.filter((m) => m.year < 2000).map((m) => m.title);

  console.log(moviesBefore2000);
}
{
  title("Government forms");
  // Complete the following program to compute and show the names of political forms ending with "cy".
  const governmentForms = [
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

  let formsEndingWithCy = governmentForms.filter((g) => g.name.match(/cy$/i)).map((g) => g.name);

  // Should show ["Plutocracy", "Kleptocracy", "Theocracy", "Democracy", "Autocracy"]
  console.log(formsEndingWithCy);
}
{
  title("Arrays sum");
  // Complete the following program to compute and show the total sum of the values in each of the arrays.
  const arrays = [[1, 4], [11], [3, 5, 7]];

  // compute the value of the arraysSum variable
  let arraysSum = arrays.flat().reduce((a, b) => a + b, 0);

  console.log(arraysSum, "Should show 31");
}
{
  title("Refactor Student results");
  // Here's a program that shows female students results (name and average grade).
  const students = [
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
  const femaleStudentsResults = [];
  for (const student of students) {
    if (student.sex === "f") {
      let gradesSum = 0;
      for (const grade of student.grades) {
        gradesSum += grade;
      }
      const averageGrade = gradesSum / student.grades.length;
      femaleStudentsResults.push({
        name: student.name,
        avgGrade: averageGrade,
      });
    }
  }
  console.log(femaleStudentsResults);
  cl("Refactored: ");
  let refactoredResults = students
    .filter((s) => s.sex === "f")
    .map((s) => ({ name: s.name, avgGrade: s.grades.reduce((a, b) => a + b, 0) / s.grades.length }));
  console.log(refactoredResults);
}
