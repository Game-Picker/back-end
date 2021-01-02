exports.seed = function (knex) {
  return knex("games").then(() => {
    return knex("games").insert([
      {
        title: "The Last Of Us",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/51fR72yjSFL._SX342_.jpg",
        rating_id: 4,
        developer_id: 1,
        price: "$19.99",
        link:
          "https://www.amazon.com/PS4-LAST-US-REMASTERED-PlayStation-4/dp/B00JQ8UWZ0/ref=sr_1_9?dchild=1&keywords=The+Last+Of+Us&qid=1607226363&sr=8-9",
      },
      {
        title: "The Last Of Us Part II",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/71p8G%2BYeA6L._SL1500_.jpg",
        rating_id: 4,
        developer_id: 1,
        price: "$59.99",
        link:
          "https://www.amazon.com/Last-Us-Part-II-PlayStation-4/dp/B07DJRFSDF/ref=sr_1_2?crid=1NHWB8A1TPAUP&dchild=1&keywords=the+last+of+us+part+2&qid=1607226517&sprefix=The+last%2Caps%2C238&sr=8-2",
      },
    ]);
  });
};
