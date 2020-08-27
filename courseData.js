var faker = require("faker");

var toSentenceCase = function(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(" ");
};

function generateContentAsHTML() {
  return `<h4>${faker.name.title()}</h4><p>${faker.lorem.paragraphs()}<p><p>${faker.lorem.paragraphs()}<p><br><br><img src=${faker.image.image()} alt=${faker.lorem.word()} width="320" height="320"><figcaption>${faker.commerce.productName()}</figcaption>`;
}

function generateCourseData() {
  var courseData = [];
  for (var i = 0; i < 30; i++) {
    var parent = faker.random.boolean();
    var children = parent
      ? faker.random.arrayElements().map(el => toSentenceCase(el))
      : [];
    var parentName = parent ? "" : toSentenceCase(faker.company.companySuffix());
    var id = faker.internet.password();
    var name = parent
      ? toSentenceCase(faker.company.companySuffix())
      : toSentenceCase(faker.random.arrayElement());
    var Content = parent ? "" : generateContentAsHTML();

    courseData.push({
      children: children,
      id: id,
      parent: parent,
      parentName: parentName,
      name: name,
      Content: Content
    });
  }

  return { courseData: courseData };
}

module.exports = generateCourseData;
