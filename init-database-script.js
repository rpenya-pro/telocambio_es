// Initialization Script for MongoDB Compass
// Session Collection
db.sessions.insertMany([
    {
    user: ObjectId("610610b11f991d734c0c7dc4"),
    dateTime: new Date(),
    action: "Login"
    },
    {
    user: ObjectId("610610b11f991d734c0c7dc5"),
    dateTime: new Date(),
    action: "Logout"
    }
]);

// User Collection
db.users.insertMany([
    {
    _id: ObjectId("610610b11f991d734c0c7dc4"),
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    rating: 5,
    badges: [
            "newbie",
            "contributor"
        ],
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      country: "USA"
        },
    otherAddresses: [
            {
        street: "456 Another St",
        city: "Anytown",
        state: "CA",
        postalCode: "12346",
        country: "USA"
            }
        ],
    currentLocation: {
      latitude: 37.7749,
      longitude: -122.4194,
      timestamp: new Date()
        }
    }
]);

// Book Collection
db.books.insertMany([
    {
    _id: ObjectId("610612c21f991d734c0c7dc6"),
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    description: "A novel about racial inequality.",
    condition: "Good",
    owner: ObjectId("610610b11f991d734c0c7dc4"),
    packID: "pack1",
    inPack: true,
    ISBN: "978-0-7432-7356-5",
    publisher: "Scribner",
    publicationYear: 1960,
    language: "English",
    pageCount: 324,
    edition: "First",
    format: "Hardcover",
    synopsis: "The story of a young girl and her brother growing up in the South...",
    coverURL: "http://example.com/cover.jpg",
    tags: [
            "classic",
            "civil rights"
        ]
    }
]);

// Review Collection
db.reviews.insertMany([
    {
    rating: 5,
    comment: "Great book!",
    user: ObjectId("610610b11f991d734c0c7dc4"),
    bookID: ObjectId("610612c21f991d734c0c7dc6"), // Book identifier
    isPublic: true,
    isPublished: true
    }
]);
